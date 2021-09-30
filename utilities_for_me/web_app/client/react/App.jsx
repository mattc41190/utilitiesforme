import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import { getCookie, setCookie } from './common/cookies'

import Home from './Home'
import Navbar from './Navbar'
import Error from './Error'

import Echo from './Echo'
import Prettify from './Prettify'
import CaseTransform from './CaseTransform'
import CalculatePercent from './CalculatePercent'
import GenerateRandomString from './GenerateRandomString'
import EncryptDecrypt from './EncryptDecrypt'
import Timer from './Timer'
import CountdownClock from './CountdownClock'
import Footer from './Footer'
import Count from './Count'
import Breakout from './Breakout'

function App () {
  const cookieTheme = getCookie('theme')
  const defaultTheme = 'theme-light'
  const [theme, setTheme] = useState(cookieTheme || defaultTheme)

  useEffect(() => {
    const app = document.getElementById('app')
    const color = window.getComputedStyle(app).backgroundColor

    const root = document.getElementById('root')
    const html = document.getElementsByTagName('html')[0]
    const body = document.body

    body.style.backgroundColor = color
    html.style.backgroundColor = color
    root.style.backgroundColor = color

    setCookie('theme', theme, 365)
  }, [theme])

  return (
    <main id='app' className={`${theme} flex flex-col h-screen bg-theme-primary-fill text-theme-primary`}>
      <Navbar currentTheme={theme} setTheme={setTheme} />
      <div className='container mx-auto flex-1'>
        <Switch>
          <Route exact path='/'>
            <Home currentTheme={theme} />
          </Route>
          <Route path='/echo' component={Echo} />
          <Route path='/prettify' component={Prettify} />
          <Route path='/case-transform' component={CaseTransform} />
          <Route path='/calculate-percent' component={CalculatePercent} />
          <Route path='/generate-random-string' component={GenerateRandomString} />
          <Route path='/encrypt-decrypt' component={EncryptDecrypt} />
          <Route path='/timer' component={Timer} />
          <Route path='/countdown-clock' component={CountdownClock} />
          <Route path='/count' component={Count} />
          <Route path='/breakout' component={Breakout} />

          <Route component={Error} />
        </Switch>
      </div>
      <Footer currentTheme={theme} setTheme={setTheme} />
    </main>
  )
}

export default App
