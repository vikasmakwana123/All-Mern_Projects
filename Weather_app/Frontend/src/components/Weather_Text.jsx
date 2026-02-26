import React,{useContext} from 'react'
import WeatherContext from '../context/Weather_contextValue.jsx';

const Weather_Text = () => {

    const {Weather_text} = useContext(WeatherContext);

  return (
    <div style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>
      {Weather_text}
    </div>
  )
}

export default Weather_Text