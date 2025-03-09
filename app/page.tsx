"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Header from "./components/header";
import WeatherCard from "./components/weathercard";
import AddLocationCard from "./components/Addcard";
import Background3 from "@/public/images/bg2.png";

// Define a TypeScript interface for the weather data
interface WeatherData {
  name: string;
  sys: { country: string };
  dt: number;
  main: { temp: number; feels_like: number; humidity: number };
  weather: { description: string }[];
  visibility: number;
  wind: { speed: number };
}

export default function Home() {
  const APIKey = process.env.NEXT_PUBLIC_API_KEY;
  const [details, setDetails] = useState<WeatherData | null>(null); // Use specific type instead of any
  const [location, setLocation] = useState("Colombo");

  // Memoize getweather with useCallback to avoid re-creation on every render
  const getweather = useCallback(async () => {
    if (!APIKey) {
      console.error("API key not found");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`;
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: WeatherData = await response.json(); // Type assertion
      console.log("data", data);
      setDetails(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }, [location, APIKey]); // Dependencies for useCallback

  const handleAddLocation = (newCity: string) => {
    setLocation(newCity);
    // No need to call getweather here since useEffect will handle it
  };

  useEffect(() => {
    getweather();
  }, [getweather]); // Add getweather as a dependency

  return (
    <div className="relative h-screen w-screen">
      <Image
        src={Background3}
        alt="Background"
        fill
        className="object-cover"
        quality={80}
      />
      <div className="flex flex-col">
        <div className="relative z-10">
          <Header />
        </div>

        <div className="flex justify-center align-middle gap-5">
          <WeatherCard
            location={`${details?.name || location}, ${details?.sys?.country || "LK"}`}
            date={new Date((details?.dt || Date.now()) * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
            temperature={details?.main?.temp ? `${Math.round(details.main.temp)}°C` : "15°C"}
            condition={details?.weather?.[0]?.description || "Mostly cloudy"}
            visibility={details?.visibility ? `${details.visibility / 1000} km` : "10 km"}
            feelsLike={details?.main?.feels_like ? `${Math.round(details.main.feels_like)}°C` : "10°C"}
            humidity={details?.main?.humidity ? `${details.main.humidity}%` : "10%"}
            wind={details?.wind?.speed ? `${details.wind.speed} km/h` : "10 km/h"}
          />

          <AddLocationCard onAddLocation={handleAddLocation} />
        </div>
      </div>
    </div>
  );
}
