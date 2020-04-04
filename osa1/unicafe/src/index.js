import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

const Statistics = (props) => {
  const good = props.allFeedback[0]
  const neutral = props.allFeedback[1]
  const bad = props.allFeedback[2]

  const endResult = (good + bad * -1) / (good + neutral + bad)
  const endP = good / (neutral + bad + good) * 100

  if (!isNaN(endResult)) {
    return (
      <div>
        <div>
          average {endResult}
        </div>
        <div>
          positive {endP} %
        </div>
      </div>
    )
  } return (
    <div>
      <div>
        average 0
      </div>
      <div>
        positive 0 %
      </div>
    </div>
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
      <Result number={good} name="good" />
      <Result number={neutral} name="neutral" />
      <Result number={bad} name="bad" />
      <Statistics allFeedback={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)