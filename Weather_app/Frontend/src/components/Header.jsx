import React, { useState, useEffect, useContext, useRef } from "react";
import ThemeContextValue from "../context/Theme_contextValue";
import WheatherContext from "../context/Weather_contextValue.jsx";
import axios from "axios";

const Header = () => {
    const Input = useRef(null);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [cities, setCities] = useState([]);
    const { theme } = useContext(ThemeContextValue);
    const { setCity } = useContext(WheatherContext);

    // Debouncing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Theme-based styling
    useEffect(() => {
        if (theme === "dark") {
            Input.current.style.backgroundColor = "#333";
            Input.current.style.color = "white";
            Input.current.style.border = "1px solid #f0f0f0";


        } else {
            Input.current.style.backgroundColor = "#f0f0f0";
            Input.current.style.color = "black";
            Input.current.style.border = "1px solid black";
        }
    }, [theme]);

    // Fetch cities
    useEffect(() => {
        if (debouncedQuery.trim() === "") {
            setCities([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-city?search=${debouncedQuery}`
                );
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, [debouncedQuery]);

    // Handle city click
    const handleCityClick = (cityName) => {
        setQuery(cityName);   // ✅ set search bar value
        setCity(cityName);    // ✅ update WeatherContext
        setCities([]);        // ✅ clear suggestions after selection
    };

    return (
        <div className="flex gap-x-8 p-[20px]">

            <h1>🌤️ Weather App</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={query}
                    ref={Input}
                    className="rounded-4xl"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "150px",
                        marginBottom: "10px",
                    }}
                />
                <ul
                    className={`
    ${theme === "dark" ? "text-white border-zinc-500 bg-slate-950 border-2" : "text-black border-2 border-gray-900"}
    ${cities.length > 0 ? "absolute mt-1 rounded-md shadow-lg w-[150px] max-h-60 overflow-y-auto z-10" : "hidden"}
  `}
                >
                    {cities.length > 0 &&
                        cities.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => handleCityClick(city.name || city)}
                                style={{ cursor: "pointer" }}
                            >
                                {city.name || city}
                            </li>
                        ))}
                </ul>


            </div>


        </div>
    );
};

export default Header;
