import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p><h1>give feedback</h1></p>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <p><h1>statistics</h1></p>
      <Result number={good} name="good" />
      <Result number={neutral} name="neutral"/>
      <Result number={bad} name="bad"/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Result = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)