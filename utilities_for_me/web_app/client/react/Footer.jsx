import React, {useState} from 'react'


function Footer ({currentTheme, setTheme}) {

  const handleThemeToggle = (e) => setTheme(e.target.value)

  return (
    <div className='mt-6 bg-skin-secondary-fill border-t-2 border-skin-emphasis-fill'>
      <div className='flex items-center justify-center h-16'>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value="theme-light" className="focus:outline-none" onClick={handleThemeToggle}>🤍</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value="theme-dark" className="focus:outline-none" onClick={handleThemeToggle}>🖤</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value="theme-ocean" className="focus:outline-none" onClick={handleThemeToggle}>💙</button>
        </span>
      </div>
    </div>
  )
}

export default Footer
