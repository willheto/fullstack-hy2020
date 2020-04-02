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
      <Part part={props.part1.name} tasks={props.part1.exercises}/>
      <Part part={props.part2.name} tasks={props.part2.exercises}/>
      <Part part={props.part3.name} tasks={props.part3.exercises}/>
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
      <p>Number of exercises {props.task1.exercises + props.task2.exercises + props.task3.exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseName={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total task1={part1} task2={part2} task3={part3}/>  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))