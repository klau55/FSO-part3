import { useState, useEffect } from 'react'
import  Filter  from "./Filter.js"
import PersonForm from "./PersonForm.js"
import Persons from "./Persons.js"
import noteService from "./services/persons.js"
import './index.css'





const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
  console.log(persons)
  noteService
    .getAll()
    .then(initialNames => {
      setPersons(initialNames)
      console.log('data', initialNames)
      
    })
  }, [])


  console.log('persons', persons)


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [serverMessage, setServerMessage] = useState('something happened...')
  
  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
      {message}
      </div>
    )
  }
  
  
  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter)) 
  
  const handleFilterChange = (event) => {
    console.log("11111111111111", event.target.value)
    setFilter(event.target.value)
    if(event.target.value != null) {
      setShowAll(false)
    }
      
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
  }

  const deleteperson = (id, name) => () => {
     console.log("DELETEPERSON ACTION ID NAME", id, name)
     if(window.confirm("Delete " + name + "?")) {
      noteService
        .deleteperson(id)
        .then(() => {
        setPersons(persons.filter(person => person.name !== name))
        setServerMessage(
          ` '${name}' was removed from server`
        )
        setTimeout(() => {
          setServerMessage(null)
        }, 5000)
     })
    }
  }
   
  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      setServerMessage (`${newName} is already in phonebook`)
      setTimeout(() => {
          setServerMessage(null)
        }, 5000)
    }
    else{
    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
      }

    noteService
      .create(nameObject)
      .then(returnedName => {
      setPersons(persons.concat(returnedName))
      setServerMessage (`${newName} successfully added to phonebook`)
      setTimeout(() => {
          setServerMessage(null)
        }, 5000)
    })
   
    
    
    setNewName('')
    setNewNumber('')
    setFilter('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={serverMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons personsToShow={personsToShow} deleteperson={deleteperson} />
    </div>
  )
}

export default App