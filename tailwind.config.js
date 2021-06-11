const backgroundColors = {
  'primary-fill': 'var(--primary-fill)',
  'secondary-fill': 'var(--secondary-fill)',
  'emphasis-fill': 'var(--emphasis-fill)',

  'input-primary-fill': 'var(--input-primary-fill)',
  'input-secondary-fill': 'var(--input-secondary-fill)',
  'input-emphasis-fill': 'var(--input-emphasis-fill)',

  'btn-primary-fill': 'var(--btn-primary-fill)',
  'btn-primary-fill-hover': 'var(--btn-primary-fill)',
  'btn-primary-fill-disabled': 'var(--btn-primary-fill)',
  'btn-secondary-fill': 'var(--btn-secondary-fill)',
  'btn-secondary-fill-hover': 'var(--btn-secondary-fill)',
  'btn-secondary-fill-disabled': 'var(--btn-secondary-fill)',
  'btn-emphasis-fill': 'var(--btn-emphasis-fill)',
  'btn-emphasis-fill-hover': 'var(--btn-emphasis-fill)',
  'btn-emphasis-fill-disabled': 'var(--btn-emphasis-fill)',

  'comp-primary-fill': 'var(--comp-primary-fill)',
  'comp-secondary-fill': 'var(--comp-secondary-fill)',
  'comp-emphasis-fill': 'var(--comp-emphasis-fill)'
}

const borderColors = {
  'primary-complement': 'var(--primary-complement)',
  'secondary-complement': 'var(--secondary-complement)',
  'emphasis-complement': 'var(--emphasis-complement)',

  'input-primary-complement': 'var(--input-primary-complement)',
  'input-secondary-complement': 'var(--input-secondary-complement)',
  'input-emphasis-complement': 'var(--input-secondary-complement)',

  'btn-primary-complement': 'var(--btn-primary-complement)',
  'btn-primary-complement-hover': 'var(--btn-primary-complement)',
  'btn-primary-complement-disabled': 'var(--btn-primary-complement)',
  'btn-secondary-complement': 'var(--btn-secondary-complement)',
  'btn-secondary-complement-hover': 'var(--btn-secondary-complement)',
  'btn-secondary-complement-disabled': 'var(--btn-secondary-complement)',
  'btn-emphasis-complement': 'var(--btn-emphasis-complement)',
  'btn-emphasis-complement-hover': 'var(--btn-emphasis-complement)',
  'btn-emphasis-complement-disabled': 'var(--btn-emphasis-complement)',

  'comp-primary-complement': 'var(--color-component-complement)',
  'comp-secondary-complement': 'var(--color-component-complement)',
  'comp-emphasis-complement': 'var(--color-component-complement)'
}

const textColors = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  muted: 'var(--text-muted)',
  emphasis: 'var(--text-emphasis)',

  'input-primary': 'var(--input-text-primary)',
  'input-secondary': 'var(--input-text-secondary)',
  'input-emphasis': 'var(--input-text-emphasis)',

  'btn-primary': 'var(--btn-text-primary)',
  'btn-primary-hover': 'var(--btn-text-primary)',
  'btn-primary-disabled': 'var(--btn-text-primary)',
  'btn-secondary': 'var(--btn-text-secondary)',
  'btn-secondary-hover': 'var(--btn-text-secondary)',
  'btn-secondary-disabled': 'var(--btn-text-secondary)',
  'btn-emphasis': 'var(--btn-text-emphasis)',
  'btn-emphasis-hover': 'var(--btn-text-emphasis)',
  'btn-emphasis-disabled': 'var(--btn-text-emphasis)',

  'comp-primary': 'var(--comp-text-primary)',
  'comp-secondary': 'var(--comp-text-secondary)',
  'comp-muted': 'var(--comp-text-muted)',
  'comp-emphasis': 'var(--comp-text-emphasis)'
}

module.exports = {
  purge: [
    'utilities_for_me/web_app/static/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {
      backgroundColor: { theme: backgroundColors }, // bg-theme-[key],
      borderColor: { theme: borderColors },
      ringColor: { theme: borderColors },
      textColor: { theme: textColors },
      placeholderColor: { theme: textColors }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      borderColor: ['hover', 'focus']
    }
  },
  plugins: []
}
