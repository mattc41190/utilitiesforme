import React, { useCallback, useState } from 'react'

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

const Button = ({handleClick, value, label, color}) => {
  const _className = `bg-${color}-500 hover:bg-${color}-700 my-1 mr-2 text-white font-bold py-2 px-4 rounded`
  return (
    <button className={_className} onClick={handleClick} value={value}>{label}</button>
  )
}

const Textarea = ({handleChange, placeholder, value }) => {
  return (
    <textarea
    required
    rows='8'
    className='w-full my-3 p-3 rounded-md border-2 border-green-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600'
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
  />
  )
}

const EchoHeader = () => {
  return (
    <section className='p-2'>
      <h1 className="text-2xl font-semibold">Echo</h1>
      <p>The <i>Echo</i> utility contains utilities related to the transformation of a particular selection of text.</p>
    </section>
  )
}

const EchoBody = ({ contents, handleChange, handleClick }) => {
  return (
    <section>
        <div className='p-2'>
          <h3 className='text-lg font-semibold'>Text To Echo</h3>
          <Textarea value={contents} placeholder="Contents here..." handleChange={handleChange}/>
        </div>
        <div className='p-2'>
          <Button handleClick={handleClick} value="echo" label="Echo 🗣"  color="green"/>
          <Button handleClick={handleClick} value="upper" label="Upper 🔠" color="gray"/>
          <Button handleClick={handleClick} value="lower" label="Lower 🔡" color="purple"/>
          <Button handleClick={handleClick} value="base-64-encode" label="Base 64 Encode 💽" color="blue"/>
          <Button handleClick={handleClick} value="base-64-decode" label="Base 64 Decode 📀" color="indigo"/>
          <Button handleClick={handleClick} value="kebab-case" label="Kebab Case 🍢" color="pink"/>
          <Button handleClick={handleClick} value="snake-case" label="Snake Case 🐍" color="red"/>
        </div>
    </section>  
  )
}

const EchoResult = ({ result, setResult }) => {
  return (
    <section>
      <div className='flex flex-col p-2'>
        <h3 className='text-lg font-semibold'>Result</h3>
        <Textarea placeholder='Results will go here...' value={result} handleChange={(e) => setResult(e.target.value)}/>
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
    <div className="mt-6">
      <EchoHeader />
      <hr />
      <EchoBody contents={contents} handleChange={handleChange} handleClick={handleClick} />
      <EchoResult result={result} setResult={setResult} />
    </div>
  )
}

export default Echo