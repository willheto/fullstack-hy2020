import React from 'react'

const Country = (props) => {

    const handleClick = () => {
        const newCountry = [props.country]
        console.log(newCountry)
        props.setCountry(newCountry)
    }

    return (
        <div>
            {props.country.name} <button onClick={handleClick} > show </button>
        </div>
    )
}

export default Country