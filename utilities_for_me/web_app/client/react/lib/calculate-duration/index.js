
// Based On This Article:
// https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
//
// Key Insights: 
// https://gist.github.com/mattc41190/9a59fef9a66c4e0f230a6e3c1f81c755


const calculateTimeLeft = (month, day, year) => {
  const now = new Date()
  const nowInt = Date.parse(now)

  year = year ? year : now.getFullYear()
  const oneHour = 60 * 60
  const oneDay = oneHour * 24

  const toDate = new Date(`${month}/${day}/${year}`)
  const toDateInt = Date.parse(toDate)
  
  const diff = toDateInt - nowInt
  const diffInSeconds = diff / 1000

  days =  Math.floor(diffInSeconds / oneDay)
  hours =  Math.floor((diffInSeconds / oneHour) % 24)
  minutes =  Math.floor((diffInSeconds / 60) % 60)
  seconds =  Math.floor(diffInSeconds % 60)

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

const createDisplayTime = (_date) => {
  let {days, hours, minutes, seconds} = calculateTimeLeft(
    _date.getMonth(), 
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

module.exports = {
  calculateTimeLeft,
  createDisplayTime,
  isDateInPast
}