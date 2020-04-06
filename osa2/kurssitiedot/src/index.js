import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {

  
  
  return (
    <div>
      {props.courses.map( course => <div><Header courseName={course.name} /> <Content parts={course.parts} /></div> )}

    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.courseName}</h2>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts} />
      <Total part={props.parts} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      {props.part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </>
  )
}

const Total = (props) => {

  const sum = props.part.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)

  return (
    <>
      <b>total of {sum} exercises</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))