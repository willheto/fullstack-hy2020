import React, { useState } from 'react'

const Filter = (props) => {
    const [newFilter, setNewFilter] = useState('')

    const handleFilter = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setNewFilter(event.target.value)
        console.log(newFilter)
        props.setShown(props.persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))

    }
    return (
        <div>
            filter shown with
            <input value={newFilter} onChange={handleFilter} />
        </div>
    )
}

export default Filter