import React from 'react'

import { Link } from 'react-router-dom'

function Home () {
  return (
    <main className='mt-4 p-3'>
      <section className='row'>
        <div className='col'>
          <h1>Welcome To UtilitiesFor.Me</h1>
          <h2>What is <i>Utilities For Me</i>?</h2>
          <p>Great question, <i>UtilitiesFor.Me</i> is what it sounds like... It's simple and fun utilities I find myself needing reasonably regularly and needing to go to sites that I neither know nor trust to get it done! I have written my own version and also made the source available so you can deploy it yourself if you are worried!</p>
        </div>
      </section>
      <hr />
      <section className='row mt-3'>
        <div className='col'>
          <h2>Utilities:</h2>
          <ul>
            <li> <span> <Link to='/echo' className='text-info'>Echo</Link> &mdash; A collection of utilities associated with general text transformations 🗣</span></li>
            <li> <span> <Link to='/prettify' className='text-info'>Prettify</Link> &mdash; A collection of utilities associated with making structured data easier on the eyes ✨</span></li>
            <li> <span> <Link to='/case-transform' className='text-info'>Case Transform</Link> &mdash; A collection of utilities associated with switching one code casing with another 💻</span></li>
            <li> <span> <Link to='/calculate-percent' className='text-info'>Calculate Percent</Link> &mdash; A collection of utilities associated with computing percents %</span></li>
            <li> <span> <Link to='/generate-random-string' className='text-info'>Generate Random String</Link> &mdash; A utility that will get you reasonably random strings if you ask it nicely. 🔮</span></li>
          </ul>
        </div>
      </section>

    </main>
  )
}
export default Home
