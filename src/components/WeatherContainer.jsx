import { useEffect, useState } from "react";
import WeatherStat from "./WeatherStat";

const imgTempo = {
  "clear sky": "/img/clearsky.jpg",
  "few clouds": "/img/fewclouds.jpg",
  "light rain": "/img/lightrain.jpg",
  "overcast clouds": "/img/overcastclouds.jpg",
  "scattered clouds": "/img/scatteredClouds.jpg",
  "broken clouds": "/img/brokenClouds.jpg",
  "shower rain": "/img/showerRain.jpg"
}

const WeatherContainer = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [darkMode, setDarkMode] = useState("light");
  let pathImgFont = `url(${imgTempo[weather.weather[0].description]})`;

  const changeUnitTemp = (temp) => {
    if (isCelsius) {
      //transformacion a celcius
      const centrigrados = Math.trunc(temp - 273.15);
      return `${centrigrados} °C`;
    } else {
      //transformacion a farengeit
      const farenheit = (((temp - 273.15) * (9 / 5)) + 32).toFixed(1);
      return `${farenheit} °F`;
    }
  }

  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius)
  }

  const handleChangeDarkMode = () => {
    setDarkMode(prevTheme => prevTheme === "light" ? "dark" : "light")

  }

  if (darkMode === "dark") {
    document.querySelector("body").classList.add("dark");
    pathImgFont = "linear-gradient(rgba(0,0,0, 0.3), rgba(0,0,0, 0.3))," + `url(${imgTempo[weather.weather[0].description]})`;
  } else {
    document.querySelector("body").classList.remove("dark");
  }

  useEffect(() => {
    if (darkMode === "dark") {
      document.querySelector(".bx").classList.add("bxs-sun");
      document.querySelector(".bx").classList.remove("bxs-moon");
    } else {
      document.querySelector(".bx").classList.add("bxs-moon");
      document.querySelector(".bx").classList.remove("bxs-sun");
    }
  }, [darkMode])

  return (
    <div style={{
      backgroundImage: pathImgFont
    }} className="w-[100%] h-[100vh] flex justify-center items-center min-h-screen bg-black text-black dark:text-white containerDiv iconos_dark">
      <section className="text-center dark:text-white">
        <i id="iconDarkMode" className='bx bx-moon pb-5 text-[25px]' onClick={handleChangeDarkMode}></i>
        <h3 className="title">{weather.name} / {weather.sys.country}</h3>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          {/* Seccion superior */}
          <article className="card_top">
            <h4 className="tempo">{weather.weather[0].description}</h4>
            <span className="tempo_grados">{changeUnitTemp(weather.main.temp)}</span>
            <div>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
          </article>
          {/* Seccion inferior */}
          <article className="grid grid-cols-3 justify-items-center h-[96px] rounded-[22.943px] bg-slate-100/50 sm:grid-cols-1 sm:h-[auto]">
            <WeatherStat icon="/icon3.png" unit="m/s" value={weather.wind.speed} />
            <WeatherStat icon="/icon1.png" unit="%" value={weather.main.humidity} />
            <WeatherStat icon="/icon2.png" unit="hPa" value={weather.main.pressure} />
          </article>
        </div>

        <button onClick={handleChangeTemp} className="bg-white p-2 dark:bg-black text-black dark:text-white rounded-[20px] mt-4 w-[100px] hover:bg-cyan-950 hover:dark:bg-amber-500 hover:scale-[.85] hover:text-white ">C / F</button>
      </section>
    </div>

  )
}

export default WeatherContainer