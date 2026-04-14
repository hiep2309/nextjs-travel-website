import { FEATURES } from '@/constants'
import Image from 'next/image'
import React from 'react'
import ImageSlider from "./ImageSlider";

const Features = () => {
  return (
    <section className="py-24 bg-feature-bg bg-center bg-no-repeat">
  <div className="max-container padding-container grid lg:grid-cols-2 gap-16 items-center">

    {/* Image lớn */}
    <div className="w-full h-[600px] relative">
      <ImageSlider />
    </div>

    {/* Nội dung 2x2 */}
    <div className="grid grid-cols-2 gap-10">

      <div className="space-y-3">
        <h3 className="text-xl font-bold">
          Explore Vietnam
        </h3>
        <p className="text-gray-500">
          Discover breathtaking landscapes and vibrant cities across Vietnam.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">
          Popular Destinations
        </h3>
        <p className="text-gray-500">
          Visit famous places like Ha Long Bay, Sapa, Hoi An and Phu Quoc.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">
          Travel Guide
        </h3>
        <p className="text-gray-500">
          Get tips about culture, food, transportation and travel planning.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">
          Featured Tours
        </h3>
        <p className="text-gray-500">
          Explore curated tours and unforgettable travel experiences.
        </p>
      </div>

    </div>

  </div>
</section>
  )
}

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
}

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-green-50">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      <h2 className="bold-20 lg:bold-32 mt-5 capitalize">
        {title}
      </h2>
      <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  )
}

export default Features