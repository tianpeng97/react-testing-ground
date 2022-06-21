import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import personServices from './services/persons'
import NumbersList from './components/NumbersList'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [username, setUserame] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedPhonebookUser', JSON.stringify(user))
      personServices.setToken(user.token)
      setUser(user)
      setUserame('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('Wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const fetchPersons = () => {
    personServices.getAll().then((res) => setPersons(res))
  }

  const checkToken = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      personServices.setToken(user.token)
    }
  }

  useEffect(fetchPersons, [])
  useEffect(checkToken, [])

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

  const handleUsername = (event) => {
    setUserame(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  const phonebookForm = () => {
    return (
      <>
        <div className="form-floating">
          <input
            className="form-control input"
            id="search"
            placeholder=""
            onChange={handleSearch}
          />
          <label htmlFor="search">Search</label>
        </div>
        <PersonForm
          onSubmit={handleSubmit}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
        />
        <h2>Numbers</h2>
        <NumbersList
          personsToShow={personsToShow}
          removePerson={removePerson}
        />
      </>
    )
  }

  return (
    <>
      <div className="container">
        <h2>Phonebook</h2>
        <Notification message={errorMsg} />
        {user === null ? loginForm() : phonebookForm()}
      </div>
      <Footer />
    </>
  )
}

export default Phonebook
