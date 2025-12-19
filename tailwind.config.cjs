/** @type {import('tailwindcss').Config} */
module.exports = {
    // prefix: 'tw-',  
    important: true,
  content: [  "./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {   // ✅ keep default font sizes and just add your stuff
      colors: {
        blue: '#1fb6ff',
        purple: '#7e5bef',
        pink: '#ff49db',
        yellow: '#ebdfb3ff',
        white: '#fff'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
    },
  },
  plugins: [],
}
