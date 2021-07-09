import React, { useState, useEffect, useRef } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

import { translateFromSeconds } from './lib/timer'

const THIRTY_SECONDS_STR = 'THIRTY_SECONDS'
const FIVE_MINUTES_STR = 'FIVE_MINUTES'
const TEN_MINUTES_STR = 'TEN_MINUTES'
const TWENTY_FIVE_MINUTES_STR = 'TWENTY_FIVE_MINUTES'

const THIRTY_SECONDS = 30
const FIVE_MINUTES = 5 * 60
const TEN_MINUTES = FIVE_MINUTES * 2
const TWENTY_FIVE_MINUTES = FIVE_MINUTES * 5

const TIMER_MAP = {
  THIRTY_SECONDS,
  FIVE_MINUTES,
  TEN_MINUTES,
  TWENTY_FIVE_MINUTES,
  custom: null
}

const NOT_DONE = 'not-done'
const DONE = 'done'
const DELETE = 'delete'

const TimerHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Timer</h1>
      <p>The <i>Timer</i> utility contains a settable timer. Set a time and walk away, when the <i>timer</i>  finishes it will beep and flash to let you know.</p>
    </section>
  )
}

const TimerSelectorButton = ({ resetTimer, timerDurationValue, timerDurationDisplay }) => {
  return (
    <Button
      color={COLORS.green}
      hoverColor={COLORS.greenHover}
      handleClick={resetTimer}
      value={timerDurationValue}
      label={timerDurationDisplay}
    />
  )
}

const TimerSelectorButtons = ({ timerIdentifiers, resetTimer }) => {
  const timerButtons = timerIdentifiers.map((timerIdentifier, i) => {
    return (
      <TimerSelectorButton
        key={i}
        resetTimer={resetTimer}
        timerDurationValue={timerIdentifier.timerDurationValue}
        timerDurationDisplay={timerIdentifier.timerDurationDisplay}
      />
    )
  })

  return (
    <div className='flex justify-around'>{timerButtons}</div>
  )
}

const TimerSelectorSection = ({ resetTimer }) => {
  const timerIdentifiers = [
    { timerDurationValue: THIRTY_SECONDS_STR, timerDurationDisplay: '00:30' },
    { timerDurationValue: FIVE_MINUTES_STR, timerDurationDisplay: '05:00' },
    { timerDurationValue: TEN_MINUTES_STR, timerDurationDisplay: '10:00' },
    { timerDurationValue: TWENTY_FIVE_MINUTES_STR, timerDurationDisplay: '25:00' }
  ]

  return (
    <div>
      <TimerSelectorButtons resetTimer={resetTimer} timerIdentifiers={timerIdentifiers} />
    </div>
  )
}

const TimerDisplay = ({ timeRemaining, timerComplete }) => {
  const blinkClass = timerComplete ? 'timer-blinking' : ''
  const displayTime = translateFromSeconds(timeRemaining)
  return (
    <div className='my-6 text-center'>
      <div className={`text-8xl md:text-9xl font-light ${blinkClass}`}>{displayTime}</div>
    </div>
  )
}

const TimerManager = ({ isRunning, timerComplete, toggleTimer, selectedTimer, resetTimer }) => {
  const buttonText = isRunning ? 'STOP' : 'START'
  const colorClass = isRunning ? 'yellow' : 'green'

  return (
    <div className='text-center'>
      <button
        disabled={timerComplete}
        className={`bg-${colorClass}-500 hover:bg-${colorClass}-700 my-1 mr-2 text-white font-bold text-lg py-3 px-6 rounded`}
        onClick={toggleTimer}
        value='toggle'
      >
        {buttonText}
      </button>

      <button
        className='bg-red-500 hover:bg-red-700 my-1 mr-2 text-white font-bold text-lg py-3 px-6 rounded' onClick={resetTimer}
        value={selectedTimer}
      >
        RESET
      </button>
    </div>
  )
}

const TimerBody = ({
  timeRemaining,
  setTimeRemaining,
  isRunning,
  selectedTimer,
  toggleTimer,
  resetTimer,
  timerComplete
}) => {
  return (
    <section className='mt-8 mb-4 flex flex-col justify-center'>
      <div className='w-4/12 self-center'>
        <TimerSelectorSection resetTimer={resetTimer} />
      </div>
      <div>
        <TimerDisplay
          timeRemaining={timeRemaining}
          isRunning={isRunning}
          setTimeRemaining={setTimeRemaining}
          timerComplete={timerComplete}
        />
      </div>
      <div>
        <TimerManager
          timerComplete={timerComplete}
          isRunning={isRunning}
          selectedTimer={selectedTimer}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
        />
      </div>
    </section>
  )
}

const ToDoInput = ({ newToDoValue, handleChange, addToDo }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addToDo()
    }
  }

  return (
    <div>
      <input
        className='w-full p-4 mb-4 text-xl bg-theme-input-primary-fill'
        placeholder='Item To Focus On'
        value={newToDoValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        handleClick={addToDo}
        value='add' label='Add'
        color={COLORS.green}
        hoverColor={COLORS.greenHover}
      />
    </div>
  )
}

const ToDo = ({ todo, updateToDo }) => {
  const className = `mb-3 flex flex-row justify-between border-2 rounded-sm border-theme-primary-complement items-center px-4 py-3 ${todo.status === DONE ? 'bg-green-500 text-gray-100' : ''}`

  return (
    <div className={className}>
      <div todoid={todo.id} className='text-xl'>{todo.value}</div>
      <div>
        <Button
          handleClick={() => updateToDo(todo.id, DONE)}
          value='done' label='✅'
          color={COLORS.gray}
          hoverColor={COLORS.grayHover}
        />
        <Button
          handleClick={() => updateToDo(todo.id, DELETE)}
          value='delete' label='🚫'
          color={COLORS.gray}
          hoverColor={COLORS.grayHover}
        />
      </div>
    </div>
  )
}

