// Key Insights: 
// https://gist.github.com/mattc41190/9a59fef9a66c4e0f230a6e3c1f81c755


const calculateTimeLeft = (month, day, year) => {
  const now = new Date()
  const nowInt = Date.parse(now)

  year = year ? year : now.getFullYear()

  const toDate = new Date(`${month}/${day}/${year}`)
  const toDateInt = Date.parse(toDate)
  
  const diff = toDateInt - nowInt

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

const createDisplayTime = (_date) => {
  let {days, hours, minutes, seconds} = calculateTimeLeft(
    _date.getMonth() + 1,  // We mix 0 indexed months with string based 1 indexed months :/ 
    _date.getDate(), 
    _date.getFullYear()
  )

  if (days < 100 && days >= 10) {
    days = `0${days}`
  } else if (days < 10 && days >= 1) {
    days = `00${days}`
  } else if (days < 1) {
    days = '000'
  }

  if (hours < 10 && hours >= 1) {
    hours = `0${hours}`
  } else if (hours < 1) {
    hours = '00'
  }

  if (minutes < 10 && minutes >= 1) {
    minutes = `0${minutes}`
  } else if (minutes < 1) {
    minutes = '00'
  }

  if (seconds < 10 && seconds >= 1) {
    seconds = `0${seconds}`
  } else if (seconds < 1) {
    seconds = '00'
  }

  return {
    inPast: isDateInPast(_date),
    clockValue: `${days}:${hours}:${minutes}:${seconds}`
  }

}

const isDateInPast = (_date) => {
  const now = new Date()
  const nowInt = Date.parse(now)
  const dateInt = Date.parse(_date)
  return nowInt - dateInt > 0
}

const getHolidayByDay = (month, day ,year, nextYear) => {
  const christmas = isDateInPast(new Date(`${month}/${day}/${year}`)) 
  ? new Date(`${month}/${day}/${nextYear}`) 
  : new Date(`${month}/${day}/${year}`)

  return christmas
} 

const getThanksgiving = (year, nextYear) => {
  // Thanksgiving is the 4th Thursday in November 
  const getThanksgivingForYear = (y) => {
    const firstDayOfNovember = new Date(`11/1/${y}`)
    const dayOfWeekNovemberFirst = firstDayOfNovember.getDay()
    const thanksgivingDay = 22 + ((11 - dayOfWeekNovemberFirst) % 7)
    return new Date(`11/${thanksgivingDay}/${y}`)
  }

  const currentYearThanksgiving = getThanksgivingForYear(year)
  const nextYearThanksgiving = getThanksgivingForYear(nextYear)

  const thanksgiving = isDateInPast(currentYearThanksgiving) 
  ? nextYearThanksgiving
  : currentYearThanksgiving

  return thanksgiving
}


const getDefaultDates = () => {
  const now = new Date()
  const year = now.getFullYear()
  const nextYear = now.getFullYear() + 1
  
  const christmas = getHolidayByDay(12, 25, year, nextYear)
  const independenceDay = getHolidayByDay(07, 04, year, nextYear)
  const halloween = getHolidayByDay(10, 31, year, nextYear)
  const mlkDay = getHolidayByDay(01, 17, year, nextYear)


  const thanksgiving = getThanksgiving(year, nextYear)
  
  const dates = {
    christmas: {
      date: christmas,
      label: "christmas",
      title: "Christmas 🎅"
    },
    thanksgiving: {
      date: thanksgiving,
      label: "thanksgiving",
      title: "Thanksgiving 🦃"
    },
    independenceDay: {
      date: independenceDay,
      label: "independenceDay",

      title: "July Fourth 🦅"
    },
    halloween: {
      date: halloween,
      label: "halloween",
      title: "Halloween 🎃"
    },
    mlkDay: {
      date: mlkDay,
      label: "mlkDay",
      title: "Martin Luther King Jr Day 🤝"
    },  
  }

  return dates
}



module.exports = {
  calculateTimeLeft,
  createDisplayTime,
  isDateInPast,
  getDefaultDates
}

