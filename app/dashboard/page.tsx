"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth"; // Sử dụng hook bạn đã sửa

const Dashboard = () => {
  const { user, role, loading: authLoading } = useAuth();
  const [pendingPosts, setPendingPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const router = useRouter();

  // 1. Fetch bài viết chờ duyệt (Nếu là Admin)
  useEffect(() => {
    const fetchPendingPosts = async () => {
      if (role === 'admin') {
        setLoadingPosts(true);
        try {
          const q = query(collection(db, "posts"), where("status", "==", "pending"));
          const snap = await getDocs(q);
          setPendingPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          console.error("Lỗi lấy bài viết:", err);
        } finally {
          setLoadingPosts(false);
        }
      }
    };
    fetchPendingPosts();
  }, [role]);

  // 2. Hàm duyệt bài
  const handleApprove = async (postId: string) => {
    try {
      await updateDoc(doc(db, "posts", postId), { status: "approved" });
      setPendingPosts(prev => prev.filter(p => p.id !== postId));
      alert("Đã duyệt bài viết!");
    } catch (err) {
      alert("Lỗi khi duyệt bài");
    }
  };

  // 3. Hàm xóa bài
  const handleReject = async (postId: string) => {
    if (confirm("Bạn có chắc muốn xóa bài này?")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        setPendingPosts(prev => prev.filter(p => p.id !== postId));
      } catch (err) {
        alert("Lỗi khi xóa bài");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (authLoading) return <div className="p-8 text-center font-bold">Đang xác thực...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* CARD THÔNG TIN CÁ NHÂN */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20">
              <Image
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}`}
                alt="Avatar" fill className="rounded-full object-cover border-2 border-blue-100"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.displayName || "Người dùng"}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                {role === 'admin' ? '🛡️ Administrator' : '👤 Member'}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="px-5 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100">
            Logout
          </button>
        </div>

        {/* PHẦN DÀNH RIÊNG CHO ADMIN: DUYỆT BÀI */}
        {role === 'admin' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Bài viết chờ kiểm duyệt ({pendingPosts.length})
            </h3>
            
            {loadingPosts ? <p>Đang tải bài viết...</p> : (
              <div className="grid gap-4">
                {pendingPosts.length === 0 && <p className="text-gray-400 italic">Không có bài viết nào cần duyệt.</p>}
                {pendingPosts.map(post => (
                  <div key={post.id} className="border border-gray-100 p-4 rounded-2xl flex justify-between items-center bg-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-700">{post.title}</h4>
                      <p className="text-sm text-gray-500">Đăng bởi: {post.authorName || post.authorId}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(post.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">
                        Duyệt
                      </button>
                      <button onClick={() => handleReject(post.id)} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50">
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PHẦN DÀNH CHO USER: GỢI Ý ĐĂNG BÀI */}
        {role !== 'admin' && (
          <div className="bg-blue-600 rounded-3xl p-8 text-white flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Bạn có trải nghiệm mới?</h3>
              <p className="opacity-80">Chia sẻ những chuyến đi của bạn với cộng đồng Việt Nam Insight.</p>
            </div>
            <button 
              onClick={() => router.push('/create-post')}
              className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-100 transition"
            >
              Đăng bài ngay
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;