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

const EchoHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Echo</h1>
          <p>The <i>Echo</i> utility contains utilities related to the transformation of a particular selection of text.</p>
        </div>
      </div>
    </section>
  )
}

const EchoBody = ({ contents, handleChange, handleClick }) => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 text-center'>
          <h3 className='text-start'>Text To Echo</h3>
          <textarea
            required
            rows='8'
            className='form-control my-3'
            placeholder='Contents here...'
            value={contents}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          <button className='btn btn-secondary me-2 mb-3' onClick={handleClick} value='echo'>Echo 🗣</button>
          <button className='btn btn-danger me-2 mb-3' onClick={handleClick} value='upper'>Upper 🔠</button>
          <button className='btn btn-success me-2 mb-3' onClick={handleClick} value='lower'>Lower 🔡</button>
          <button className='btn btn-info me-2 mb-3' onClick={handleClick} value='base-64-encode'>Base 64 Encode 💽</button>
          <button className='btn btn-warning me-2 mb-3' onClick={handleClick} value='base-64-decode'>Base 64 Decode 📀</button>
          <button className='btn btn-success me-2 mb-3' onClick={handleClick} value='kebab-case'>Kebab Case 🍢</button>
          <button className='btn btn-info me-2 mb-3' onClick={handleClick} value='snake-case'>Snake Case 🐍</button>

        </div>
      </div>
    </section>
  )
}

const EchoResult = ({ result, setResult }) => {
  return (
    <section>
      <div className='d-flex flex-column p-2'>
        <h3 className='text-start'>Result</h3>
        <textarea
          rows='8'
          className='form-control my-3'
          placeholder='Results will go here...'
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
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
    <div>
      <EchoHeader />
      <hr />
      <EchoBody contents={contents} handleChange={handleChange} handleClick={handleClick} />
      <EchoResult result={result} setResult={setResult} />
    </div>
  )
}

export default Echo
