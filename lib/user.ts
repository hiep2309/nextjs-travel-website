import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "firebase/auth";

// Trong lib/user.ts
export const createUserProfile = async (user: User, customName?: string) => {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      name: customName || user.displayName || "User", // Ưu tiên tên từ form
      role: "user",
      createdAt: serverTimestamp(),
    });
  }
};