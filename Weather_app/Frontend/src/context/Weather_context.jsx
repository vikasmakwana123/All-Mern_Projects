import React, { useState, useEffect } from "react";
import WeatherContext from "./Weather_contextValue"; // ✅ import context object
import axios from "axios";

const WeatherProvider = ({ children }) => {
  const [Weather_text, setWeather_text] = useState("Fetching weather...");
  const [City, setCity] = useState("Mumbai");
  const [Weather_data, setWeather_data] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather?city=${City}`);
        const data = res.data;
        console.log("Fetched weather data:", data);
        setWeather_text(`${data.current.condition.text}, ${data.current.temp_c}°C in ${data.location.name}`);
        setWeather_data(data);
      } catch (err) {
        setWeather_text("Error fetching weather data");
      }
    };

    fetchWeather();
  }, [City]);

  return (
    <WeatherContext.Provider value={{ Weather_text, Weather_data, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
