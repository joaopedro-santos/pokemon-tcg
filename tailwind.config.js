/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poke': ['"Flexo"'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}