import React from 'react'

const Textarea = ({ handleChange, placeholder, value }) => {
  return (
    <textarea
      required
      rows='8'
      className='w-full my-3 p-3 rounded-md border-2 border-green-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600'
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Textarea
