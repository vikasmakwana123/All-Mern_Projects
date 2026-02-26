import { useContext, useEffect } from 'react';
import WeatherHead from "../components/Weather_head";
import WeatherDetails from "../components/WeatherDetails";
import WeatherLocation from "../components/WeatherLocation";
import Forecast_7Day from "../components/Forecast_7Day";
import ThemeContextValue from "../context/Theme_contextValue";
import Header from '../components/Header';

const WeatherApp = () => {
  const { theme, setTheme } = useContext(ThemeContextValue);

  useEffect(() => {
    // Set theme on body element
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="weather-app">
      <div className="weather-main">
        <div className="weather-header">
          <Header/>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="weather-content">
          <WeatherHead />
          <WeatherLocation />
          <WeatherDetails />
        </div>
      </div>
      <Forecast_7Day />
    </div>
  );
};

export default WeatherApp;
