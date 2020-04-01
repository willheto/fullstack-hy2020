import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Content = (props) =>{
  return (
    <>
      <p>{props.part} {props.tasks}</p>
    </>
  )
}

const Total = (props) =>{
  return (
    <>
      <p>Number of exercises {props.task1 + props.task2 + props.task3}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course} />
      <Content part={part1} tasks={exercises1} />
      <Content part={part2} tasks={exercises2}/> 
      <Content part={part3} tasks={exercises3}/>
      <Total task1={exercises1} task2={exercises2} task3={exercises3} />  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))