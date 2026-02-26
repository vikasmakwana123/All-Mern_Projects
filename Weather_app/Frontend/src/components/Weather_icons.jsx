import React, { useContext } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Moon } from "lucide-react";
import WeatherContext from '../context/Weather_contextValue.jsx';

const Weather_icons = () => {
  const { Weather_text } = useContext(WeatherContext);
  const condition = Weather_text || "";

  let icon;

  if (condition.toLowerCase().includes("sun")) {
    icon = <Sun size={32} color="orange" />;
  } else if (condition.toLowerCase().includes("cloud")) {
    icon = <Cloud size={32} color="gray" />;
  } else if (condition.toLowerCase().includes("rain")) {
    icon = <CloudRain size={32} color="blue" />;
  } else if (condition.toLowerCase().includes("snow")) {
    icon = <CloudSnow size={32} color="skyblue" />;
  } else if (condition.toLowerCase().includes("thunder")) {
    icon = <CloudLightning size={32} color="purple" />;
  } else if (condition.toLowerCase().includes("fog") || condition.toLowerCase().includes("mist")) {
    icon = <CloudFog size={32} color="lightgray" />;
  } else if (condition.toLowerCase().includes("wind")) {
    icon = <Wind size={32} color="teal" />;
  } else if (condition.toLowerCase().includes("night") || condition.toLowerCase().includes("moon")) {
    icon = <Moon size={32} color="darkblue" />;
  } else {
    icon = <Sun size={32} color="orange" />;
  }

  return <div>{icon}</div>;
};

export default Weather_icons;
