import React, { useState, useReducer, useEffect } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      console.log('down');
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      console.log('up');
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

const ADD = "counter/add"
const REMOVE = "counter/remove"
const INCREMENT = "counter/increment"
const DECREMENT = "counter/decrement"


const INITIAL_STATE = {
  counters: [
    {
      id: 1,
      count: 0,
      name: `Counter: 1`
    }
  ]
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
    <span onClick={() => dispatch({ type: REMOVE, payload: { counterId: id } })}>
      💥
    </span>)
}

const CounterBody = ({ id, name, count, dispatch, isLast }) => {
  return (
    <div className='flex flex-col bg-theme-comp-primary-fill rounded-xl p-6 md:p-2 shadow-inner justify-center text-center mt-4 mb-3'>
      <div className='text-4xl mb-2'>{isLast 
      ? null : 
      <RemoveCounter id={id} dispatch={dispatch} />} {name}</div>
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
          color={COLORS.red}
          hoverColor={COLORS.redHover}
        />
      </div>

    </div>
  )
}

const findCounterById = (counters, id) => {
  return counters.findIndex(counter => counter.id === id)
}

const getNextId = (counters) => {
  const currentHighest = counters.reduce((current, counter) => {
    if (counter.id > current) {
      return counter.id
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
    id: currCounter.id,
    name: currCounter.name,
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
    id: currCounter.id,
    name: currCounter.name,
    count: currCounter.count - payload.amount
  }
  const newCounters = state.counters.filter(counter =>  counter.id !== payload.counterId)
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
    count: 0
  }
  const newCounters = [...state.counters, newCounter]
  // Mutate
  sortCounters(newCounters)
  return { ...state, counters: newCounters }
}

const removeReducer = (state, payload) => {
  const newCounters = state.counters.filter(counter => counter.id !== payload.counterId)
  // Mutate
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
    default:
      return state
  }
}

function Count() {
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE)
  
  const nPressed = useKeyPress("n")

  return (
    <div className='mt-6 text-skin-primary'>
      <CounterHeader />
      <hr />
      <Button
        handleClick={() => dispatch({ type: ADD, payload: {} })}
        value='add' label='Add New'
        color={COLORS.green}
        hoverColor={COLORS.greenHover}
      />
      <div className="grid md:grid-cols-3 gap-3">
        {state.counters.map(counter => {
          return (
            <CounterBody
              key={counter.id}
              id={counter.id}
              name={counter.name}
              count={counter.count}
              dispatch={dispatch}
              isLast={state.counters.length < 2}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Count
