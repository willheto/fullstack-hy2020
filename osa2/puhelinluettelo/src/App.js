import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [whatToShow, setWhatToShow] = useState(persons)

  useEffect(() => {
    console.log('effect')
    personService
      .GetAll()
      .then(response => {
        setPersons(response.data)
        setWhatToShow(response.data)
      })
  },[])

  console.log(persons)
  console.log(whatToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setShown={setWhatToShow} />
      <h2>add a new</h2>
      <NewPerson persons={persons} setPersons={setPersons} setWhatToShow={setWhatToShow}/>
      <h2>Numbers</h2>
      {whatToShow.map(person => <Numbers key={person.name} person={person.name} number={person.number} id={person.id} setWhatToShow={setWhatToShow} setPersons={setPersons} persons={persons}/>)}
    </div>
  )

}

export default App