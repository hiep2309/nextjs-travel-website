"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; // ✅ phải có getDoc
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user]);

  return profile;
}