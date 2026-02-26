import Weather_icons from "./Weather_icons";
import Weather_Text from "./Weather_Text";

const Weather_head = () => {
  return (
    <div className="weather-head">
        <div className="weather-icons">
          <Weather_icons/>
        </div>
        <div className="weather-text">
          <Weather_Text/>
        </div>
    </div>
    )
}
export default Weather_head