import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Echo from './Echo'
import Navbar from './Navbar'
import Error from './Error'

function App () {
  return (
    <main>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/echo' component={Echo} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  )
}

export default App
