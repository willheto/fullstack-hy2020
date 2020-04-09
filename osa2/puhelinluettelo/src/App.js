import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0441234567' },
    { name: 'Taneli Tossavainen', number: '0441234567' },
    { name: 'Seppo Toivanen', number: '0441234567' },
    { name: 'Seppo Kärkkäinen', number: '0441234567' },
    { name: 'Eila Husso', number: '0441234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [whatToShow, setWhatToShow] = useState(persons)

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    for (let index = 0; index < persons.length; index++) {
      if (persons[index].name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        return
      }

    }

    setPersons(persons.concat(newPerson))
    console.log(persons)

    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewFilter(event.target.value)
    console.log(newFilter)
    setWhatToShow(persons.filter(person => person.name.startsWith(event.target.value)))

  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {whatToShow.map(person => <Numbers key={person.name} person={person.name} number={person.number} />)}
    </div>
  )

}

export default App