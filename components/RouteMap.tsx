"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";

// FIX resize
const ResizeMap = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
};

// FIX zoom theo route
const FitBounds = ({ coords }: any) => {
  const map = useMap();

  useEffect(() => {
    if (coords.length > 0) {
      map.fitBounds(coords, { padding: [30, 30] });
    }
  }, [coords, map]);

  return null;
};

const RouteMap = ({ userLocation, place }: any) => {
  const [coords, setCoords] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation.lon},${userLocation.lat};${place.lon},${place.lat}?overview=full&geometries=geojson`
      );

      const data = await res.json();

      const route = data.routes[0].geometry.coordinates;
      const latlng = route.map((c: any) => [c[1], c[0]]);

      setCoords(latlng);
    };

    fetchRoute();
  }, [userLocation, place]);

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lon]}
      zoom={5}
      style={{ height: "350px", width: "100%" }}
    >
      <ResizeMap />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[userLocation.lat, userLocation.lon]} />
      <Marker position={[place.lat, place.lon]} />

      {coords.length > 0 && (
        <>
          <Polyline positions={coords} />
          <FitBounds coords={coords} />
        </>
      )}
    </MapContainer>
  );
};

export default RouteMap;