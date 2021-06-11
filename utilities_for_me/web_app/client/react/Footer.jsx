import React from 'react'

function Footer ({ currentTheme, setTheme }) {
  const handleThemeToggle = (e) => setTheme(e.target.value)

  return (
    <div className='mt-6 bg-theme-secondary-fill border-t-2 border-theme-secondary-complement'>
      <div className='flex items-center justify-center h-16'>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-light' className='focus:outline-none' onClick={handleThemeToggle}>🤍</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-dark' className='focus:outline-none' onClick={handleThemeToggle}>🖤</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-blue' className='focus:outline-none' onClick={handleThemeToggle}>💙</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-green' className='focus:outline-none' onClick={handleThemeToggle}>💚</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-orange' className='focus:outline-none' onClick={handleThemeToggle}>🧡</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-purple' className='focus:outline-none' onClick={handleThemeToggle}>💜</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-pink' className='focus:outline-none' onClick={handleThemeToggle}>💖</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          |
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-tree' className='focus:outline-none' onClick={handleThemeToggle}>🌳</button>
        </span>
        <span className='text-xl text-skin-primary hover:text-skin-emphasis mr-3'>
          <button value='theme-hacker' className='focus:outline-none' onClick={handleThemeToggle}>🖥</button>
        </span>
      </div>
    </div>
  )
}

export default Footer
