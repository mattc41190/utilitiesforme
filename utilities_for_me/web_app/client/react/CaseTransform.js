import React, { useCallback, useState } from 'react'

const valuesToEndpoint = {
  echo: 'echo',
  upper: 'upper',
  lower: 'lower',
  'base-64-encode': 'encode_b64',
  'base-64-decode': 'decode_b64',
  'kebab-case': 'kebab_case',
  'snake-case': 'snake_case'
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

const CaseTransformHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Case Transform</h1>
          <p>The <i>Case Transform</i> utility allows you to transform code in one casing (camel, snake, etc...) to another case.</p>
        </div>
      </div>
    </section>
  )
}

const CaseTransformBody = ({ contents, handleChange, handleClick }) => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 text-center'>
          <h3 className='text-start'>Text To Transform</h3>
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
          <button className='btn btn-secondary me-2 mb-3' onClick={handleClick} value='camel'>Camel Case 🐪</button>
          <button className='btn btn-info me-2 mb-3' onClick={handleClick} value='snake-case'>Snake Case 🐍</button>
        </div>
      </div>
    </section>
  )
}

const CaseTransformResult = ({ result, setResult }) => {
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

function CaseTransform () {
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
      <CaseTransformHeader />
      <hr />
      <CaseTransformBody contents={contents} handleChange={handleChange} handleClick={handleClick} />
      <CaseTransformResult result={result} setResult={setResult} />
    </div>
  )
}

export default CaseTransform
