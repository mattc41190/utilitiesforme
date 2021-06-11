/* eslint-disable camelcase */

import React, { useState } from 'react'
import Button from './common/Button'
import COLORS from './lib/colors'

const PERCENT_OF = 'percentOf'
const NUM_IS_WHAT_PERCENT_OF = 'numIsWhatPercentOf'

const valueToFormula = {
  percentOf: 'percent_of',
  numIsWhatPercentOf: 'num_is_what_percent_of'
}

const sendRequest = (command, data) => {
  let body = {}

  if (command === PERCENT_OF) {
    body = {
      formula: valueToFormula[PERCENT_OF],
      percent: data.percent,
      of: data.of
    }
  } else if (command === NUM_IS_WHAT_PERCENT_OF) {
    body = {
      formula: valueToFormula[NUM_IS_WHAT_PERCENT_OF],
      num: data.num,
      of: data.of
    }
  }

  const args = {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/calculate-percent'
  return window.fetch(url, args).then(res => res.json())
}

const CalculatePercentHeader = () => {
  return (
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Calculate Percent</h1>
      <p>The <i>Calculate Percent</i> utility contains utilities related to calculating percents... duh!</p>
    </section>
  )
}

const PercentOf = ({
  percentOf,
  handlePercentOfChange,
  handlePercentOfSubmit,
  percentOfResult
}) => {
  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  const percentOf_Percent = percentOf.percent
  const percentOf_Of = percentOf.of

  return (
    <section className='my-3 p-2 flex flex-col md:flex-row items-center text-xl'>
      <div className='font-semibold mr-3'>What is X percent of Y?</div>
      <div>What is</div>
      <input
        type='number'
        className={`w-24 p-2 m-3 border-2 rounded bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
        name='percent'
        value={percentOf_Percent}
        onChange={handlePercentOfChange}
      />
      <div>% of</div>
      <div>
        <input
          type='number'
          className={`w-24 p-2 m-3 border-2 rounded bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
          name='of'
          value={percentOf_Of}
          onChange={handlePercentOfChange}
        />
      </div>
      <Button
        color={COLORS.green}
        hoverColor={COLORS.greenHover}
        label='?'
        handleClick={handlePercentOfSubmit}
      />
      <div className='font-semibold'>{percentOfResult}</div>
    </section>
  )
}

const NumIsWhatPercentOf = ({
  numIsWhatPercentOf,
  handleNumIsWhatPercentOfChange,
  numIsWhatPercentOfResult,
  handleNumIsWhatPercentOfSubmit
}) => {
  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  const numIsWhatPercentOf_Num = numIsWhatPercentOf.num
  const numIsWhatPercentOf_Of = numIsWhatPercentOf.of

  return (
    <section className='my-4 p-2 flex flex-col md:flex-row items-center text-xl'>
      <div className='font-semibold mr-3'>X is what percent of Y?</div>
      <input
        type='number'
        className={`w-24 m-3 p-2 border-2 rounded bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
        name='num'
        value={numIsWhatPercentOf_Num}
        onChange={handleNumIsWhatPercentOfChange}
      />
      <div>is what percent of</div>
      <input
        type='number'
        className={`w-24 m-3 p-2 border-2 rounded bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
        name='of'
        value={numIsWhatPercentOf_Of}
        onChange={handleNumIsWhatPercentOfChange}
      />
      <Button
        color={COLORS.green}
        hoverColor={COLORS.greenHover}
        label='?'
        handleClick={handleNumIsWhatPercentOfSubmit}
      />
      <div className='font-semibold'>{numIsWhatPercentOfResult}</div>
    </section>
  )
}

const CalculatePercentBody = ({
  percentOf,
  handlePercentOfChange,
  percentOfResult,
  handlePercentOfSubmit,
  numIsWhatPercentOf,
  handleNumIsWhatPercentOfChange,
  numIsWhatPercentOfResult,
  handleNumIsWhatPercentOfSubmit
}
) => {
  return (
    <section className='flex flex-col'>
      <PercentOf
        percentOf={percentOf}
        handlePercentOfChange={handlePercentOfChange}
        handlePercentOfSubmit={handlePercentOfSubmit}
        percentOfResult={percentOfResult}
      />
      <hr />
      <NumIsWhatPercentOf
        numIsWhatPercentOf={numIsWhatPercentOf}
        handleNumIsWhatPercentOfChange={handleNumIsWhatPercentOfChange}
        numIsWhatPercentOfResult={numIsWhatPercentOfResult}
        handleNumIsWhatPercentOfSubmit={handleNumIsWhatPercentOfSubmit}
      />
    </section>
  )
}

function CalculatePercent () {
  const percentOfDefault = {
    percent: '10',
    of: '50'
  }

  const numIsWhatPercentOfDefault = {
    num: '20',
    of: '80'
  }

  const [percentOf, setPercentOf] = useState(percentOfDefault)
  const [numIsWhatPercentOf, setNumIsWhatPercentOf] = useState(numIsWhatPercentOfDefault)

  const [percentOfResult, setPercentOfResult] = useState('5.00')
  const [numIsWhatPercentOfResult, setNumIsWhatPercentOfResult] = useState('25.00')

  const handlePercentOfChange = (e) => {
    const { name, value } = e.target
    setPercentOf(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleNumIsWhatPercentOfChange = (e) => {
    const { name, value } = e.target
    setNumIsWhatPercentOf(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePercentOfSubmit = (e) => {
    sendRequest(PERCENT_OF, percentOf)
      .then(json => {
        setPercentOfResult(String(parseFloat(json.data.result).toFixed(2)))
      })
      .catch(e => console.error(e))
  }

  const handleNumIsWhatPercentOfSubmit = (e) => {
    sendRequest(NUM_IS_WHAT_PERCENT_OF, numIsWhatPercentOf)
      .then(json => {
        setNumIsWhatPercentOfResult(String(parseFloat(json.data.result).toFixed(2)))
      })
      .catch(e => console.error(e))
  }

  return (
    <div className='mt-6 text-skin-primary'>
      <CalculatePercentHeader />
      <hr />
      <CalculatePercentBody
        percentOf={percentOf}
        handlePercentOfChange={handlePercentOfChange}
        percentOfResult={percentOfResult}
        handlePercentOfSubmit={handlePercentOfSubmit}
        numIsWhatPercentOf={numIsWhatPercentOf}
        handleNumIsWhatPercentOfChange={handleNumIsWhatPercentOfChange}
        numIsWhatPercentOfResult={numIsWhatPercentOfResult}
        handleNumIsWhatPercentOfSubmit={handleNumIsWhatPercentOfSubmit}
      />
    </div>
  )
}

export default CalculatePercent
