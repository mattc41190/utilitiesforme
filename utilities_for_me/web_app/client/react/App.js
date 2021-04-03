import React from 'react'
import { Switch, Route } from 'react-router-dom'
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


function App () {
  return (
    <main>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/echo' component={Echo} />
          <Route path='/prettify' component={Prettify} />
          <Route path='/case-transform' component={CaseTransform} />
          <Route path='/calculate-percent' component={CalculatePercent} />
          <Route path='/generate-random-string' component={GenerateRandomString} />
          <Route path='/encrypt-decrypt' component={EncryptDecrypt} />
          <Route path='/timer' component={Timer} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  )
}

export default App
