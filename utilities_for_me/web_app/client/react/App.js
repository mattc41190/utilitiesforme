import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Echo from './Echo'
import Error from './Error'


function App() {
    return (
        <main className="row">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/echo' component={Echo} />
                <Route component={Error} />
            </Switch>
        </main>
    )
}


export default App;