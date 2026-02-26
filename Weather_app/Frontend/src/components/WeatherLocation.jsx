import React, { useContext } from "react";
import WeatherContext from "../context/Weather_contextValue.jsx";

const WeatherLocation = () => {
  const { Weather_data } = useContext(WeatherContext);

  if (!Weather_data) return null;

  return (
    <div className="weather-location">
      <h3>📍 {Weather_data.location.name}, {Weather_data.location.region}</h3>
      <p>
        <span>🌍 Country:</span> 
        <span>{Weather_data.location.country}</span>
      </p>
      <p>
        <span>🕐 Local Time:</span> 
        <span>{Weather_data.location.localtime}</span>
      </p>
      <p>
        <span>📍 Coordinates:</span> 
        <span>{Weather_data.location.lat.toFixed(2)}°, {Weather_data.location.lon.toFixed(2)}°</span>
      </p>
    </div>
  );
};

export default WeatherLocation;
