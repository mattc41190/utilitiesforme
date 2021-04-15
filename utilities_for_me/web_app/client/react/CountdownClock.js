import React, { useState, useEffect, useRef } from 'react'

import { isDateInPast, createDisplayTime, getDefaultDates } from './lib/calculate-duration'

const DEFAULT_DATES = getDefaultDates()

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

const CountdownClockSelectorButton = ({ title, label, chooseDate }) => {
  return (
    <button
      className='btn btn-outline-dark mx-2 mt-2 px-5 '
      onClick={ chooseDate }
      value={label}
    >
      {title}
    </button>
  )
}

const CountdownClockSelectorButtons = ({ presetDates, chooseDate }) => {
  console.log(presetDates);
  const dateKeys = Object.keys(presetDates)
  const dateButtons = dateKeys.map((dateKey, i) => {
    const dateInfo = presetDates[dateKey]
    return (
      <CountdownClockSelectorButton
        key={i}
        label={dateInfo.label}
        title={dateInfo.title}
        chooseDate={chooseDate}
      />
    )
  })

  return (
    <div>{dateButtons}</div>
  )
}

const CountdownClockSelectorSection = ({ presetDates, chooseDate }) => {
  return (
    <div className='text-center'>
      <CountdownClockSelectorButtons presetDates={presetDates} chooseDate={chooseDate} />
    </div>
  )
}

const CountdownClockBody = ({displayTime, presetDates, chooseDate}) => {
  return (
    <div>
      <CountdownClockSelectorSection presetDates={presetDates} chooseDate={chooseDate}  />
      <CountdownClockDisplay displayTime={displayTime} />
    </div>
  )
}

function CountdownClock () {
  const [_date, setDate] = useState(DEFAULT_DATES.christmas)
  const [displayTime, setDisplayTime] = useState(createDisplayTime(_date.date))

  const chooseDate = (e) => {
    const chosenDateLabel = e.target.value
    for (const key in DEFAULT_DATES) {
      console.log(DEFAULT_DATES[key])
      console.log(chosenDateLabel);
      console.log(DEFAULT_DATES[key]["label"]);
      if (DEFAULT_DATES[key]["label"] === chosenDateLabel) {
        setDate(DEFAULT_DATES[key])
        return
      }
    }
  }
  
  const tick = () => {
    setDisplayTime(createDisplayTime(_date.date))
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  })

  return (
    <div>
      <CountdownClockHeader />
      <hr />
      <CountdownClockBody 
        displayTime={displayTime}
        presetDates={DEFAULT_DATES}
        chooseDate={chooseDate}
       />
    </div>
  )
}

export default CountdownClock