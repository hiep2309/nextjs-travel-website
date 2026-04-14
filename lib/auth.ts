import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserProfile } from "./user";
import { auth } from "./firebase";

// Đăng ký
export const register = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(res.user);
  return res;
};

// Đăng nhập
export const login = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await createUserProfile(res.user); // vẫn OK vì đã check exists
  return res;
};

// Đăng xuất
export const logout = () => {
  return signOut(auth);
};