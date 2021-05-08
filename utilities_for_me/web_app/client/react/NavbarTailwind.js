import React from 'react'

function Navbar () {
  return (
    <nav className='bg-gray-100 border-b-2 border-green-600'>
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
        <a className='text-xl text-green-500 hover:text-green-800' href='/'>
          <span>UtilitiesFor.me</span>
        </a>
        <span className='text-xl text-green-500 hover:text-green-800'> 
          <a href='https://github.com/mattc41190/utilitiesforme'><i className='bi bi-github'/></a>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
