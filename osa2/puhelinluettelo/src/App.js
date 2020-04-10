import React, { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0441234567' },
    { name: 'Taneli Tossavainen', number: '0441234567' },
    { name: 'Seppo Toivanen', number: '0441234567' },
    { name: 'Seppo Kärkkäinen', number: '0441234567' },
    { name: 'Eila Husso', number: '0441234567' }
  ])

  const [whatToShow, setWhatToShow] = useState(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setShown={setWhatToShow} />
      <h2>add a new</h2>
      <NewPerson persons={persons} setPersons={setPersons} setWhatToShow={setWhatToShow}/>
      <h2>Numbers</h2>
      {whatToShow.map(person => <Numbers key={person.name} person={person.name} number={person.number} />)}
    </div>
  )

}

export default App