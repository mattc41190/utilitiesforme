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
      textColor: {
        skin: {
          "primary": "var(--color-text-base-primary)",
          "secondary": "var(--color-text-base-secondary)",
          "muted": "var(--color-text-base-muted)",
          "emphasis": "var(--color-text-base-emphasis)",
          "component-primary": "var(--color-text-component-primary)",
          "component-secondary": "var(--color-text-component-secondary)",
          "component-muted": "var(--color-text-component-muted)",
          "component-emphasis": "var(--color-text-component-emphasis)",
        }
      },
      backgroundColor: {
        skin: {
          "base-fill": "var(--color-base-fill)",
          "secondary-fill": "var(--color-secondary-fill)",
          "component-fill": "var(--color-component-fill)"
        }
      },
      borderColor: {
        skin: {
          "base-fill": "var(--color-base-fill)",
          "secondary-fill": "var(--color-secondary-fill)",
          "component-fill": "var(--color-component-fill)",
          "emphasis-fill": "var(--color-emphasis-fill)",
        }
      }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
    }
  },
  plugins: []
}


    // /* Base Colors */
    // --color-base-fill: var(--white);
    // --color-secondary-fill: var(--very-light-gray);
    // --color-text-base-primary: var(--very-dark-gray);
    // --color-text-base-secondary: var(--black);
    // --color-text-base-muted: var(--black);
    // --color-text-base-emphasis: var(--black);

    // /* Buttons Colors */
    // --color-button-base-fill: var(--black);
    // --color-button-base-outline: var(--black);
    // --color-button-text-base: var(--black);
    // --color-button-base-fill-active: var(--black);
    // --color-button-base-outline-active: var(--black);
    // --color-button-text-base-active: var(--black);

    // /* Card/Pill Colors */
    // --color-component-fill: var(--very-dark-gray);
    // --color-text-component-primary: var(--very-dark-gray);
    // --color-text-component-secondary: var(--black);
    // --color-text-component-muted: var(--black);
    // --color-text-component-emphasis: var(--black);