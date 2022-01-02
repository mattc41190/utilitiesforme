import React from 'react'

import { Link } from 'react-router-dom'

const WelcomePane = () => {
  return (
    <section className='md:flex bg-theme-comp-primary-fill rounded-xl p-8 lg:p-0 mb-3 lg:mb-0 lg:mr-3 shadow-inner'>
      <div className='pt-6 md:p-8 space-y-1'>
        <div className='text-2xl text-theme-comp-primary font-semibold mb-4'>What is Utilities For Me?</div>
        <div className='text-center text-theme-comp-primary md:text-left leading-relaxed'> Utilities for me (<i className='text-theme-comp-emphasis'>utilitiesfor.me</i>) is a collection of simple and fun utilities I find myself needing reasonably regularly and needing to go to sites that I neither know nor trust to get it done! I have written my own version and also made the source available so you can deploy it yourself if you are worried!</div>
      </div>
    </section>
  )
}

const TestimonialPane = ({ theme }) => {
  const pic = theme === 'theme-pink' ? 'unicorn.png' : 'face-circle-sm.png'

  return (
    <section className='md:flex bg-theme-comp-primary-fill rounded-xl p-8 md:p-2 shadow-inner'>
      <img className='w-32 h-32 self-center mx-auto' src={`${window.staticRoot}/static/images/${pic}`} alt='' width='384' height='512' />
      <div className='pt-6 md:p-8 text-theme-comp-primary text-center md:text-left space-y-1'>
        <blockquote>
          <p className='font-light'>
            “Since I started using Utilities For Me my life has improved beyond my wildest dreams! I own a unicorn as a house trained pet. I got a million dollars, and <span className='font-semibold'>BOTH</span> of my parents said they were proud of me!”
          </p>
        </blockquote>
        <figcaption className='font-medium'>
          <div className='text-theme-comp-emphasis'>
            <a href='http://matthewcale.com/'>Matthew Cale</a>
          </div>
          <div className='text-theme-comp-secondary'>
            A Regular Dude -- Austin, TX
          </div>
        </figcaption>
      </div>
    </section>
  )
}

const UtilityPane = ({ link, title, description, theme }) => {
  title = theme === 'theme-pink' ? `🌈 ${title}` : title

  return (
    <section className='md:flex bg-theme-comp-primary-fill rounded-xl p-6 md:p-2 shadow-inner'>
      <div className='pt-2 md:p-4 text-center md:text-left'>
        <div className='text-theme-comp-primary text-2xl font-semibold mb-2'>  <span className='hover:text-theme-comp-emphasis'><Link to={link}>{title}</Link></span></div>
        <div className='text-theme-comp-secondary text-center md:text-left leading-relaxed text-lg'>{description}</div>
      </div>
    </section>
  )
}

const UtilityPanes = ({ theme }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-1 p-3'>
      <UtilityPane
        theme={theme}
        link='/echo'
        title='Echo'
        description='A collection of utilities associated with general text transformations 🗣'
      />
      <UtilityPane
        theme={theme}
        link='/prettify'
        title='Prettify'
        description='A collection of utilities associated with making structured data easier on the eyes ✨'
      />
      <UtilityPane
        theme={theme}
        link='/case-transform'
        title='Case Transform'
        description='A collection of utilities associated with switching one code casing with another 💻'
      />
      <UtilityPane
        theme={theme}
        link='/calculate-percent'
        title='Calculate Percent'
        description='A collection of utilities associated with computing percents 💯'
      />
      <UtilityPane
        theme={theme}
        link='/generate-random-string'
        title='Generate Random String'
        description='A utility that will get you reasonably random strings if you ask it nicely 🔮'
      />
      <UtilityPane
        theme={theme}
        link='/encrypt-decrypt'
        title='Encrypt / Decrypt'
        description='A utility that allows to you encrypt and decrypt sensitive information 🔐'
      />
      <UtilityPane
        theme={theme}
        link='/timer'
        title='Timer'
        description="A utility that allows to you create timers, because who doesn't wanna know how long things take? ⏲"
      />
      <UtilityPane
        theme={theme}
        link='/countdown-clock'
        title='Countdown Clock'
        description='Wanna how many days till Christmas? Look no further than this handy customizable countdown timer! 🗓'
      />
      <UtilityPane
        theme={theme}
        link='/count'
        title='Count'
        description="Need to keep track of something? Your score? Reps? Number of cups of coffee you've had? 🔢"
      />
      <UtilityPane
        theme={theme}
        link='/breakout'
        title='Breakout'
        description='Wanna target a ball to see if you can hit rectangles that look a lot like bricks? 🧱'
      />
    </div>
  )
}

function Home ({ currentTheme }) {
  return (
    <main className='h-full'>
      <div className='flex flex-col lg:flex-row justify-between mt-4 p-3'>
        <WelcomePane />
        <TestimonialPane theme={currentTheme} />
      </div>
      <div id='divider' className='w-full h-px bg-skin-fill' />
      <UtilityPanes theme={currentTheme} />
    </main>

  )
}
export default Home
