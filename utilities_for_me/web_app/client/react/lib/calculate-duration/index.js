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

const getMemorialDay = (year, nextYear) => {
  // Memorial Day is the last monday of May
  const getMemorialDayForYear = (y) => {
    const mondayIndex = 1

    let day = 31
    let date = new Date(`05/${day}/${y}`)
    let dayOfWeek = date.getDay()

    while (dayOfWeek != mondayIndex) {
      day = day-1
      date = new Date(`05/${day}/${y}`)
      dayOfWeek = date.getDay()
    }

    return date
  }

  const currentYearMemorialDay = getMemorialDayForYear(year)
  const nextYearMemorialDay = getMemorialDayForYear(nextYear)

  const memorialDay = isDateInPast(currentYearMemorialDay) 
  ? nextYearMemorialDay
  : currentYearMemorialDay

  return memorialDay
}

const getLaborDay = (year, nextYear) => {
  // Labor is the first monday of September 
  const getLaborDayForYear = (y) => {
    const mondayIndex = 1

    let day = 01
    let date = new Date(`09/${day}/${y}`)
    let dayOfWeek = date.getDay()

    while (dayOfWeek != mondayIndex) {
      day = day+1
      date = new Date(`09/${day}/${y}`)
      dayOfWeek = date.getDay()
    }

    return date
  }

  const currentYearLaborDay = getLaborDayForYear(year)
  const nextYearLaborDay = getLaborDayForYear(nextYear)

  const laborDay = isDateInPast(currentYearLaborDay) 
  ? nextYearLaborDay
  : currentYearLaborDay

  return laborDay
}


const getDefaultDates = () => {
  const now = new Date()
  const year = now.getFullYear()
  const nextYear = now.getFullYear() + 1
  
  const christmas = getHolidayByDay(12, 25, year, nextYear)
  const independenceDay = getHolidayByDay(07, 04, year, nextYear)
  const halloween = getHolidayByDay(10, 31, year, nextYear)
  const mlkDay = getHolidayByDay(01, 17, year, nextYear)
  const valentinesDay = getHolidayByDay(02, 14, year, nextYear)
  const boxingDay = getHolidayByDay(12, 26, year, nextYear)
  const newYearsDay = getHolidayByDay(01, 01, year, nextYear)

  const thanksgiving = getThanksgiving(year, nextYear)
  const memorialDay = getMemorialDay(year, nextYear)
  const laborDay = getLaborDay(year, nextYear)
  
  const dates = {
    christmas: {
      date: christmas,
      label: "christmas"
    },
    thanksgiving: {
      date: thanksgiving,
      label: "thanksgiving"
    },
    independenceDay: {
      date: independenceDay,
      label: "independenceDay"
    },
    halloween: {
      date: halloween,
      label: "halloween"
    },
    mlkDay: {
      date: mlkDay,
      label: "mlkDay"
    }, 
    valentinesDay: {
      date: valentinesDay,
      label: "valentinesDay"
    }, 
    memorialDay: {
      date: memorialDay,
      label: "memorialDay"
    }, 
    laborDay: {
      date: laborDay,
      label: "laborDay"
    }, 
    boxingDay: {
      date: boxingDay,
      label: "boxingDay"
    }, 
    newYearsDay: {
      date: newYearsDay,
      label: "newYearsDay"
    }, 
  }

  return dates
}

const getWeekDay = (date) => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const day = date.getDay()
  return weekdays[day]
}

module.exports = {
  calculateTimeLeft,
  createDisplayTime,
  isDateInPast,
  getDefaultDates,
  getWeekDay
}

