import React from 'react'
import personService from '../services/personService'

const Numbers = (props) => {

    const handleDelete = () => {

        if (window.confirm(`Delete ${props.person} ?`)) {
            personService
            .Delete(props.id)
            .then(response => {
                props.setPersons(props.persons.filter(person => person.id !== props.id))
                props.setWhatToShow(props.persons.filter(person => person.id !== props.id))
                props.setMessage(`Deleted ${props.person}`)
                setTimeout(() => {
                    props.setMessage(null)
                }, 2000)
            })
        }
    }

    return (
        <div>{props.person} {props.number} <button onClick={handleDelete}>delete</button></div>
    )
}

export default Numbers