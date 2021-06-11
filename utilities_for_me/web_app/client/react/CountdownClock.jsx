import React, { useState, useEffect } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

import { createDisplayTime, getDefaultDates, getWeekDay } from './lib/calculate-duration'

const DEFAULT_DATES = getDefaultDates()

const DEFAULT_DATE_DISPLAY_DATA = [
  {
    label: 'christmas',
    title: 'Christmas 🎅',
    classColorName: COLORS.green,
    classColorHoverName: COLORS.greenHover
  },
  {
    label: 'thanksgiving',
    title: 'Thanksgiving 🦃',
    classColorName: COLORS.yellow,
    classColorHoverName: COLORS.yellowHover
  },
  {
    label: 'independenceDay',
    title: 'July Fourth 🦅',
    classColorName: COLORS.blue,
    classColorHoverName: COLORS.blueHover
  },
  {
    label: 'halloween',
    title: 'Halloween 🎃',
    classColorName: COLORS.indigo,
    classColorHoverName: COLORS.indigoHover
  },
  {
    label: 'mlkDay',
    title: 'Martin Luther King Jr Day 🤝',
    classColorName: COLORS.purple,
    classColorHoverName: COLORS.purpleHover
  },
  {
    label: 'valentinesDay',
    title: 'Valentines Day 💖',
    classColorName: COLORS.pink,
    classColorHoverName: COLORS.pinkHover
  },
  {
    label: 'memorialDay',
    title: 'Memorial Day 🇺🇸',
    classColorName: COLORS.blue,
    classColorHoverName: COLORS.blueHover
  },
  {
    label: 'laborDay',
    title: 'Labor Day 💪',
    classColorName: COLORS.green,
    classColorHoverName: COLORS.greenHover
  },
  {
    label: 'boxingDay',
    title: 'Boxing Day 🥊',
    classColorName: COLORS.gray,
    classColorHoverName: COLORS.grayHover
  },
  {
    label: 'newYearsDay',
    title: 'New Years Day 🎆',
    classColorName: COLORS.indigo,
    classColorHoverName: COLORS.indigoHover
  }
]

const getDateUIData = (label) => {
  const defaultUIDateInfo = { classColorName: 'primary', title: 'Custom Date' }
  const uiDateInfo = DEFAULT_DATE_DISPLAY_DATA.find((uiDateInfo) => uiDateInfo.label === label)
  return uiDateInfo || defaultUIDateInfo
}

const CountdownClockHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Countdown Clock</h1>
      <p>The <i>Countdown Clock</i> will display the amount of days, hours, minutes and seconds until the next annual instance of a date. Like Christmas, Thanksgiving or Boxing Day.</p>
    </section>
  )
}

const CountdownClockDisplay = ({ displayTime, holiday = 'Your custom date', _date }) => {
  const weekday = getWeekDay(_date)
  const friendlyDate = `${_date.getMonth() + 1}/${_date.getDate()}/${_date.getFullYear()}`
  return (
    <div className='text-center'>
      <h2 className='text-6xl md:text-9xl md:font-light mb-4'>{displayTime.clockValue}</h2>
      <h5>Until: {holiday}</h5>
      <small>Which is on {weekday},({friendlyDate}), by the way!</small>
    </div>
  )
}

const CountdownClockSelectorButton = ({ title, label, chooseDate }) => {
  const uiData = getDateUIData(label)
  return (
    <Button
      color={uiData.classColorName}
      hoverColor={uiData.classColorHoverName}
      handleClick={chooseDate}
      value={label}
      label={uiData.title}
    />
  )
}

const CountdownClockSelectorButtons = ({ presetDates, chooseDate }) => {
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
    <div className='flex flex-row flex-wrap justify-center mt-8 mb-6'>{dateButtons}</div>
  )
}

const CountdownClockSelectorSection = ({ presetDates, chooseDate }) => {
  return (
    <div>
      <CountdownClockSelectorButtons presetDates={presetDates} chooseDate={chooseDate} />
    </div>
  )
}

const CountdownClockBody = ({ displayTime, _date, holidayUIData, presetDates, chooseDate }) => {
  return (
    <div>
      <CountdownClockSelectorSection presetDates={presetDates} chooseDate={chooseDate} />
      <CountdownClockDisplay holiday={holidayUIData.title} _date={_date} displayTime={displayTime} />
    </div>
  )
}

function CountdownClock () {
  const [_date, setDate] = useState(DEFAULT_DATES.christmas)
  const [displayTime, setDisplayTime] = useState(createDisplayTime(_date.date))

  const chooseDate = (e) => {
    const chosenDateLabel = e.target.value
    for (const key in DEFAULT_DATES) {
      const fnLocalDate = DEFAULT_DATES[key]
      if (fnLocalDate.label === chosenDateLabel) {
        setDate(fnLocalDate)
        setDisplayTime(createDisplayTime(fnLocalDate.date))
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

  const holidayUIData = getDateUIData(_date.label)

  return (
    <div className='mt-6 text-skin-primary'>
      <CountdownClockHeader />
      <hr />
      <CountdownClockBody
        _date={_date.date}
        holidayUIData={holidayUIData}
        displayTime={displayTime}
        presetDates={DEFAULT_DATES}
        chooseDate={chooseDate}
      />
    </div>
  )
}

export default CountdownClock
