import React from 'react'

const Country = ({ country }) => {
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
