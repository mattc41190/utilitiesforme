// Really great stuff on making a custom context hook

import React, { useContext, createContext, useEffect, useState } from 'react'

// Interested in actually modifying classes
const toggleBodyClasses = isDarkMode => {
    if (isDarkMode) {
      // here's a good place to add a dark-mode css classes to our <body> and remove light mode
      document.body.classList.add('bg-dark', 'text-light')
      document.body.classList.remove('bg-light', 'text-dark')
    } else {
      // remove the dark mode classes, add light mode
      document.body.classList.add('bg-light', 'text-dark')
      document.body.classList.remove('bg-dark', 'text-light')
    }

}

// The defaults for our context hooks
const defaultContextData = {
    dark: false,
    toggle: () => { }
}

//  Create the Context 
const DarkModeContext = createContext(defaultContextData)

// Tell React to "use" the context
const useDarkMode = () => useContext(DarkModeContext)

// Create a CUSTOM useEffect hook which leverage state hooks and can call the toggle func
// it ESSENTIALLY returns a useState hook but it is massaged with a useEffect hook before return
const useEffectDarkMode = () => {
    const [darkModeState, setDarkModeState] = useState({
        dark: false,
        hasDarkModeMounted: false
    })
    useEffect(() => {
        const localStorageDark = localStorage.getItem("dark") === "true"
        toggleBodyClasses(localStorageDark)

        setDarkModeState({ dark: localStorageDark, hasDarkModeMounted: true })
    }, [])

    return [darkModeState, setDarkModeState]
}

// Create our context provider which is a hook and custom element itself
const DarkModeProvider = ({ children }) => {
    //  Use our hook from above
    const [darkModeState, setDarkModeState] = useEffectDarkMode()
  
    // If we have not yet check for localStorage state 
    if (!darkModeState.hasDarkModeMounted) {
      return <div />
    }
  
    const toLightMode = () => {
      if (darkModeState.dark) {
        toggle()
      }
    }
    const toDarkMode = () => {
      if (!darkModeState.dark) {
        toggle()
      }
    }
    const toggle = () => {
      const dark = !darkModeState.dark
      localStorage.setItem("dark", JSON.stringify(dark))
      
      toggleBodyClasses(dark)
      setDarkModeState({ ...darkModeState, dark})
    }
    return (
        <DarkModeContext.Provider
          value={{
            dark: darkModeState.dark,
            toDark: toDarkMode,
            toLight: toLightMode,
            toggle: toggle
          }}
        >
          {children}
        </DarkModeContext.Provider>
    );
  };

module.exports = { DarkModeProvider, useDarkMode }
