const getMinutesOnly = (totalTimeInSeconds) => {
  let minutes = Math.floor(totalTimeInSeconds / 60)
  minutes = minutes > 99 ? 99 : minutes
  return minutes
}

const getSecondsOnly = (totalTimeInSeconds) => {
  const seconds = Math.floor(totalTimeInSeconds % 60)
  return seconds
}

const translateFromSeconds = (intTime) => {
  if (isNaN(intTime) || !Number.isInteger(parseInt(intTime))) {
    console.error('You broke the timer jackass!')
    return 'Error'
  }

  let minutes = getMinutesOnly(intTime)
  minutes = minutes > 99 ? 99 : minutes
  if (minutes < 10 && minutes >= 1) {
    minutes = `0${minutes}`
  } else if (minutes < 1) {
    minutes = '00'
  }

  let seconds = getSecondsOnly(intTime)
  if (seconds < 10 && seconds >= 1) {
    seconds = `0${seconds}`
  } else if (seconds < 1) {
    seconds = '00'
  }

  return `${minutes}:${seconds}`
}

const translateToSeconds = (minutes, seconds) => {
  return (minutes * 60) + seconds
}

module.exports = {
  getMinutesOnly,
  getSecondsOnly,
  translateFromSeconds,
  translateToSeconds
}
