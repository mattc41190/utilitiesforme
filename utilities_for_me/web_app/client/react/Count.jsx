import React, { useReducer, useEffect, useState } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

function useKeyPress (targetKey, cb) {
  function downHandler ({ key }) {
    if (key === targetKey) {
      cb()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => window.removeEventListener('keydown', downHandler)
  })
}

const NOOP = () => {}

const ADD = 'counter/add'
const REMOVE = 'counter/remove'
const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'
const SET_FOCUS = 'counter/setFocus'
const SET_NAME = 'counter/setName'
const SET_HOT_KEYS = 'counter/setHotKeys'

const INITIAL_STATE = {
  hotKeysEnabled: true,
  counters: [
    {
      id: 1,
      count: 0,
      name: 'Counter: 1',
      hasFocus: true
    }
  ]
}

const setNameAction = (name, id) => {
  return { type: SET_NAME, payload: { counterId: id, name: name } }
}

const setHotKeysAction = () => {
  return { type: SET_HOT_KEYS, payload: {} }
}

const addCounterAction = () => {
  return { type: ADD, payload: {} }
}

const removeCounterAction = (id) => {
  return { type: REMOVE, payload: { counterId: id } }
}

const incrementCounterAction = (id, amount) => {
  return { type: INCREMENT, payload: { counterId: id, amount: amount } }
}

const decrementCounterAction = (id, amount) => {
  return { type: DECREMENT, payload: { counterId: id, amount: amount } }
}

const setFocusAction = (id) => {
  return { type: SET_FOCUS, payload: { counterId: id } }
}

const findCounterById = (counters, id) => {
  return counters.findIndex(counter => counter.id === id)
}

const getNextId = (counters) => {
  const currentHighest = counters.reduce((current, counter) => {
    if (counter.id > current) {
      return counter.id
    } else {
      return current
    }
  }, -1)
  return currentHighest + 1
}

const sortCounters = (counters) => {
  counters.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }
    return -1
  })
}

