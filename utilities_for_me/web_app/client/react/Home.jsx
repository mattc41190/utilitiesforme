import React from 'react'

import { Link } from 'react-router-dom'

const WelcomePane = () => {
  return (
    <section className='md:flex bg-skin-component-fill rounded-xl p-8 lg:p-0 mb-3 lg:mb-0 lg:mr-3 shadow-inner'>
      <div className='pt-6 md:p-8 space-y-1'>
        <div className='text-2xl text-skin-component-primary font-semibold mb-4'>What is Utilities For Me?</div>
        <div className='text-center text-skin-component-primary md:text-left leading-relaxed'> Utilities for me (<i className='text-skin-emphasis'>utilitiesfor.me</i>) is a collection of simple and fun utilities I find myself needing reasonably regularly and needing to go to sites that I neither know nor trust to get it done! I have written my own version and also made the source available so you can deploy it yourself if you are worried!</div>
      </div>
    </section>
  )
}

const TestimonialPane = () => {
  return (
    <section className='md:flex bg-skin-component-fill rounded-xl p-8 md:p-2 shadow-inner'>
      <img className='w-32 h-32 self-center mx-auto' src={`${window.staticRoot}/static/images/face-circle-sm.png`} alt='' width='384' height='512' />
      <div className='pt-6 md:p-8 text-skin-component-primary text-center md:text-left space-y-1'>
        <blockquote>
          <p className='font-light'>
            “Since I started using Utilities For Me my life has improved beyond my wildest dreams! I own a unicorn as a house trained pet. I got a million dollars, and <span className='font-semibold'>BOTH</span> of my parents said they were proud of me!”
          </p>
        </blockquote>
        <figcaption className='font-medium'>
          <div className='text-skin-emphasis'>
            Matthew Cale
          </div>
          <div className='text-skin-secondary'>
            A Regular Dude -- Austin, TX
          </div>
        </figcaption>
      </div>
    </section>
  )
}

const UtilityPane = ({ link, title, description }) => {
  return (
        <section className='md:flex bg-skin-component-fill rounded-xl p-6 md:p-2 shadow-inner'>
        <div className='pt-2 md:p-4 text-center md:text-left'>
          <div className='text-skin-component-primary hover:text-skin-component-emphasis text-2xl font-semibold mb-2'><Link to={link}>{title}</Link> </div>
          <div className='text-skin-component-secondary text-center md:text-left leading-relaxed text-lg'>{description}</div>
        </div>
      </section>
  )
}

const UtilityPanes = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-1 p-3'>
      <UtilityPane
        link='/echo'
        title='Echo'
        description='A collection of utilities associated with general text transformations 🗣'
      />
      <UtilityPane
        link='/prettify'
        title='Prettify'
        description='A collection of utilities associated with making structured data easier on the eyes ✨'
      />
      <UtilityPane
        link='/case-transform'
        title='Case Transform'
        description='A collection of utilities associated with switching one code casing with another 💻'
      />
      <UtilityPane
        link='/calculate-percent'
        title='Calculate Percent'
        description='A collection of utilities associated with computing percents 💯'
      />
      <UtilityPane
        link='/generate-random-string'
        title='Generate Random String'
        description='A utility that will get you reasonably random strings if you ask it nicely 🔮'
      />
      <UtilityPane
        link='/encrypt-decrypt'
        title='Encrypt / Decrypt'
        description='A utility that allows to you encrypt and decrypt sensitive information 🔐'
      />
      <UtilityPane
        link='/timer'
        title='Timer'
        description="A utility that allows to you create timers, because who doesn't wanna know how long things take? ⏲"
      />
      <UtilityPane
        link='/countdown-clock'
        title='Countdown Clock'
        description=' Wanna how many days till Christmas? Look no further than this handy customizable countdown timer! 🗓'
      />
    </div>
  )
}

function Home () {
  return (
    <main className="h-full">
      <div className='flex flex-col lg:flex-row justify-between mt-4 p-3'>
        <WelcomePane />
        <TestimonialPane />
      </div>
      <div id="divider" className="w-full h-px bg-skin-fill" />
      <UtilityPanes />
    </main>

  )
}
export default Home
