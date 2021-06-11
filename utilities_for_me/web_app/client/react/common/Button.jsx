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

// import React from 'react'

// const DEFAULT_COLOR = 'bg-button-fill'
// const DEFAULT_HOVER_COLOR = 'hover:bg-button-active-fill'
// const DEFAULT_TEXT_COLOR = "text-button-primary"
// const DEFAULT_HOVER_TEXT_COLOR = "text-button-primary"

// const Button = ({
//   handleClick,
//   value,
//   label,
//   textColor = DEFAULT_TEXT_COLOR,
//   hoverTextColor = DEFAULT_TEXT_COLOR,
//   color = DEFAULT_COLOR,
//   hoverColor = DEFAULT_HOVER_COLOR
// }) => {
//   const _className = `${color} ${hoverColor} my-1 mr-2 text-button-primary hover:text-button-primary-active font-bold py-2 px-4 rounded`
//   return (
//     <button className={_className} onClick={handleClick} value={value}>{label}</button>
//   )
// }

// export default Button
