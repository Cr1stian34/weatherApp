import React from 'react'

const WeatherStat = ({ icon, value, unit }) => {

    return (
        <div className="flex gap-2 items-center">
            <img src={icon} alt="" className='invert-[100%] dark:invert-0' />
            <span>{value} {unit}</span>
        </div>
    )
}

export default WeatherStat