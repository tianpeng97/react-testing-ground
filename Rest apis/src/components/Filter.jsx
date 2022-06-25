import React from 'react'

const Filter = ({ handleInput }) => {
  return (
    <div>
      find countries <input onChange={handleInput} />
    </div>
  )
}

export default Filter
