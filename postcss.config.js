const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

const _autoprefixer = process.env.NODE_ENV === 'production' ? autoprefixer : null
const _cssnano = process.env.NODE_ENV === 'production' ? cssnano({ preset: 'default' }) : null
const _purgecss = process.env.NODE_ENV === 'production'
  ? purgecss({
      content: [
        'utilities_for_me/web_app/templates/**/*.html',
        'utilities_for_me/web_app/client/react/**/*.js',
        'utilities_for_me/web_app/client/react/**/*.jsx'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  : null

module.exports = {
  plugins: [
    tailwindcss,
    _autoprefixer,
    _cssnano,
    _purgecss
  ]
}
