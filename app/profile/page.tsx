"use client";
import Image from "next/image";

import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfilePage() {
  const profile = useUserProfile();

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-10 text-white">
      <div className="flex items-center gap-5">
        <Image
          src={
            profile.photoURL ||
            `https://ui-avatars.com/api/?name=${profile.name}`
         }
         alt="avatar"
         width={80}
         height={80}
         className="rounded-full object-cover"
/>

        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-white/60">{profile.email}</p>
        </div>
      </div>
    </div>
  );
}