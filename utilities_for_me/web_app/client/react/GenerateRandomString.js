import React, { useState } from 'react'

const CAPITAL_LETTERS = 'capital-letters'
const LOWERCASE_LETTERS = 'lowercase-letters'
const NUMBERS = 'numbers'
const SYMBOLS = 'symbols'

const categoriesToServerValues = {}
categoriesToServerValues[CAPITAL_LETTERS] = 'capital_letters'
categoriesToServerValues[LOWERCASE_LETTERS] = 'lowercase_letters'
categoriesToServerValues[NUMBERS] = 'numbers'
categoriesToServerValues[SYMBOLS] = 'symbols'

const generate = (_length, categories) => {
  categories = categories.map(c => categoriesToServerValues[c])
  const args = {
    method: 'post',
    body: JSON.stringify({ length: _length, categories: categories }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/generate-random-string'
  return window.fetch(url, args).then(res => res.json())
}

const GenerateRandomStringHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Generate Random String</h1>
          <p>The <i>Generate Random String</i> utility will generate a random string of a proposed length (up to 128 characters) with options regarding casing, numbers, and symbols.</p>
        </div>
      </div>
    </section>
  )
}

const GenerateRandomStringOptions = ({ length, selectedCategories, setSelectedCategories, handleChange, handleSubmit }) => {
  const handleClick = (e) => {
    const category = e.target.value
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories(selectedCategories => [...selectedCategories, category])
    }
  }

  const getBtnColorClass = (category) => {
    if (selectedCategories.includes(category)) {
      return 'success'
    } else {
      return 'secondary'
    }
  }

  return (
    <div className='col-md-6'>
      <div className='d-flex flex-column p-2'>
        <h3>Options</h3>
        <input
          required
          type='number'
          className='form-control my-3'
          placeholder='Length...'
          value={length}
          onChange={handleChange}
        />
        <small>Max 128 Characters</small>
      </div>
      <div className='p-2'>
        <button className={`btn btn-${getBtnColorClass('capital-letters')} me-2 mb-3`} onClick={(handleClick)} value='capital-letters'>Capitals 🔠</button>
        <button className={`btn btn-${getBtnColorClass('lowercase-letters')} me-2 mb-3`} onClick={(handleClick)} value='lowercase-letters'>Lowercase 🔡</button>
        <button className={`btn btn-${getBtnColorClass('numbers')} me-2 mb-3`} onClick={(handleClick)} value='numbers'>Numbers 🔢 </button>
        <button className={`btn btn-${getBtnColorClass('symbols')} me-2 mb-3`} onClick={(handleClick)} value='symbols'>Symbols❗️</button>
      </div>
      <hr />

      <div className='d-grid p-2'>
        <button className='btn btn-lg btn-block btn-success me-2 mb-3' onClick={handleSubmit} value='generate'>Generate 🏁</button>
      </div>
    </div>
  )
}

const GenerateRandomStringBody = ({ length, selectedCategories, setSelectedCategories, handleChange, handleSubmit, result }) => {
  return (
    <section className='row mt-4'>
      <GenerateRandomStringOptions
        length={length}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <GenerateRandomStringResult result={result} />
    </section>
  )
}

const GenerateRandomStringResult = ({ result }) => {
  // const copy = (e) => {
  //   navigator.clipboard.writeText(result)
  // }

  return (
    <div className='col-md-6'>
      <div className='p-2 text-center'>
        <h3 className='text-start'>Result</h3>
        <div className='card bg-dark my-4 p-4'>
          <h4><code className='text-success'>{result}</code></h4>
        </div>
        {/* <button className='btn btn-success' onClick={copy}>Copy 📋</button> */}
      </div>
    </div>
  )
}

function GenerateRandomString () {
  const [_length, setLength] = useState(10)
  const [selectedCategories, setSelectedCategories] = useState([CAPITAL_LETTERS, LOWERCASE_LETTERS, NUMBERS, SYMBOLS])
  const [result, setResult] = useState('Random String Here')

  const handleChange = (e) => setLength(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    generate(_length, selectedCategories)
      .then((data) => {
        setResult(data.data.result)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <GenerateRandomStringHeader />
      <hr />
      <GenerateRandomStringBody
        length={_length}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        result={result}
        setResult={setResult}
      />
    </div>
  )
}

export default GenerateRandomString
