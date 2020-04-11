import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

function App() {

  const [countries, setCountries] = useState([])
  const [CToShow, setCToShow] = useState(countries)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('Effect')
      setCountries(response.data)
      setCToShow(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setCToShow(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  return (
    <div>
      find countries <input onChange={handleChange} />
      <Countries countries={CToShow} setCountry={setCToShow} />
    </div>
  )
}

export default App;
