import React, { useState, useEffect, useRef } from 'react'

import { isDateInPast, createDisplayTime } from './lib/calculate-duration'

const now = new Date()
const year = now.getFullYear()
const nextYear = now.getFullYear() + 1

const XMAS = isDateInPast(new Date(`12/25/${year}`)) 
  ? new Date(`12/25/${nextYear}`) 
  : new Date(`12/25/${year}`)


const CountdownClockHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Countdown Clock</h1>
          <p>The <i>Countdown Clock</i> will display the amount of days, hours, minutes and seconds until the next annual instance of a date. Like Christmas, Thanksgiving or Boxing Day.</p>
        </div>
      </div>
    </section>
  )
}

const CountdownClockDisplay = ({ displayTime }) => { 
  console.log(displayTime); 
  return (
    <div className='text-center'>
      <h2 className={`display-1 display-large`}>{displayTime.clockValue}</h2>
    </div>
  )
}

const CountdownClockBody = ({displayTime}) => {
  return (
    <div>
      <CountdownClockDisplay displayTime={displayTime} />
    </div>
  )
}

function CountdownClock () {
  const [_date, setDate] = useState(XMAS)
  const [displayTime, setDisplayTime] = useState(createDisplayTime(_date))
  
  const tick = () => {
    setDisplayTime(createDisplayTime(_date))
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  })

  return (
    <div>
      <CountdownClockHeader />
      <hr />
      <CountdownClockBody displayTime={displayTime} />
    </div>
  )
}

export default CountdownClock