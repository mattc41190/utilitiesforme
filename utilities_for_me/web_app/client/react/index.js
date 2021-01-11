import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './app/DarkMode';

ReactDOM.render(<BrowserRouter> <DarkModeProvider><App /></DarkModeProvider> </BrowserRouter>, document.getElementById('root'))
