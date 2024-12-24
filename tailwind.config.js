/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#10a37f',
          dark: '#0d8c6d',
        },
        gray: {
          50: '#f9fafb',
        }
      },
      spacing: {
        '20': '5rem',
      },
      minHeight: {
        'screen': '100vh',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  safelist: [
    'bg-gray-400',
    'cursor-not-allowed',
    'bg-primary',
    'hover:bg-primary-dark'
  ]
}