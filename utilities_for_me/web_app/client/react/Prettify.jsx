import React, { useState } from 'react'
import Button from './common/Button'
import Textarea from './common/Textarea'
import COLORS from './lib/colors'

import { prettifyContent } from './lib/prettify'

const _prettify = (contents, type) => {
  return prettifyContent(contents, type)
}

const PrettifyHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Prettify</h1>
      <p>The <i>Prettify</i> utility contains utilities related to making structured data look prettier to humans.</p>
    </section>
  )
}

const PrettifyBody = ({ contents, handleChange, handleClick, ignoreClick }) => {
  return (
    <section>
      <div className='p-2'>
        <h3 className='text-lg font-semibold'>Content To Prettify</h3>
        <Textarea value={contents} placeholder='Contents here...' handleChange={handleChange} />
      </div>
      <div className='p-2'>
        <Button
          handleClick={handleClick}
          value='json' label='JSON'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
        <Button
          handleClick={handleClick}
          value='html'
          label='HTML'
          color={COLORS.blue}
          hoverColor={COLORS.lueHover}
        />
        <Button
          handleClick={handleClick}
          value='js'
          label='JS'
          color={COLORS.yellow}
          hoverColor={COLORS.yellowHover}
        />
        <Button
          handleClick={handleClick}
          value='css'
          label='CSS'
          color={COLORS.pink}
          hoverColor={COLORS.pinkHover}
        />
      </div>
    </section>
  )
}

const PrettifyResult = ({ result, setResult }) => {
  return (
    <section>
      <div className='flex flex-col p-2'>
        <h3 className='text-lg font-semibold'>Result</h3>
        <Textarea placeholder='Results will go here...' value={result} handleChange={(e) => setResult(e.target.value)} />
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
    <div className='mt-6 text-skin-primary'>
      <PrettifyHeader />
      <hr />
      <PrettifyBody contents={contents} handleChange={handleChange} handleClick={handleClick} ignoreClick={ignoreClick} />
      <PrettifyResult result={result} setResult={setResult} />
    </div>
  )
}

export default Prettify
