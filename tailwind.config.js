module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'font': ['Titillium Web'],
    },
    extend: {
      colors: {
        'app': '#0C0D10',
        'app-border': 'rgba(255,255,255, .1)',
      },
    },
  },
  plugins: [],
}
