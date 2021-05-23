import React from 'react'

const ErrorHeader = () => {
  return (
    <section className='p-2 text-center'>
      <h1 className='text-5xl font-light mb-3'>Generic Error Page</h1>
      <p>It appears something unexpected has happened. Personally, I blame you 🤷‍♀️. Why don't you go home and think about what you've done.</p>
    </section>
  )
}

function Error () {
  return (
    <div className='mt-6'>
      <ErrorHeader />
    </div>
  )
}
export default Error
