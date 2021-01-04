import React, { useCallback, useState } from 'react'

const valuesToEndpoint = {
  echo: 'echo',
  upper: 'upper',
  lower: 'lower',
  'base-64-encode': 'encode_b64',
  'base-64-decode': 'decode_b64'
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

const EchoResult = ({ result }) => {
  if (result) {
    return (
      <div className='d-flex flex-column p-2 text-center'>
        <h2>Result</h2>
        <code>{result}</code>

      </div>
    )
  }

  return <div />
}

function Echo () {
  const [contents, setContents] = useState('')
  const [result, setResult] = useState('')

  const handleClick = useCallback((e) => {
    e.preventDefault()
    sendRequest(e.target.value.toLowerCase(), contents)
      .then(json => setResult(json.data))
      .catch(err => console.error(err))
  }, [contents])

  return (
    <div>
      <section className='row mt-4'>
        <div className='col'>
          <div className='d-flex flex-column p-2 text-center'>
            <h1>Utilities For Me</h1>
            <h2>Echo</h2>
            <p>The <i>Echo</i> utility contains utilities related to the transformation of a particular selection of text.</p>
          </div>
        </div>
      </section>
      <hr />
      <section className='row mt-4'>
        <div className='col'>
          <div className='d-flex flex-column p-2 text-center'>
            <h3 className='text-start'>Text To Echo</h3>
            <input
              required
              className='form-control my-3'
              placeholder='Contents here...'
              value={contents}
              onChange={e => setContents(e.target.value)}
            />
            <button className='btn btn-primary mb-3' onClick={handleClick} type='submit' value='echo'>Echo</button>
            <button className='btn btn-primary mb-3' onClick={handleClick} type='submit' value='upper'>Upper</button>
            <button className='btn btn-primary mb-3' onClick={handleClick} type='submit' value='lower'>Lower</button>
            <button className='btn btn-primary mb-3' onClick={handleClick} type='submit' value='base-64-encode'>Base 64 Encode</button>
            <button className='btn btn-primary mb-3' onClick={handleClick} type='submit' value='base-64-decode'>Base 64 Decode</button>
          </div>
        </div>
      </section>
      <section>
        <EchoResult result={result} />
      </section>
    </div>

  )
}

export default Echo
