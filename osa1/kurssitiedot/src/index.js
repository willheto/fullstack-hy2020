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
      <Part part={props.part1} tasks={props.task1}/>
      <Part part={props.part2} tasks={props.task2}/>
      <Part part={props.part3} tasks={props.task3}/>
    </>
  )
}

const Part = (props) =>{
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
      <Content part1={part1} part2={part2} part3={part3} task1={exercises1} task2={exercises2} task3={exercises3} />
      <Total task1={exercises1} task2={exercises2} task3={exercises3} />  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))