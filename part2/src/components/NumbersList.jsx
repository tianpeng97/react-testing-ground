import React from 'react'
import Person from './Person'

const NumbersList = ({ personsToShow, removePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </ul>
  )
}

export default NumbersList
