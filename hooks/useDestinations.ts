"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useDestinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const q = query(
          collection(db, "posts"), 
          where("status", "==", "approved"),
          orderBy("number", "asc") // Sắp xếp theo số thứ tự
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          number: Number(doc.data().number ?? 0) // Ép kiểu về number ở đây
        }));
        setDestinations(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return { destinations, loading };
}