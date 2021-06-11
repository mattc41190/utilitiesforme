import React from 'react'

function Navbar ({ currentTheme, setTheme }) {
  return (
    <nav className='bg-theme-secondary-fill border-b-2 border-theme-secondary-complement'>
      <div className='max-w-8xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div>
            <a className='text-xl text-theme-secondary hover:text-theme-emphasis' href='/'>
              <span>UtilitiesFor.me</span>
            </a>
          </div>
          <div className='text-xl text-theme-secondary hover:text-theme-emphasis'>
            <a href='https://github.com/mattc41190/utilitiesforme'><i className='bi bi-github' /></a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
