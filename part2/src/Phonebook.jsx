import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const fetchPersons = () => {
    axios.get('http://localhost:3001/persons').then((res) => {
      console.log(res.data)
      setPersons(res.data)
    })
  }

  useEffect(fetchPersons, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
  }

  const handleSearch = (event) => {
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setNewSearch(event.target.value)
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input onChange={handleSearch} />
      </div>
      <h2>Add a new person to phonebook</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

// const App = () => {
//   // ...

//   return (
//     <div>
//       <h2>Phonebook</h2>

//       <Filter ... />

//       <h3>Add a new</h3>

//       <PersonForm
//         ...
//       />

//       <h3>Numbers</h3>

//       <Persons ... />
//     </div>
//   )
// }

export default Phonebook
