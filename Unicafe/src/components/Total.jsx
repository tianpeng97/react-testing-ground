import React from 'react'

const Total = (props) => {
  return (
    <p>
      <b>
        total of {props.parts.reduce((sum, curr) => sum + curr.exercises, 0)}{' '}
        exercises
      </b>
    </p>
  )
}

export default Total
