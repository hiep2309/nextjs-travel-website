"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/ruong_bac_thang.jpg",
  "/phong_canh.jpg",
  "/hoian.jpg",
  "/phuquoc.jpg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[540px] h-[600px] overflow-hidden rounded-3xl shadow-2xl">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full relative h-[600px]">
            <Image
  src={img}
  alt="Vietnam Travel"
  fill
  sizes="(max-width: 768px) 100vw, 440px"
  className="object-cover object-center"
/>
          </div>
        ))}
      </div>
    </div>
  );
}