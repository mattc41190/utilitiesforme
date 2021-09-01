import React, { useReducer, useEffect } from 'react'
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

const ADD = 'counter/add'
const REMOVE = 'counter/remove'
const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'
const SET_FOCUS = 'counter/setFocus'

const INITIAL_STATE = {
  counters: [
    {
      id: 1,
      count: 0,
      name: 'Counter: 1',
      hasFocus: true
    }
  ]
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
    return state
  }

  const newCounters = state.counters.filter(counter => counter.id !== payload.counterId)
  const counterWithFocus = state.counters.find(counter => counter.hasFocus)
  if (!counterWithFocus) {
    newCounters[0].hasFocus = true
  }
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const setFocus = (state, payload) => {
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

const counterReducer = (state, action) => {
  console.log(`state: ${JSON.stringify(state)}`)
  console.log(`action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case INCREMENT:
      return incrementReducer(state, action.payload)
    case DECREMENT:
      return decrementReducer(state, action.payload)
    case ADD:
      return addReducer(state, action.payload)
    case REMOVE:
      return removeReducer(state, action.payload)
    case SET_FOCUS:
      return setFocus(state, action.payload)
    default:
      return state
  }
}

const CounterHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Count</h1>
      <p>The <i>Count</i> utility will help you keep track of the count of one thing or many things.</p>
    </section>
  )
}

const RemoveCounter = ({ id, dispatch }) => {
  return (
    <Button
      handleClick={() => dispatch({ type: REMOVE, payload: { counterId: id } })}
      value='x' label='X'
      color={COLORS.red}
      hoverColor={COLORS.redHover}
    />
  )
}

const CounterBody = ({ id, name, count, dispatch, hasFocus, isLast }) => {
  return (
    <div
      className='flex flex-col bg-theme-comp-primary-fill rounded-xl p-6 md:p-2 shadow-inner justify-center text-center mt-4 mb-3'
    >
      <div className='text-4xl mb-2'>{name}{hasFocus ? ' ⬅️' : null}</div>
      <div className='text-4xl mb-5'>{count}</div>
      <div>
        <Button
          handleClick={() => dispatch({ type: INCREMENT, payload: { counterId: id, amount: 1 } })}
          value='inc' label='Increment'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <Button
          handleClick={() => dispatch({ type: DECREMENT, payload: { counterId: id, amount: 1 } })}
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
  console.log(`currentFocusCounterIndex: ${currentFocusCounterIndex}`)
  console.log(`counters.length - 1: ${counters.length - 1}`)

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
  useKeyPress('Tab', () => dispatch({ type: SET_FOCUS, payload: { counterId: nextCounterId } }))
  useKeyPress(' ', () => dispatch({ type: ADD, payload: {} }))
  useKeyPress('Backspace', () => dispatch({ type: REMOVE, payload: { counterId: currCounterId } }))
  useKeyPress('ArrowRight', () => dispatch({ type: INCREMENT, payload: { counterId: currCounterId, amount: 1 } }))
  useKeyPress('ArrowLeft', () => dispatch({ type: DECREMENT, payload: { counterId: currCounterId, amount: 1 } }))
  useKeyPress('ArrowUp', () => dispatch({ type: INCREMENT, payload: { counterId: currCounterId, amount: 10 } }))
  useKeyPress('ArrowDown', () => dispatch({ type: DECREMENT, payload: { counterId: currCounterId, amount: 10 } }))

  return (
    <div className='mt-6 text-skin-primary'>
      <CounterHeader />
      <hr />
      <div className='mt-3'>
        <Button
          handleClick={() => dispatch({ type: ADD, payload: {} })}
          value='add' label='Add New'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <div className='grid md:grid-cols-3 gap-3'>
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
