import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }

    for (let index = 0; index < persons.length; index++) {
      if(persons[index].name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        return
      }
      
    }

    setPersons(persons.concat(newPerson))
    console.log(persons)

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Numbers key={person.name} person={person} />)}
    </div>
  )

}

export default App