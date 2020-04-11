import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>

            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag of the country" width="20%" />
            <h3>Weather in {country.capital}</h3>
        </div>
    )
}

export default CountryInfo