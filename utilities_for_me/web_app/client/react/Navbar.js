import React from 'react'

import {useDarkMode} from './app/DarkMode'

function Navbar() {
  const darkModeState = useDarkMode()
  const navbarBgClass = darkModeState.dark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
  const navbarBrandClass = darkModeState.dark ? 'text-white' : ''
  const darkModeToggleBtnText = darkModeState.dark ? "🌤" : "🌙"
  const darkModeToggleBtnClass = darkModeState.dark ? "btn-info" : "btn-dark"


  return (
    <nav className={`navbar ${navbarBgClass} border-bottom border-info dark-mode`}>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'><span className={`navbar-brand mb-0 h1 ${navbarBrandClass}`}>UtilitiesFor.me</span></a>

        <div className="d-flex">
        <button className="btn btn-secondary mx-2">Client 🏡</button>
        <button className={`btn ${darkModeToggleBtnClass} mx-2`} onClick={(e)=>darkModeState.toggle()}>{darkModeToggleBtnText}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
