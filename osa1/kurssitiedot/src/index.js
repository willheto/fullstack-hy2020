import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return (
    <div>
      <h1>{props.courseName.name}</h1>
    </div>
  )
}

const Content = (props) =>{
  return (
    <>
      <Part part={props.parts.parts[0]} />
      <Part part={props.parts.parts[1]} />
      <Part part={props.parts.parts[2]} />
    </>
  )
}

const Part = (props) =>{
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
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
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course} />
      <Content parts={course}/>
      <Total parts={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))