const ToDoList = ({ todos = [], updateToDo }) => {
  return (
    <div className='mt-5 flex flex-col max-h-56 overflow-auto'>
      {todos.map(todo => <ToDo key={todo.id} todo={todo} updateToDo={updateToDo} />)}
    </div>
  )
}

const Admin = ({ todos }) => {
  const logAsJSON = (e) => {
    console.log(JSON.stringify(todos, null, 2))
  }

  return (
    <div className='mt-4'>
      <Button
        handleClick={logAsJSON}
        value='logJSON' label='Log JSON'
        color={COLORS.blue}
        hoverColor={COLORS.blueHover}
      />
    </div>
  )
}

const ToDoBody = () => {
  const [todos, setToDos] = useState([])

  const [newToDoValue, setNewToDoValue] = useState('')

  const handleInputChange = (e) => {
    setNewToDoValue(e.target.value)
  }

  const addToDo = (e) => {
    const newToDo = { value: newToDoValue, status: NOT_DONE, created_at: new Date(), id: Date.now() }
    setToDos([newToDo, ...todos])
    setNewToDoValue('')
  }

  const updateToDo = (id, action) => {
    let index = -1
    const toDoToUpdate = todos.find((todo, _index) => {
      if (todo.id === id) {
        index = _index
        return true
      } else {
        return false
      }
    })

    // console.log(toDoToUpdate, index)

    if (action === DONE && toDoToUpdate.status !== DONE) {
      toDoToUpdate.status = DONE
      const newToDos = [...todos]
      newToDos.splice(index, 1, toDoToUpdate)
      setToDos(newToDos)
    } else if (action === DONE && toDoToUpdate.status === DONE) {
      toDoToUpdate.status = NOT_DONE
      const newToDos = [...todos]
      newToDos.splice(index, 1, toDoToUpdate)
      setToDos(newToDos)
    } else if (action === DELETE) {
      const newToDos = [...todos]
      newToDos.splice(index, 1)
      setToDos(newToDos)
    }
  }

  return (
    <div className='mt-8 flex flex-row justify-center'>
      <div className='w-1/2'>
        <ToDoInput
          newToDoValue={newToDoValue}
          handleChange={handleInputChange}
          addToDo={addToDo}
        />
        <ToDoList todos={todos} updateToDo={updateToDo} />
        <Admin todos={todos} />
      </div>

    </div>
  )
}

function Timer () {
  const defaultTitle = 'Utilities For Me'
  const [isRunning, setIsRunning] = useState(false)
  const [selectedTimer, setSelectedTimer] = useState(TWENTY_FIVE_MINUTES_STR)
  const [timeRemaining, setTimeRemaining] = useState(TWENTY_FIVE_MINUTES)
  const [timerComplete, setTimerComplete] = useState(false)
  const [alarmPlaying, setAlarmPlaying] = useState(false)
  const audio = useRef(new window.Audio(`${window.staticRoot}/static/sounds/alarm-clock.mp3`))

  const finishTimer = () => {
    setIsRunning(false)
    setTimerComplete(true)
    setAlarmPlaying(true)
  }

  const tick = () => {
    if (isRunning) {
      if (timeRemaining >= 1) {
        setTimeRemaining(timeRemaining - 1)
      } else {
        finishTimer()
      }
    }
  }

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = (e) => {
    const desiredTimer = e.target.value
    setAlarmPlaying(false)
    setSelectedTimer(desiredTimer)
    setIsRunning(false)
    setTimeRemaining(TIMER_MAP[desiredTimer])
    setTimerComplete(false)
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  })

  useEffect(() => {
    alarmPlaying
      ? audio.current.play()
      : (audio.current.pause() && (audio.current.currentTime = 0))
  }, [alarmPlaying])

  useEffect(() => {
    document.title = `${defaultTitle} - ${translateFromSeconds(timeRemaining)}`
    return () => { document.title = defaultTitle }
  }, [timeRemaining])

  return (
    <div className='mt-6 text-skin-primary'>
      <TimerHeader />
      <hr />
      <TimerBody
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        selectedTimer={selectedTimer}
        resetTimer={resetTimer}
        timerComplete={timerComplete}
      />
      <hr />
      <ToDoBody />
    </div>
  )
}

export default Timer

// // Undone! Finish this to allow users to set a custom timer
// // TODO: Make settable timer
// const TimerSetter = () => {
//   // const [minutes, setMinutes] = useState(getMinutes(timeRemaining))
//   // const [seconds, setSeconds] = useState(getSeconds(timeRemaining))
//   // const updateTime = (_minutes, _seconds) => {
//   //   console.log(`Setting time to: ${translateToSeconds(_minutes, _seconds)}`)
//   //   setTimeRemaining(translateToSeconds(_minutes, _seconds))
//   // }

//   // const updateMinutes = (e) => {
//   //   let localMinutes = parseInt(e.target.value) || 0
//   //   localMinutes = localMinutes > 99 ? 99 : localMinutes
//   //   setMinutes(localMinutes)
//   //   updateTime(localMinutes, seconds)
//   // }
//   // const updateSeconds = (e) => {
//   //   let localSeconds = parseInt(e.target.value) || 0
//   //   localSeconds = localSeconds > 59 ? 59 : localSeconds
//   //   setSeconds(localSeconds)
//   //   updateTime(minutes, localSeconds)
//   // }
//   // return (
//   //   <h2>
//   //     <input type="number" onChange={updateMinutes} value={minutes}></input>
//   //     <input type="number" onChange={updateSeconds} value={seconds}></input>
//   //   </h2>
//   // )
// }
