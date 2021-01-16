import React, { useCallback, useState } from 'react'

const valuesToEndpoint = {
  percentOf: 'calculate-percent-of',
  numIsWhatPercentOf: 'calculate-num-is-what-percent-of'
}

const sendRequest = (command, data) => {
  const percent = data.percent
  const _of = data.of

  const args = {
    method: 'post',
    body: JSON.stringify({ percent: percent, of: _of }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = `/api/v1/calculate-percent/${valuesToEndpoint[command]}`
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

const CalculatePercentBody = ({
  percentOf,
  handlePercentOfChange,
  percentOfResult,
  handlePercentOfSubmit,
  numIsWhatPercentOf
}
) => {
  const percentOf_Percent = percentOf.percent
  const percentOf_Of = percentOf.of

  return (
    <section className='row g-3 mt-4 align-items-center'>
      <div className='col-auto'>
        <span>What is</span>
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
        <span>% of</span>
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
        <strong>{percentOfResult}</strong>
      </div>
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

  const [percentOf, setPercentOf] = useState(
    Object.assign({}, percentOfDefault)
  )
  const [numIsWhatPercentOf, setNumIsWhatPercentOf] = useState(
    Object.assign({}, numIsWhatPercentOfDefault)
  )

  const [percentOfResult, setPercentOfResult] = useState('5')

  const handlePercentOfChange = (e) => {
    const { name, value } = e.target
    setPercentOf(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePercentOfSubmit = (e) => {
    sendRequest('percentOf', percentOf )
      .then(json => {
        setPercentOfResult(json.data.result)
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
      />
    </div>
  )
}

export default CalculatePercent
