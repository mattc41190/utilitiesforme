import React, { useState, useRef, useEffect } from 'react'
import Button from './common/Button'
import Textarea from './common/Textarea'
import COLORS from './lib/colors'

const BreakoutHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Breakout</h1>
      <p>The <i>Breakout</i> utility is not a utility as much as it is not a utility and a game instead. Use this game when you want to have some fun instead of doing work.</p>
    </section>
  )
}

const Canvas = (props) => {
  // Lovingly lifted from: https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

  const canvasRef = useRef(null)

  const draw = (ctx) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [])

  return <canvas ref={canvasRef} {...props} />
}

const BreakoutBody = ({ _ }) => {
  return (
    <section>
      <div className='p-2'>
        <h3 className='text-lg font-semibold'>Breakout Game Here</h3>
        <Canvas />
      </div>
    </section>
  )
}

function Breakout () {
  const [contents, setContents] = useState('')
  const [result, setResult] = useState('')

  return (
    <div className='mt-6 text-skin-primary'>
      <BreakoutHeader />
      <hr />
      <BreakoutBody />
    </div>
  )
}

export default Breakout
