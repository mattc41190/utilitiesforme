import React, { useState } from 'react'

import { prettify } from './lib/prettify'

const _prettify = (contents, type) => {
  return prettify(contents, type)
}

const PrettifyHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Prettify</h1>
          <p>The <i>Prettify</i> utility contains utilities related to making structured data look prettier to humans.</p>
        </div>
      </div>
    </section>
  )
}

const PrettifyBody = ({ contents, handleChange, handleClick, ignoreClick }) => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 text-center'>
          <h3 className='text-start'>Content To Prettify</h3>
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
          <button className='btn btn-primary me-2 mb-3' onClick={handleClick} value='json'>JSON <strong onClick={ignoreClick}>&#123;&#125;</strong></button>
          <button className='btn btn-warning me-2 mb-3' onClick={handleClick} value='html'>HTML <strong onClick={ignoreClick}>&lt;&gt;</strong></button>
          <button className='btn btn-success me-2 mb-3' onClick={handleClick} value='js'>JS <strong onClick={ignoreClick}>()</strong></button>
          <button className='btn btn-danger me-2 mb-3' onClick={handleClick} value='css'>CSS <strong onClick={ignoreClick}>#</strong></button>
        </div>
      </div>
    </section>
  )
}

const PrettifyResult = ({ result, setResult }) => {
  return (
    <section>
      <div className='d-flex flex-column p-2'>
        <h3 className='text-start'>Result</h3>
        <textarea
          rows='16'
          className='form-control my-3'
          placeholder='Results will go here...'
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      </div>
    </section>
  )
}

function Prettify () {
  const [contents, setContents] = useState('')
  const [result, setResult] = useState('')

  const handleChange = (e) => setContents(e.target.value)
  const ignoreClick = (e) => e.stopPropagation()

  const handleClick = (e) => {
    e.preventDefault()
    const type = e.target.value.toLowerCase()
    const _result = _prettify(contents, type)
    setResult(_result)
  }

  return (
    <div>
      <PrettifyHeader />
      <hr />
      <PrettifyBody contents={contents} handleChange={handleChange} handleClick={handleClick} ignoreClick={ignoreClick} />
      <PrettifyResult result={result} setResult={setResult} />
    </div>
  )
}

export default Prettify
