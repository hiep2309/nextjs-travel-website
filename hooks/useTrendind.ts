import { useEffect, useState } from "react";
import { getTrendingLocation } from "@/utils/getTrendingLocation";

export function useTrending() {
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getTrendingLocation();
      setPlace(data);
    };

    load();
  }, []);

  return place;
}