import React, { useState } from 'react'
import axios from 'axios'

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
                window.alert(`${newName} is already added to phonebook`)
                return
            }

        }

        axios
            .post('http://localhost:3001/persons', newPerson)
            .then(response =>{
                props.setPersons(props.persons.concat(response.data))
                props.setWhatToShow(props.persons.concat(response.data))
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