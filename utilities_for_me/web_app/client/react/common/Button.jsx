import React from 'react'

const DEFAULT_COLOR = 'bg-green-500'
const DEFAULT_HOVER_COLOR = 'hover:bg-green-700'

const Button = ({ handleClick, value, label, color = DEFAULT_COLOR, hoverColor = DEFAULT_HOVER_COLOR }) => {
  const _className = `${color} ${hoverColor} my-1 mr-2 text-white font-bold py-2 px-4 rounded`
  return (
    <button className={_className} onClick={handleClick} value={value}>{label}</button>
  )
}

export default Button
