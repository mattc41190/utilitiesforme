import React, { useCallback, useState } from 'react'

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
  const url = '/api/v1/code-transform'
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

const CaseButton = ({ value, currentSelection, content, onClickHandler }) => {
  const buttonClass = value === currentSelection ? 'success fw-bold' : 'secondary'
  return (
    <button className={`me-2 my-1 btn btn-${buttonClass}`} type='button' value={value} readOnly onClick={onClickHandler}>{content}</button>
  )
}

const ButtonSection = ({ title, currentSelection, handleChange }) => {
  return (
    <div>
      <h3>{title}</h3>
      <CaseButton value='space-case' currentSelection={currentSelection} content='Space Delimited 💫' onClickHandler={handleChange} />
      <CaseButton value='camel-case' currentSelection={currentSelection} content='Camel Case 🐪' onClickHandler={handleChange} />
      <CaseButton value='snake-case' currentSelection={currentSelection} content='Snake Case 🐍' onClickHandler={handleChange} />
      <CaseButton value='pascal-case' currentSelection={currentSelection} content='Pascal Case 🧪' onClickHandler={handleChange} />
      <CaseButton value='kebab-case' currentSelection={currentSelection} content='Kebab Case 🍢' onClickHandler={handleChange} />
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
    <section className='row my-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 text-center'>
          <h3 className='text-start'>Text To Transform</h3>
          <textarea
            required
            rows='8'
            className='form-control my-3'
            placeholder='Contents here...'
            value={contents}
            onChange={handleContentsChange}
          />
        </div>
        <div className='d-flex justify-content-between align-items-center p-2 my-4'>
          <ButtonSection title='From' currentSelection={currentFromSelection} handleChange={handleFromChange} />
          <ButtonSection title='To' currentSelection={currentToSelection} handleChange={handleToChange} />
        </div>
        <div className="p-2">
          <button className='btn btn-lg btn-success' onClick={handleSubmit}>Submit</button>
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
  const [contents, setContents] = useState('Hello there')
  const [fromCase, setFromCase] = useState('space-case')
  const [toCase, setToCase] = useState('space-case')
  const [result, setResult] = useState('Hello there')
  // const [data, isLoading, error, loadData] = useAsyncData()

  const handleContentsChange = (e) => setContents(e.target.value)

  const handleFromChange = (e) => { setFromCase(e.target.value) }

  const handleToChange = (e) => { setToCase(e.target.value) }

  const handleSubmit = (e) => {
    sendRequest({ fromCase, toCase, contents })
      .then(json => { setResult(json.data) })
      .catch(e => console.error(e))
  }

  return (
    <div>
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
