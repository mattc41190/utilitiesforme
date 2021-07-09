import React, { useState } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

const CounterHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Counter</h1>
      <p>The <i>Counter</i> utility will help you keep track of a counter. Maybe soon it will support several?</p>
    </section>
  )
}

const CounterBody = ({ count, increment, decrement }) => {
  return (
    <div className='flex flex-col justify-center text-center mt-8 mb-6'>

      <div className='text-4xl mb-5'>{count}</div>
      <div>
        <Button
          handleClick={() => increment(1)}
          value='inc' label='Increment'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <Button
          handleClick={() => decrement(1)}
          value='dec' label='Decrement'
          color={COLORS.red}
          hoverColor={COLORS.redHover}
        />
      </div>

    </div>
  )
}

function Counter () {
  const [count, setCount] = useState(0)

  const increment = (amount) => setCount(count + amount)
  const decrement = (amount) => setCount(count - amount)

  return (
    <div className='mt-6 text-skin-primary'>
      <CounterHeader />
      <hr />
      <CounterBody
        count={count}
        increment={increment}
        decrement={decrement}
      />
    </div>
  )
}

export default Counter
