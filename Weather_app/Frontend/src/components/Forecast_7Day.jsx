import React, { useContext, useState } from 'react';
import WeatherContext from '../context/Weather_contextValue';

const Forecast_7Day = () => {
    const { Weather_data } = useContext(WeatherContext);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    
    if (!Weather_data || !Weather_data.forecast || !Weather_data.forecast.forecastday) {
        return ( 
            <div className="forecast-sidebar">
                <h3>📅 7-Day Forecast</h3> 
                <p style={{ textAlign: "center", color: "var(--label-color)" }}>Loading forecast...</p>
            </div>
        );
    }

    const forecastDays = Weather_data.forecast.forecastday;

    const getWeatherIcon = (condition) => {
        const conditionText = condition.toLowerCase();
        
        if (conditionText.includes('sunny') || conditionText.includes('clear')) {
            return '☀️';
        } else if (conditionText.includes('cloud')) {
            return '☁️';
        } else if (conditionText.includes('rain') || conditionText.includes('drizzle')) {
            return '🌧️';
        } else if (conditionText.includes('snow')) {
            return '❄️';
        } else if (conditionText.includes('thunder') || conditionText.includes('storm')) {
            return '⛈️';
        } else if (conditionText.includes('fog') || conditionText.includes('mist')) {
            return '🌫️';
        } else if (conditionText.includes('wind')) {
            return '💨';
        } else if (conditionText.includes('hail')) {
            return '🧊';
        }
        return '🌤️';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatDay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const formatTime = (timeString) => {
        const [, time] = timeString.split(' ');
        const [hour] = time.split(':');
        const hourNum = parseInt(hour);
        return hourNum === 0 ? '12 AM' : hourNum < 12 ? `${hourNum} AM` : hourNum === 12 ? '12 PM' : `${hourNum - 12} PM`;
    };

    const selectedDay = selectedDayIndex !== null ? forecastDays[selectedDayIndex] : null;

    return (
        <div className="forecast-sidebar">
            {selectedDay ? (
                // Hourly View
                <div className="hourly-view">
                    <button 
                        className="back-button" 
                        onClick={() => setSelectedDayIndex(null)}
                    >
                        ← Back
                    </button>
                    <h3 style={{ marginTop: '10px' }}>⏰ Hourly for {formatDate(selectedDay.date)}</h3>
                    <div className="hourly-grid">
                        {selectedDay.hour.map((hour, idx) => (
                            <div key={idx} className="hourly-item">
                                <div className="hourly-time">{formatTime(hour.time)}</div>
                                <div className="hourly-icon">{getWeatherIcon(hour.condition.text)}</div>
                                <div className="hourly-temp">{Math.round(hour.temp_c)}°C</div>
                                <div className="hourly-condition">{hour.condition.text}</div>
                                <div className="hourly-details">
                                    <span title="Humidity">💧 {hour.humidity}%</span>
                                    <span title="Wind">💨 {Math.round(hour.wind_kph)} kph</span>
                                </div>
                                <div className="hourly-chance">🌧️ {hour.chance_of_rain}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Daily View
                <>
                    <h3>📅 7-Day Forecast</h3>
                    <div className="daily-forecast scrollbar-hide">
                        {forecastDays.map((day, index) => (
                            <div 
                                key={index} 
                                className="forecast-item "
                                onClick={() => setSelectedDayIndex(index)}
                                
                            >
                                <div className="forecast-date">
                                    {formatDay(day.date).toUpperCase()} <br /> {formatDate(day.date)}
                                </div>
                                <div className="forecast-icon">{getWeatherIcon(day.day.condition.text)}</div>
                                <div className="forecast-condition">{day.day.condition.text}</div>
                                <div className="forecast-temps">
                                    <div className="forecast-temp">
                                        <span className="forecast-temp-label">Max</span>
                                        <span className="forecast-temp-value">{Math.round(day.day.maxtemp_c)}°C</span>
                                    </div>
                                    <div className="forecast-temp">
                                        <span className="forecast-temp-label">Min</span>
                                        <span className="forecast-temp-value">{Math.round(day.day.mintemp_c)}°C</span>
                                    </div>
                                </div>
                                <div className="forecast-details">
                                    <div>💧 {Math.round(day.day.daily_chance_of_rain)}%</div>
                                    <div>💨 {Math.round(day.day.maxwind_kph)} kph</div>
                                </div>
                                <div className="forecast-avg">
                                    Avg: {Math.round(day.day.avgtemp_c)}°C
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Forecast_7Day;
