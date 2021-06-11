import React, { useState } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

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
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Generate Random String</h1>
      <p>The <i>Generate Random String</i> utility will generate a random string of a proposed length (up to 128 characters) with options regarding casing, numbers, and symbols.</p>
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
      return { color: COLORS.green, colorHover: COLORS.greenHover }
    } else {
      return { color: COLORS.gray, colorHover: COLORS.grayHover }
    }
  }

  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  return (
    <div className='p-2'>
      <div className='text-xl font-semibold'>Options</div>
      <input
        required
        type='number'
        className={`p-2 mt-3 mb-1 w-full md:w-6/12 border-2 bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
        placeholder='Length...'
        value={length}
        onChange={handleChange}
      />
      <div>
        <small>Max 128 Characters</small>
      </div>
      <div className='my-2'>
        <Button
          handleClick={handleClick}
          value='capital-letters'
          label='Capitals 🔠'
          color={getBtnColorClass('capital-letters').color}
          hoverColor={getBtnColorClass('capital-letters').colorHover}
        />
        <Button
          handleClick={handleClick}
          value='lowercase-letters'
          label='Lowercase 🔡'
          color={getBtnColorClass('lowercase-letters').color}
          hoverColor={getBtnColorClass('lowercase-letters').colorHover}
        />
        <Button
          handleClick={handleClick}
          value='numbers'
          label='Numbers 🔢'
          color={getBtnColorClass('numbers').color}
          hoverColor={getBtnColorClass('numbers').colorHover}

        />
        <Button
          handleClick={handleClick}
          value='symbols'
          label='Symbols❗️'
          color={getBtnColorClass('symbols').color}
          hoverColor={getBtnColorClass('symbols').colorHover}
        />
      </div>
      <hr />
      <button className='w-full md:w-6/12  bg-green-500 hover:bg-green-700 mt-5 mb-3 text-white font-bold text-lg py-4 px-6 rounded' onClick={handleSubmit} value='generate'>Generate 🏁</button>
    </div>
  )
}

const GenerateRandomStringBody = ({ length, selectedCategories, setSelectedCategories, handleChange, handleSubmit, result }) => {
  return (
    <section className='my-4'>
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
  const copy = (e) => {
    window.navigator.clipboard.writeText(result)
  }

  return (
    <div onClick={copy} className='p-2'>
      <div className='text-lg font-semibold'>Result</div>
      <div className='break-words w-full md:w-6/12 p-8 rounded-sm text-center text-lg bg-gray-800 text-green-600'>
        <code>{result}</code>
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
    <div className='mt-6 text-skin-primary'>
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
