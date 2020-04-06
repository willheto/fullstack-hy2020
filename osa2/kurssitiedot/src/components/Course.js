import React from 'react'

const Course = (props) => {
  return (
    <div>
      {props.courses.map(course => <div><Header courseName={course.name} /> <Content parts={course.parts} /></div>)}
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

export default Course