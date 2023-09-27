/** @type {import('tailwindcss').Config} */
const { colorsConfig } = require('./src/themes/colors.ts')
const { nextui } = require('@nextui-org/react')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    screens: {
      '13inch': '1400px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: colorsConfig,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: ['class'],
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        'primary-theme': {
          layout: {}, // light theme layout tokens
          colors: {
            primary: {
              DEFAULT: colorsConfig['primary-blue'],
              foreground: 'colorsConfig.white',
            },
            secondary: {
              DEFAULT: colorsConfig['primary-blue-3'],
              foreground: colorsConfig.white,
            },
            danger: {
              DEFAULT: colorsConfig['danger'],
              foreground: colorsConfig.white,
            },
            success: {
              DEFAULT: colorsConfig['success'],
              foreground: colorsConfig.white,
            },
            focus: colorsConfig['primary-blue'],
          },
          layout: {
            // disabledOpacity: '0.3',
            // radius: {
            //   small: '4px',
            //   medium: '6px',
            //   large: '8px',
            // },
            // borderWidth: {
            //   small: '1px',
            //   medium: '2px',
            //   large: '3px',
            // },
          },
        },
      },
    }),
  ],
}
