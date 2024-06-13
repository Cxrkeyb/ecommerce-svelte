/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          "DEFAULT": "#003459",
          "light": "#0078CD",
          "medium": "#00528C",
          "dark": "#002A48"
        },
        'secondary': {
          "DEFAULT": "#F7DBA7",
          "light": "#FCEED5",
          "medium": "#F1D092",
          "dark": "#EEC77E"
        },
        'blue-sea': "#00A7E7",
        "orange-shine": "#FFB775"
      }
    },
  },
  plugins: [],
}
