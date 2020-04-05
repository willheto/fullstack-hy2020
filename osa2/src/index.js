import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

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
      <Part part={props.parts} />
    </>
  )
}

const Part = (props) =>{
  return (
    <>
      {props.part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </>
  )
}

const Total = (props) =>{
  return (
    <>
      <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
      
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))