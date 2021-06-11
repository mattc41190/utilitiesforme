import React, { useCallback, useState } from 'react'
import Button from './common/Button'
import Textarea from './common/Textarea'
import COLORS from './lib/colors'

const valuesToEndpoint = {
  echo: 'echo',
  upper: 'upper',
  lower: 'lower',
  'base-64-encode': 'encode-b64',
  'base-64-decode': 'decode-b64',
  'kebab-case': 'kebab-case',
  'snake-case': 'snake-case'
}

const sendRequest = (command, contents) => {
  const args = {
    method: 'post',
    body: JSON.stringify({ contents }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = `/api/v1/echo/${valuesToEndpoint[command]}`
  return window.fetch(url, args).then(res => res.json())
}

const EchoHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Echo</h1>
      <p>The <i>Echo</i> utility contains utilities related to the transformation of a particular selection of text.</p>
    </section>
  )
}

const EchoBody = ({ contents, handleChange, handleClick }) => {
  return (
    <section>
      <div className='p-2'>
        <h3 className='text-lg font-semibold'>Text To Echo</h3>
        <Textarea value={contents} placeholder='Contents here...' handleChange={handleChange} />
      </div>
      <div className='p-2'>
        <Button
          handleClick={handleClick}
          value='echo'
          label='Echo 🗣'
          color={COLORS.gray}
          hoverColor={COLORS.grayHover}
        />
        <Button
          handleClick={handleClick}
          value='upper'
          label='Upper 🔠'
          color={COLORS.indigo}
          hoverColor={COLORS.indigoHover}
        />
        <Button
          handleClick={handleClick}
          value='lower'
          label='Lower 🔡'
          color={COLORS.yellow}
          hoverColor={COLORS.yellowHover}
        />
        <Button
          handleClick={handleClick}
          value='base-64-encode'
          label='Base 64 Encode 💽'
          color={COLORS.red}
          hoverColor={COLORS.redHover}
        />
        <Button
          handleClick={handleClick}
          value='base-64-decode'
          label='Base 64 Decode 📀'
          color={COLORS.blue}
          hoverColor={COLORS.blueHover}
        />
        <Button
          handleClick={handleClick}
          value='kebab-case'
          label='Kebab Case 🍢'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <Button
          handleClick={handleClick}
          value='snake-case'
          label='Snake Case 🐍'
          color={COLORS.pink}
          hoverColor={COLORS.pinkHover}
        />
      </div>
    </section>
  )
}

const EchoResult = ({ result, setResult }) => {
  return (
    <section>
      <div className='flex flex-col p-2'>
        <h3 className='text-lg font-semibold'>Result</h3>
        <Textarea placeholder='Results will go here...' value={result} handleChange={(e) => setResult(e.target.value)} />
      </div>
    </section>
  )
}

function Echo () {
  const [contents, setContents] = useState('')
  const [result, setResult] = useState('')

  const handleChange = (e) => setContents(e.target.value)

  const handleClick = useCallback((e) => {
    e.preventDefault()
    sendRequest(e.target.value.toLowerCase(), contents)
      .then(json => { setResult(json.data) })
      .catch(err => console.error(err))
  }, [contents])

  return (
    <div className='mt-6 text-skin-primary'>
      <EchoHeader />
      <hr />
      <EchoBody contents={contents} handleChange={handleChange} handleClick={handleClick} />
      <EchoResult result={result} setResult={setResult} />
    </div>
  )
}

export default Echo
