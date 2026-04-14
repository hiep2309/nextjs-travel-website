"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import { createUserProfile } from "@/lib/user";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // Thêm state để lấy tên
  const [lastName, setLastName] = useState("");   // Thêm state để lấy tên
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Tạo tài khoản trên Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Tạo Profile trong Firestore (Sẽ có role: "user" mặc định)
      // Lưu ý: Chúng ta có thể truyền thêm tên vào nếu muốn
      await createUserProfile(user); 

      // 3. Chuyển hướng
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-[40px] shadow-2xl flex overflow-hidden h-[85vh]">
        
        {/* BÊN TRÁI: FORM */}
        <div className="w-full md:w-1/2 p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12">
             <div className="relative w-14 h-14"> {/* Bạn có thể chỉnh w-12 h-12 nếu muốn logo to hơn */}
  <Image
    src="/VN_insight_logo.png"          // Đường dẫn ảnh trong thư mục public
    alt="VietNam Insight Logo"
    fill                     // Để ảnh lấp đầy khung div cha
    className="object-contain" // Giúp logo giữ đúng tỷ lệ, không bị kéo dãn
    priority                 // Ưu tiên tải logo trước
  />
</div>
              <span className="font-bold text-xl">VietNam Insight</span>
            </div>
            
            <p className="text-gray-400 text-xs font-bold tracking-widest mb-2">START FOR FREE</p>
            <h1 className="text-5xl font-bold mb-4">Create new account<span className="text-blue-600">.</span></h1>
            <p className="text-gray-500 mb-8 text-sm">
              Already A Member? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
            </p>

            <form onSubmit={handleRegister} className="space-y-4 max-w-md">
              <div className="flex gap-4">
                <input placeholder="First name" className="w-1/2 p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-200" />
                <input placeholder="Last name" className="w-1/2 p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <input 
                type="email" placeholder="Email" 
                className="w-full p-4  bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input 
                  type="password" placeholder="Password" 
                  className="w-full p-4 bg-white border-2 border-blue-400 rounded-2xl outline-none shadow-lg shadow-blue-100"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" className="px-8 py-4 bg-gray-100 rounded-full font-bold text-gray-600">Change method</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition">Create account</button>
              </div>
            </form>
          </div>
        </div>

        {/* BÊN PHẢI: ẢNH NÚI */}
        <div className="hidden md:block w-1/2 relative">
          <Image 
            src="/signup_pic.jpg" // Đảm bảo bạn có ảnh này trong folder public
            alt="Mountains" 
            fill 
            className="object-cover"
          />
          {/* Lớp cong màu trắng (S shape) */}
          <div className="absolute inset-y-0 -left-16 w-32 bg-white rounded-r-[150px] transform scale-y-110" />
          
          <div className="absolute bottom-12 right-12">
             <span className="text-white text-4xl font-bold opacity-80">VNI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;