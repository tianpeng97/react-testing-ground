import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])

  // TODO: https://openweathermap.org api call for weather

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital[0],
    }

    axios.get('http://api.weatherstack.com/current', { params }).then((res) => {
      const apiRes = res.data
      setWeather([apiRes])
    })
  }).catch((err) => {
    console.log(err)
  })

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital[0]}</p>
      <p>{country.area}</p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
  )
}

export default Country
