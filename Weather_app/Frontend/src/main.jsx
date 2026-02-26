import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WeatherProvider from "./context/Weather_context.jsx"; // ✅ FIXED
import ThemeProvider from "./context/Theme_context.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <WeatherProvider>
      
        <App />
      
    </WeatherProvider>
  </ThemeProvider>
);
