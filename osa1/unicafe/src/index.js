import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const good = props.allFeedback[0]
  const neutral = props.allFeedback[1]
  const bad = props.allFeedback[2]

  const endResult = (good + bad * -1) / (good + neutral + bad)
  const endP = good / (neutral + bad + good) * 100

  if (!isNaN(endResult)) {
    return (

      <table>
        <tbody>
          <tr>
            
              <StatisticLine name="good" value={good} />
           
          </tr>
          <tr>
            
              <StatisticLine name="neutral" value={neutral} />
           
          </tr>
          <tr>
          
              <StatisticLine name="bad" value={bad} />
          
          </tr>
          <tr>
            
              <StatisticLine name="all" value={bad + good + neutral} />
            
          </tr>
          <tr>
            
              <StatisticLine name="average" value={endResult} />
            
          </tr>
          <tr>
            
              <StatisticLine name="positive" value={endP} />
            
          </tr>
        </tbody>
      </table>

    )
  } return (
    <div>
      No feedback given
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.name === "positive") {
    return (
      <>
      <td>{props.name}</td>
      <td>{props.value} %</td>
      </>
    )
  }
  return (
    <>
    <td>{props.name}</td>
    <td>{props.value}</td>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics allFeedback={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)