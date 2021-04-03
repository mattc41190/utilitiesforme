const getMinutes = (totalTime) => {
    let minutes = Math.floor(totalTime / 60)
    minutes = minutes > 99 ? 99 : minutes
    return minutes
}

const getSeconds = (totalTime) => {
    const seconds = Math.floor(totalTime % 60)
    return seconds
}


const translateFromSeconds = (intTime) => {

    if (isNaN(intTime) || !Number.isInteger(parseInt(intTime))) {
        console.error("You broke the timer jackass!")
        return "Error"
    }

    let minutes = getMinutes(intTime)
    minutes = minutes > 99 ? 99 : minutes
    if (minutes < 10 && minutes >= 1) {
        minutes = `0${minutes}`
    } else if (minutes < 1) {
        minutes = '00'
    }


    let seconds = getSeconds(intTime)
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
    getMinutes,
    getSeconds,
    translateFromSeconds,
    translateToSeconds
}