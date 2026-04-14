"use client";

import { useState } from "react";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !auth.currentUser) return alert("Vui lòng chọn ảnh và đăng nhập!");

    setIsSubmitting(true);
    try {
      // 1. Upload ảnh lên Firebase Storage
      const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Lưu thông tin bài viết vào Firestore
      await addDoc(collection(db, "posts"), {
        name: title,
        description: description,
        region: region,
        country: country,
        image: imageUrl,
        thumb: imageUrl, // Có thể dùng chung ảnh hoặc tạo thumb riêng
        status: "pending", // Mặc định chờ duyệt
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName,
        createdAt: serverTimestamp(),
        slug: title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
        number: 0, // Admin sẽ gán số thứ tự khi duyệt
      });

      alert("Gửi bài thành công! Vui lòng chờ Admin duyệt.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Lỗi đăng bài:", error);
      alert("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Chia sẻ chuyến đi</h1>
        
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-bold mb-2">Tên địa danh / Tiêu đề</label>
            <input 
              required
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
              placeholder="Ví dụ: Hội An Ancient Town"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Vùng miền & Quốc gia */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Vùng miền</label>
              <input 
                required
                className="w-full p-4 bg-gray-50 border-none rounded-2xl"
                placeholder="Ví dụ: Quảng Nam"
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Quốc gia</label>
              <input 
                required
                className="w-full p-4 bg-gray-50 border-none rounded-2xl"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-bold mb-2">Mô tả trải nghiệm</label>
            <textarea 
              required
              rows={4}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl"
              placeholder="Chia sẻ một chút về nơi này..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Chọn ảnh */}
          <div>
            <label className="block text-sm font-bold mb-2">Hình ảnh minh họa</label>
            <input 
              type="file" 
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Nút gửi - Đã fix lỗi disabled */}
          <Button 
            type="submit"
            title={isSubmitting ? "Đang gửi..." : "Đăng bài ngay"}
            variant="btn_dark_green"
            full
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;