const incrementReducer = (state, payload) => {
  const i = findCounterById(state.counters, payload.counterId)
  if (i === -1) {
    return state
  }
  const currCounter = state.counters[i]
  const newCounter = {
    ...currCounter,
    count: currCounter.count + payload.amount
  }
  const newCounters = state.counters.filter(counter => counter.id !== payload.counterId)
  newCounters.push(newCounter)
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const decrementReducer = (state, payload) => {
  const i = findCounterById(state.counters, payload.counterId)
  if (i === -1) {
    return state
  }
  const currCounter = state.counters[i]
  const newCounter = {
    ...currCounter,
    count: currCounter.count - payload.amount
  }
  const newCounters = state.counters.filter(counter => counter.id !== payload.counterId)
  newCounters.push(newCounter)
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const addReducer = (state, payload) => {
  if (state.counters.length > 256) {
    return state
  }
  const newId = getNextId(state.counters)
  const newCounter = {
    id: newId,
    name: `Counter: ${newId}`,
    count: 0,
    hasFocus: true
  }
  const newCounters = state.counters.map(counter => {
    return {
      ...counter,
      hasFocus: false
    }
  })
  newCounters.push(newCounter)
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const removeReducer = (state, payload) => {
  if (state.counters.length < 2) {
    const newCounter = { ...state.counters[0] }
    newCounter.hasFocus = true
    return { ...state, counters: [newCounter] }
  }

  const newCounters = state.counters.filter(counter => counter.id !== payload.counterId)
  const counterWithFocus = newCounters.find(counter => counter.hasFocus)
  if (!counterWithFocus) {
    newCounters[0].hasFocus = true
  }
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const setFocusReducer = (state, payload) => {
  const newCounters = state.counters.map(counter => {
    if (payload.counterId === counter.id) {
      return {
        ...counter,
        hasFocus: true
      }
    }
    return {
      ...counter,
      hasFocus: false
    }
  }) // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const setNameReducer = (state, payload) => {
  const newCounters = state.counters.map(counter => {
    if (payload.counterId === counter.id) {
      return {
        ...counter,
        name: payload.counterId
      }
    }
    return {
      ...counter
    }
  }) // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const setHotKeysReducer = (state, payload) => {
  return { ...state, hotKeysEnabled: !state.hotKeysEnabled }
}

const hackyLoggerMiddleware = (state) => {
  console.groupCollapsed('%cNew State', 'color: green')
  console.log(state)
  console.groupEnd()
  console.groupEnd()
  return state
}

const counterReducer = (state, action) => {
  console.groupCollapsed(`${action.type} @ ${Date.now()}`)
  console.groupCollapsed('%cOld State', 'color: blue')
  console.log(state)
  console.groupEnd()
  console.groupCollapsed(`%cAction (${action.type})`, 'color: red')
  console.log(action)
  console.groupEnd()
  switch (action.type) {
    case INCREMENT:
      return hackyLoggerMiddleware(incrementReducer(state, action.payload))
    case DECREMENT:
      return hackyLoggerMiddleware(decrementReducer(state, action.payload))
    case ADD:
      return hackyLoggerMiddleware(addReducer(state, action.payload))
    case REMOVE:
      return hackyLoggerMiddleware(removeReducer(state, action.payload))
    case SET_FOCUS:
      return hackyLoggerMiddleware(setFocusReducer(state, action.payload))
    case SET_NAME:
      return hackyLoggerMiddleware(setNameReducer(state, action.payload))
    case SET_HOT_KEYS:
      return hackyLoggerMiddleware(setHotKeysReducer(state, action.payload))
    default:
      return hackyLoggerMiddleware(state)
  }
}

const CounterHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Count</h1>
      <p>The <i>Count</i> utility will help you keep track of the count of one thing or many things. Use hot keys like: <code>a</code> to add a new counter, <code>n</code> to switch focus, and arrow keys to increment by 1 or 10. </p>
    </section>
  )
}

const RemoveCounter = ({ id, dispatch }) => {
  return (
    <Button
      handleClick={() => dispatch(removeCounterAction(id))}
      value='x' label='X'
      color={COLORS.red}
      hoverColor={COLORS.redHover}
    />
  )
}

const CounterBody = ({ id, name, count, dispatch, hasFocus, isLast, hotKeysEnabled }) => {
  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  const [nameInput, setNameInput] = useState(false)
  const [localName, setLocalName] = useState(name)
  useKeyPress('Enter', () => save())

  const handleTitleClick = (e) => {
    activateInput()
  }

  const activateInput = () => {
    if (!nameInput) {
      setNameInput(true)
      dispatch(setHotKeysAction())
    }
  }

  const saveHandler = (e) => {
    save()
  }

  const save = () => {
    if (nameInput) {
      setNameInput(false)
      dispatch(setNameAction(localName, id))
      dispatch(setHotKeysAction())
    }
  }

  return (
    <div
      onClick={() => dispatch(setFocusAction(id))}
      className='flex flex-col bg-theme-comp-primary-fill rounded-default p-6 md:p-2 shadow-inner justify-center text-center mt-4 mb-3'
    >
      <div
        onClick={handleTitleClick}
        className='text-4xl mb-2 text-theme-comp-primary'
      >
        <span>
          {nameInput
            ? <input
                autoFocus
                className={`w-48 p-2 m-3 border-2 rounded bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
                type='text'
                value={localName}
                onChange={(e) => { setLocalName(e.target.value) }}
              />
            : localName}
        </span>
        {nameInput ? <button onClick={saveHandler}>✅</button> : null}
        {hasFocus ? ' ⬅️' : null}
      </div>
      <div className='text-4xl mb-5 text-theme-comp-primary'>{count}</div>
      <div>
        <Button
          handleClick={() => dispatch(incrementCounterAction(id, 1))}
          value='inc' label='Increment'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <Button
          handleClick={() => dispatch(decrementCounterAction(id, 1))}
          value='dec' label='Decrement'
          color={COLORS.yellow}
          hoverColor={COLORS.yellowHover}
        />
        {
          isLast
            ? null
            : <RemoveCounter id={id} dispatch={dispatch} />
        }
      </div>
    </div>
  )
}

const findNextCounterId = (counters) => {
  const currentFocusCounterIndex = counters.findIndex(c => c.hasFocus)
  if (counters.length - 1 <= currentFocusCounterIndex) {
    return counters[0].id
  }
  return counters[currentFocusCounterIndex + 1].id
}

function Count () {
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE)

  const currCounter = state.counters.find(c => c.hasFocus)
  const currCounterId = currCounter ? currCounter.id : -1
  const nextCounterId = findNextCounterId(state.counters)
  const hotKeysEnabled = state.hotKeysEnabled

  useKeyPress('n', hotKeysEnabled ? () => dispatch(setFocusAction(nextCounterId)) : NOOP)
  useKeyPress('a', hotKeysEnabled ? () => dispatch(addCounterAction()) : NOOP)
  useKeyPress('r', hotKeysEnabled ? () => dispatch(removeCounterAction(currCounterId)) : NOOP)
  useKeyPress('ArrowRight', hotKeysEnabled ? () => dispatch(incrementCounterAction(currCounterId, 1)) : NOOP)
  useKeyPress('ArrowLeft', hotKeysEnabled ? () => dispatch(decrementCounterAction(currCounterId, 1)) : NOOP)
  useKeyPress('ArrowUp', hotKeysEnabled ? () => dispatch(incrementCounterAction(currCounterId, 10)) : NOOP)
  useKeyPress('ArrowDown', hotKeysEnabled ? () => dispatch(decrementCounterAction(currCounterId, 10)) : NOOP)

  return (
    <div className='mt-6 mx-3 text-skin-primary'>
      <CounterHeader />
      <hr />
      <div className='mt-3'>
        <Button
          handleClick={() => dispatch(addCounterAction())}
          value='add' label='Add New'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {state.counters.map(counter => {
            return (
              <CounterBody
                key={counter.id}
                id={counter.id}
                name={counter.name}
                count={counter.count}
                dispatch={dispatch}
                hasFocus={counter.hasFocus}
                isLast={state.counters.length < 2}
              />
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Count
