import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = (props) => {
    if (props.countries.length === 1) {
        return (
            <CountryInfo country={props.countries[0]} />
        )
    }

    if (props.countries.length > 10 && props.countries.length !== 250) {
        return (
        <div>
            Too many matches, specify another filter
        </div>)
    }
    return (
        <div>
            {props.countries.map(country => <Country key={country.name} country={country} setCountry={props.setCountry} />)}
        </div>
    )
}

export default Countries