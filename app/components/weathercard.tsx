import React from "react";



interface Props{
  location?: string;
  date?: string;
  temperature?: string;
  condition?: string;
  visibility?: string;
  feelsLike?: string;
  humidity?: string;
  wind?: string;
}

export default function WeatherCard({ 
location,
date,
temperature,
condition,
visibility,
feelsLike,
humidity,
wind
}:Props){
 
;
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-lg border border-white/20 h-[40rem]">
    
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white text-lg font-semibold">{location}</h2>
          <p className="text-white/70 text-sm">{date}</p>
        </div>

      {condition?.toLowerCase().includes("clear") || condition?.toLowerCase().includes("sunny") ? (
            <span className="text-yellow-400 text-4xl">☀️</span>
          ) : condition?.toLowerCase().includes("rain") || condition?.toLowerCase().includes("shower") ? (
            <span className="text-blue-300 text-4xl">🌧️</span>
          ) : (
            <span className="text-gray-300 text-4xl">☁️</span> 
          )}
        </div>
  
      <div className="text-center mb-6">
        <h1 className="text-white text-6xl font-bold">{temperature}</h1>
        <p className="text-white/80 text-lg">{condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-white/80 text-sm">
        <div className="flex items-center gap-2">
          <span>👁️</span> Visibility {visibility}
        </div>
        <div className="flex items-center gap-2">
          <span>🌡️</span> Feels like {feelsLike}
        </div>
        <div className="flex items-center gap-2">
          <span>💧</span> Humidity {humidity}
        </div>
        <div className="flex items-center gap-2">
          <span>🌬️</span> Wind {wind}
        </div>
      </div>
    </div>
  );
}