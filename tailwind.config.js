/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          magenta: '#DD2E79',
          purple: '#7030A0',
          dark: '#741399',      // Púrpura oscuro
          lime: '#97BD12',
          gold: '#FFC000',
          gray: '#737070',      // Gris neutro
        }
      },
      fontFamily: {
        // Reemplaza la fuente principal por Metropolis
        sans: ['Raqillas', 'Metropolis', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}