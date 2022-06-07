import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Content from './components/Content'

const Data = () => {
  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }

  useEffect(fetchCountries, [])

  const handleInput = (event) => {
    setCountryInput(event.target.value)
    const showCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryInput)
    )
    setFilteredCountries(showCountries)
  }

  return (
    <div>
      find countries <input onChange={handleInput} />
      <Content countries={filteredCountries} />
    </div>
  )
}

export default Data
