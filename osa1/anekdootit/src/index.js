import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Votes = (props) => {
  return (
    <div>
      has {props.array[props.selected]} points
    </div>
  )
}

const Button = (props) => {
  
  return (
    <div>
      <button onClick={props.handleClick}>{props.name}</button>
    </div>
  )
}

const Best = (props) => {
  let winner = 0;
  let winnerIndex = 0;
  for (let index = 0; index < props.array.length; index++) {
    if(props.array[index] > winner){
      winner = props.array[index]
      winnerIndex = index
    }
    console.log(winnerIndex)
  }

  return (
    <div>
      {anecdotes[winnerIndex]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const pituus = props.anecdotes.length
  let [points, setPoints] = useState([
    0,
    0,
    0,
    0,
    0,
    0
  ])

  const vote = () => () => {
    const copy = [...points ]
    copy[selected] += 1
    points = copy

    setPoints(copy)
  }

  console.log(points)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <Votes selected={selected} array={points} />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * pituus))} name="next anecdote" />
      <Button handleClick={vote()} name="vote" />
      <h1>Anecdote with most votes</h1>
      <Best selected={selected} array={points} />
    </div>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)