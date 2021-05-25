import React from 'react'


function Navbar ({currentTheme, setTheme}) {

  const handleThemeToggle = (e) => {
    const t =  currentTheme === "theme-light" ? "theme-dark" : "theme-light"
    console.log(t)
    setTheme(t)
  }

  return (
    <nav className='bg-skin-secondary-fill border-b-2 border-skin-emphasis-fill'>
      <div className='max-w-8xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div>
            <a className='text-xl text-skin-primary hover:text-skin-emphasis' href='/'>
              <span>UtilitiesFor.me</span>
            </a>
          </div>
          <div>
            <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
              <button onClick={handleThemeToggle}>Toggle Theme</button>
            </span>
            <span className='text-xl text-skin-primary hover:text-skin-emphasis'>
              <a href='https://github.com/mattc41190/utilitiesforme'><i className='bi bi-github' /></a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
