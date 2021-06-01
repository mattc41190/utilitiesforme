import React from 'react'

const Textarea = ({ handleChange, placeholder, value }) => {
  return (
    <textarea
      required
      rows='8'
      className='w-full bg-skin-secondary-fill text-skin-secondary my-3 p-3 rounded-md border-2 border-skin-emphasis-fill focus:border-skin-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Textarea
