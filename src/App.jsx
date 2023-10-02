import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherContainer from './components/WeatherContainer';
import Loader from './components/Loader';

function App() {

  const [weather, setWeather] = useState(null)

  const succes = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEY = "ed6eec165b7d136a1d0b370096ff95ef";
    // console.log(lat);
    // console.log(lon);
    // console.log(weather)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)
  }, [])

  return (

    <main className='font-["Lato"] flex justify-center items-center min-h-screen bg-black text-black'>
        {weather === null ? <Loader /> : <WeatherContainer weather={weather} />}
        {/* <WeatherContainer weather={weather}/> */}
        {/* <Loader/> */}

    </main>
  )
}

export default App
