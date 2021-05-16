import React from 'react'

function Navbar () {
  return (
    <nav className='navbar navbar-light bg-light border-bottom border-info'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'><span className='navbar-brand mb-0 h1'>UtilitiesFor.me</span></a>
        <span className='navbar-text me-4'> <a href='https://github.com/mattc41190/utilitiesforme'><i className='bi bi-github' /></a> </span>
      </div>
    </nav>
  )
}

export default Navbar
