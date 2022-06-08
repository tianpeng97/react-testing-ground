import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const Data = () => {
  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }

  const filterCountries = () => {
    if (countryInput) {
      const regex = new RegExp(countryInput, 'i')
      const showCountries = countries.filter((country) =>
        regex.test(country.name.common)
      )
      setFilteredCountries(showCountries)
    }
  }

  useEffect(fetchCountries, [])
  useEffect(filterCountries, [countryInput, countries])

  const handleInput = (event) => {
    setCountryInput(event.target.value)
  }

  return (
    <div>
      <Filter handleInput={handleInput} />
      <Content
        countries={filteredCountries}
        setCountries={setFilteredCountries}
      />
    </div>
  )
}

export default Data
