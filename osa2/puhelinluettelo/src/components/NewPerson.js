import React, { useState } from 'react'
import personService from '../services/personService'

const NewPerson = (props) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

        for (let index = 0; index < props.persons.length; index++) {
            if (props.persons[index].name === newName) {
                const updateIndex = props.persons[index].id
                if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
                    personService
                        .Update(updateIndex, newPerson)
                        .then(response => {
                            props.setPersons(props.persons.map(person => person.id !== updateIndex ? person : response.data))
                            props.setWhatToShow(props.persons.map(person => person.id !== updateIndex ? person : response.data))
                            props.setMessage(`Updated ${newPerson.name}'s number`)
                            setTimeout(() => {
                                props.setMessage(null)
                            }, 2000)
                            return
                        })
                        .catch(error => {
                            props.setMessage(`${newPerson.name} has already been removed from the server`)
                            props.setPersons(props.persons.filter(person => person.name !== newPerson.name))
                            props.setWhatToShow(props.persons.filter(person => person.name !== newPerson.name))
                            setTimeout(() => {
                                props.setMessage(null)
                            }, 2000)
                            return
                        })
                }
                return
            }
        }

        personService
            .Create(newPerson)
            .then(response => {
                console.log('hmm')
                props.setPersons(props.persons.concat(response.data))
                props.setWhatToShow(props.persons.concat(response.data))
                props.setMessage(`Added ${newPerson.name}`)
                setTimeout(() => {
                    props.setMessage(null)
                }, 2000)
            })

        setNewName('')
        setNewNumber('')
    }
    return (
        <div>
            <form onSubmit={handleAdd}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default NewPerson