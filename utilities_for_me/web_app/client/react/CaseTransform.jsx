import React, { useState } from 'react'
import Button from './common/Button'
import Textarea from './common/Textarea'
import COLORS from './lib/colors'

const sendRequest = ({ fromCase, toCase, contents }) => {
  const frontEndToBackendCasings = {
    'space-case': 'space_case',
    'camel-case': 'camel_case',
    'pascal-case': 'pascal_case',
    'kebab-case': 'kebab_case',
    'snake-case': 'snake_case'
  }

  fromCase = frontEndToBackendCasings[fromCase]
  toCase = frontEndToBackendCasings[toCase]

  const body = {
    contents: contents,
    from_case: fromCase,
    to_case: toCase
  }

  const args = {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/case-transform'
  return window.fetch(url, args).then(res => res.json())
}

const CaseTransformHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Case Transform</h1>
      <p>The <i>Case Transform</i> utility allows you to transform code in one casing (camel, snake, etc...) to another case.</p>
    </section>
  )
}

const CaseButton = ({ value, currentSelection, content, handleClick }) => {
  const color = value === currentSelection ? COLORS.green : COLORS.gray
  const colorHover = value === currentSelection ? COLORS.greenHover : COLORS.grayHover

  return (
    <Button
      handleClick={handleClick}
      value={value}
      label={content}
      color={color}
      hoverColor={colorHover}
    />
  )
}

const ButtonSection = ({ title, currentSelection, handleChange }) => {
  return (
    <div>
      <h3>{title}</h3>
      <CaseButton value='space-case' currentSelection={currentSelection} content='Space Delimited 💫' handleClick={handleChange} />
      <CaseButton value='camel-case' currentSelection={currentSelection} content='Camel Case 🐪' handleClick={handleChange} />
      <CaseButton value='snake-case' currentSelection={currentSelection} content='Snake Case 🐍' handleClick={handleChange} />
      <CaseButton value='pascal-case' currentSelection={currentSelection} content='Pascal Case 🧪' handleClick={handleChange} />
      <CaseButton value='kebab-case' currentSelection={currentSelection} content='Kebab Case 🍢' handleClick={handleChange} />
    </div>
  )
}

const CaseTransformBody = ({
  contents,
  currentFromSelection,
  currentToSelection,
  handleContentsChange,
  handleFromChange,
  handleToChange,
  handleSubmit
}) => {
  return (
    <section>
      <div className='p-2'>
        <h3>Text To Transform</h3>
        <Textarea
          placeholder='Contents here...'
          value={contents}
          handleChange={handleContentsChange}
        />
      </div>
      <div className='p-2'>
        <ButtonSection
          title='From'
          currentSelection={currentFromSelection}
          handleChange={handleFromChange}
        />
        <ButtonSection
          title='To'
          currentSelection={currentToSelection}
          handleChange={handleToChange}
        />
      </div>
      <div className='p-2'>
        <Button
          handleClick={handleSubmit}
          label='Submit'
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
        />
      </div>
    </section>
  )
}

const CaseTransformResult = ({ result, setResult }) => {
  return (

    <section>
      <div className='p-2'>
        <h3>Result</h3>
        <Textarea
          placeholder='Results will go here...'
          value={result}
          handleChange={(e) => setResult(e.target.value)}
        />
      </div>
    </section>
  )
}

function CaseTransform () {
  const [contents, setContents] = useState('Hello there')
  const [fromCase, setFromCase] = useState('space-case')
  const [toCase, setToCase] = useState('space-case')
  const [result, setResult] = useState('Hello there')

  const handleContentsChange = (e) => setContents(e.target.value)

  const handleFromChange = (e) => { setFromCase(e.target.value) }

  const handleToChange = (e) => { setToCase(e.target.value) }

  const handleSubmit = (e) => {
    sendRequest({ fromCase, toCase, contents })
      .then(json => { setResult(json.data) })
      .catch(e => console.error(e))
  }

  return (
    <div className='mt-6 text-skin-primary'>
      <CaseTransformHeader />
      <hr />
      <CaseTransformBody
        contents={contents}
        currentFromSelection={fromCase}
        currentToSelection={toCase}
        handleContentsChange={handleContentsChange}
        handleFromChange={handleFromChange}
        handleToChange={handleToChange}
        handleSubmit={handleSubmit}
      />
      <CaseTransformResult result={result} setResult={setResult} />
    </div>
  )
}

export default CaseTransform
