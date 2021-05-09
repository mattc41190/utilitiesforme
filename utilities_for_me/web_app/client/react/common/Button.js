import React from 'react'

const Button = ({ handleClick, value, label, color, key = null }) => {
  const _className = `bg-${color}-500 hover:bg-${color}-700 my-1 mr-2 text-white font-bold py-2 px-4 rounded`
  return (
    <button key={key} className={_className} onClick={handleClick} value={value}>{label}</button>
  )
}

export default Button
