const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    cssnano({ preset: 'default' }),
    purgecss({
      content: [
        'utilities_for_me/web_app/templates/**/*.html',
        'utilities_for_me/web_app/client/react/**/*.js'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}
