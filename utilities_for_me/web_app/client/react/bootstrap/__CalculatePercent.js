/* eslint-disable camelcase */

import React, { useState } from 'react'

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
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Calculate Percent</h1>
          <p>The <i>Calculate Percent</i> utility contains utilities related to calculating percents... duh!</p>
        </div>
      </div>
    </section>
  )
}

const PercentOf = ({
  percentOf,
  handlePercentOfChange,
  handlePercentOfSubmit,
  percentOfResult
}) => {
  const percentOf_Percent = percentOf.percent
  const percentOf_Of = percentOf.of

  return (
    <section className='row g-3 my-4 align-items-center d-flex'>
      <h2><strong>What is X percent of Y?</strong></h2>
      <div className='col-auto'>
        <h4>What is</h4>
      </div>
      <div className='col-auto'>
        <input
          type='number'
          className='form-control'
          name='percent'
          value={percentOf_Percent}
          onChange={handlePercentOfChange}
        />
      </div>
      <div className='col-auto'>
        <h4>% of</h4>
      </div>
      <div className='col-auto'>
        <input
          type='number'
          className='form-control'
          name='of'
          value={percentOf_Of}
          onChange={handlePercentOfChange}
        />
      </div>
      <div className='col-auto'>
        <button className='btn btn-info' onClick={handlePercentOfSubmit}>?</button>
      </div>
      <div className='col-auto'>
        <h4><strong>{percentOfResult}</strong></h4>
      </div>
    </section>
  )
}

const NumIsWhatPercentOf = ({
  numIsWhatPercentOf,
  handleNumIsWhatPercentOfChange,
  numIsWhatPercentOfResult,
  handleNumIsWhatPercentOfSubmit
}) => {
  const numIsWhatPercentOf_Num = numIsWhatPercentOf.num
  const numIsWhatPercentOf_Of = numIsWhatPercentOf.of

  return (
    <section className='row g-3 my-4 align-items-center d-flex'>
      <h2><strong>X is what percent of Y?</strong></h2>
      <div className='col-auto'>
        <input
          type='number'
          className='form-control'
          name='num'
          value={numIsWhatPercentOf_Num}
          onChange={handleNumIsWhatPercentOfChange}
        />
      </div>
      <div className='col-auto'>
        <h4>is what percent of</h4>
      </div>
      <div className='col-auto'>
        <input
          type='number'
          className='form-control'
          name='of'
          value={numIsWhatPercentOf_Of}
          onChange={handleNumIsWhatPercentOfChange}
        />
      </div>
      <div className='col-auto'>
        <button className='btn btn-info' onClick={handleNumIsWhatPercentOfSubmit}>?</button>
      </div>
      <div className='col-auto'>
        <h4><strong>{numIsWhatPercentOfResult}</strong></h4>
      </div>
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
    <section className='row g-3 my-4 align-items-center d-flex'>
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
    <div>
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
