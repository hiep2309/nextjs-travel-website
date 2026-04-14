"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("./RouteMap"), { ssr: false });

type Place = {
  title: string;
  location: string;
  image: string;
  lat: number;
  lon: number;
  description: string;
};

type Weather = {
  temp: number;
  feels: number;
  humidity: number;
  wind: number;
  clouds: number;
  visibility: number;
  condition: string;
};

const Hero = () => {
  const [place, setPlace] = useState<Place | null>(null);
  const [distance, setDistance] = useState<string>("...");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [travelTime, setTravelTime] = useState<any>(null);

  // ===== Mock AI suggestion =====
  useEffect(() => {
    const mock: Place = {
      title: "Explore Hoi An",
      location: "Vietnam",
      image: "/signup_pic.jpg",
      lat: 15.8801,
      lon: 108.338,
      description:
        "A timeless ancient town famous for lantern streets, cultural heritage, and peaceful riverside atmosphere.",
    };

    setPlace(mock);
  }, []);

  // ===== Get user location =====
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        // fallback (Seoul)
        setUserLocation({ lat: 37.5665, lon: 126.9780 });
      }
    );
  }, []);

  // ===== Real Route (OSRM) =====
  useEffect(() => {
    if (!userLocation || !place) return;

    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLocation.lon},${userLocation.lat};${place.lon},${place.lat}?overview=false`
        );

        const data = await res.json();
        const route = data.routes[0];

        const distKm = (route.distance / 1000).toFixed(0);
        const durationH = route.duration / 3600;

        setDistance(distKm + " km");

        setTravelTime({
          car: durationH,
          motorbike: durationH * 1.2,
          bicycle: durationH * 4,
          train: durationH * 0.8,
          plane: durationH * 0.3,
        });
      } catch (err) {
        console.error("Route error:", err);
      }
    };

    fetchRoute();
  }, [userLocation, place]);

  // ===== Weather API =====
  useEffect(() => {
    if (!place) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        const data = await res.json();

        setWeather({
          temp: Math.round(data.main.temp),
          feels: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          wind: data.wind.speed,
          clouds: data.clouds.all,
          visibility: data.visibility / 1000,
          condition: data.weather[0].main,
        });
      } catch (err) {
        console.error("Weather error:", err);
      }
    };

    fetchWeather();
  }, [place]);

  if (!place) return null;

  return (
  <section className="w-full h-screen relative">

    {/* Background */}
    <Image
      src="/signup_pic.jpg"
      alt="bg"
      fill
      className="object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/30" />

    {/* ===== LEFT GLASS CARD ===== */}
    <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">

      <div className="
        w-[520px]
        bg-white/10
        backdrop-blur-2xl
        rounded-3xl
        p-8
        text-white
        border border-white/20
        shadow-2xl
      ">

        {/* TITLE */}
  <h1 className="text-4xl font-semibold leading-tight mb-4">
    Hoi An Ancient Town: A Timeless Beauty
  </h1>

  {/* PARAGRAPH 1 */}
  <p className="text-white/80 mb-4 leading-relaxed">
    Hoi An is not merely a picture of the past with its moss-covered tiled roofs
    and vibrant lantern-lit streets. It’s a living museum of cultural fusion that
    has thrived for centuries. Walking through its narrow alleys, one feels the
    slow rhythm beat of time.
  </p>

  {/* DIVIDER */}
  <div className="text-center text-white/50 my-4">
    ~ ~ ~
  </div>

  {/* PARAGRAPH 2 */}
  <p className="text-white/80 mb-6 leading-relaxed">
    As the sun sets over the Hoai River, the town transforms. Thousands of
    colorful lanterns illuminate the wooden shopfronts, and small paper boats
    float gently on the water, creating a magical atmosphere.
  </p>

  {/* BUTTON */}
  <button className="
    px-5 py-2
    bg-white/20
    rounded-full
    text-sm
    hover:bg-white/30
    transition
  ">
    Xem Thêm 
  </button>

  {/* STATS */}
  <div className="flex justify-between mt-6 text-sm text-white/80">

    <div>❤️ 2.4k Likes</div>
    <div>⭐ 4.9 Rating</div>
    <div>🔗 860 Shares</div>

  </div>

      

        

      </div>
    </div>

    {/* ===== RIGHT PANEL ===== */}
    <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 space-y-6">

      {/* WEATHER */}
      <div className="
        w-[400px]
        bg-white/10
        backdrop-blur-2xl
        rounded-3xl
        p-6
        text-white
        border border-white/20
      ">

        <div className="text-sm opacity-80 mb-2">
          Weather & Status
        </div>

        <div className="text-xl font-semibold">
          {place.location}
        </div>

        <div className="text-4xl font-bold mt-2">
          {weather?.temp ?? "--"}°C
        </div>

        <div className="text-sm opacity-70">
          Feels {weather?.feels ?? "--"}°C • {weather?.condition}
        </div>
      </div>

      {/* MAP */}
      <div className="
        w-[400px]
        h-[550px]
        bg-white/10
        backdrop-blur-2xl
        rounded-3xl
        p-4
        text-white
        border border-white/20
      ">

        <div className="text-sm opacity-80 mb-2">
          Demo
        </div>

        {userLocation && (
          <div className="rounded-xl overflow-hidden">
            <RouteMap userLocation={userLocation} place={place} />
          </div>
        )}
          {/* DISTANCE BADGE */}
        <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
          Distance: {distance}
        </div>
        {/* TRANSPORT */}
        {travelTime && (
          <div className="
            grid grid-cols-5
            gap-4
            text-center
            text-sm
            bg-white/10
            p-4
            rounded-2xl
          ">

            <div>
              🚗
              <div>{travelTime.car.toFixed(0)}h</div>
            </div>

            <div>
              🛵
              <div>{travelTime.motorbike.toFixed(0)}h</div>
            </div>

            <div>
              🚆
              <div>{travelTime.train.toFixed(0)}h</div>
            </div>

            <div>
              ✈
              <div>{travelTime.plane.toFixed(0)}h</div>
            </div>

            <div>
              🚲
              <div>{travelTime.bicycle.toFixed(0)}h</div>
            </div>

          </div>
        )}

      </div>

    </div>

  </section>
);
};

export default Hero;
