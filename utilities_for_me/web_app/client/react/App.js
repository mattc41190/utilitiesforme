import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Home from './Home'
import Home from './HomeTailwind'
// import Navbar from './Navbar'
import Navbar from './NavbarTailwind'

import Error from './Error'

// import Echo from './Echo'
import Echo from './EchoTailwind'
// import Prettify from './Prettify'
import Prettify from './PrettifyTailwind'
import CaseTransform from './CaseTransform'
// import CalculatePercent from './CalculatePercent'
import CalculatePercent from './CalculatePercentTailwind'
import GenerateRandomString from './GenerateRandomString'
import EncryptDecrypt from './EncryptDecrypt'
import Timer from './Timer'
import CountdownClock from './CountdownClock'

function App () {
  return (
    <main>
      <Navbar />
      {/* Tailwind on NON-SUFFIXED component */}
      <div className='container mx-auto'> 
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/echo' component={Echo} />
          <Route path='/prettify' component={Prettify} />
          <Route path='/case-transform' component={CaseTransform} />
          <Route path='/calculate-percent' component={CalculatePercent} />
          <Route path='/generate-random-string' component={GenerateRandomString} />
          <Route path='/encrypt-decrypt' component={EncryptDecrypt} />
          <Route path='/timer' component={Timer} />
          <Route path='/countdown-clock' component={CountdownClock} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  )
}

export default App
