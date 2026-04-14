// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; // Đảm bảo đường dẫn này đúng
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { logout } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null); // Thêm dòng này
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // --- ĐOẠN CODE CẦN THÊM VÀO ---
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setRole(userSnap.data().role || 'user');
          } else {
            setRole('user'); // Mặc định nếu không tìm thấy doc
          }
        } catch (error) {
          console.error("Lỗi lấy role:", error);
          setRole('user');
        }
        // ------------------------------

      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading, logout };
};