import React from 'react'

const Textarea = ({ handleChange, placeholder, value }) => {
  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  return (
    <textarea
      required
      rows='8'
      className={`w-full my-3 p-3 bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Textarea
