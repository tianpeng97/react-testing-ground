import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import personServices from './services/persons'
import NumbersList from './components/NumbersList'
import Notification from './components/Notification'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  const fetchPersons = () => {
    personServices.getAll().then((res) => setPersons(res))
  }

  useEffect(fetchPersons, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const removePerson = (id) => {
    const name = persons.filter((person) => person.id === id)[0].name
    if (window.confirm(`Delete ${name}?`)) {
      personServices
        .remove(id)
        .catch((err) => alert(`${name} already deleted from db.`))
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personsSameName = persons.filter((person) => person.name === newName)
    const isRedundant = personsSameName.length !== 0

    if (isRedundant) {
      const personToAdd = personsSameName[0]
      if (
        window.confirm(
          `${personToAdd.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = { ...personsSameName[0], number: newNumber }

        personServices
          .update(personToAdd.id, personObject)
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id === personToAdd.id ? res : person
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            // TODO person to update already deleted

            // console.log(error.name)
            // setErrorMsg(`[ERROR] ${personToAdd.name} error`)
            setErrorMsg(`[ERROR] ${error.response.data.error}`)
            // setPersons(persons.filter((person) => person.id !== personToAdd.id))
            // setNewName('')
            // setNewNumber('')
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personServices
        .add(personObject)
        .then((res) => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setErrorMsg(`[ERROR] ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })
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
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={errorMsg} />
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
      <NumbersList personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default Phonebook
