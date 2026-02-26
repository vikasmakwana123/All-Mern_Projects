import React, { useContext } from "react";
import WeatherContext from "../context/Weather_contextValue.jsx";
import { Wind, Droplets, Gauge, Thermometer, Eye } from "lucide-react";

const WeatherDetails = () => {
  const { Weather_data } = useContext(WeatherContext);

  if (!Weather_data) return null;

  const details = [
    {
      label: "Wind Speed",
      value: `${Weather_data.current.wind_kph} kph`,
      direction: `(${Weather_data.current.wind_dir})`,
      icon: "💨"
    },
    {
      label: "Humidity",
      value: `${Weather_data.current.humidity}%`,
      icon: "💧"
    },
    {
      label: "Pressure",
      value: `${Weather_data.current.pressure_mb} mb`,
      icon: "🔽"
    },
    {
      label: "Feels Like",
      value: `${Weather_data.current.feelslike_c}°C`,
      icon: "🌡️"
    },
    {
      label: "Visibility",
      value: `${Weather_data.current.vis_km} km`,
      icon: "👁️"
    },
    {
      label: "UV Index",
      value: `${Weather_data.current.uv || "N/A"}`,
      icon: "☀️"
    }
  ];

  return (
    <div className="weather-details">
      {details.map((detail, index) => (
        <p key={index}>
          <span>{detail.icon} {detail.label}</span>
          <span>{detail.value} {detail.direction || ""}</span>
        </p>
      ))}
    </div>
  );
};

export default WeatherDetails;
