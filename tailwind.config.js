/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:   '#000000',
        card:    '#0f0f0f',
        card2:   '#1a1a1a',
        teal:    '#0d9488',
        teal2:   '#14b8a6',
        emerald: '#10b981',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      animation: {
        'float':     'float 5s ease-in-out infinite',
        'spin-slow': 'spinSlow 9s linear infinite',
        'blink':     'blink 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
