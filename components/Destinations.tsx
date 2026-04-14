"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. Cập nhật Interface chuẩn
export interface DestinationItem {
  slug: string;
  name: string;
  region: string;
  country: string;
  description: string;
  image: string;
  thumb: string;
  reviewCount: string;
  number: number; // ✨ Phải là number
  authorRole?: string;
}

// 2. Định nghĩa Props mà Wrapper sẽ truyền vào
interface DestinationsProps {
  destinations: DestinationItem[];
  loading: boolean;
  error: string | null;
}

export default function Destinations({ destinations, loading, error }: DestinationsProps) {
  const [active, setActive] = useState(0);

  // Hiển thị trạng thái Loading
  if (loading) return <div className="h-screen bg-black flexCenter text-white">Đang tải dữ liệu...</div>;
  
  // Hiển thị lỗi nếu có
  if (error) return <div className="h-screen bg-black flexCenter text-red-500">{error}</div>;

  return (
    <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      {/* ... Phần code hiển thị Background, Title, và Thumbnails của bạn ... */}
      {/* Lưu ý: Tại phần Thumbnails, đổi 'flex hidden' thành 'hidden md:flex' để hết lỗi CSS */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
         {/* Map qua destinations như cũ */}
      </div>
    </section>
  );
}