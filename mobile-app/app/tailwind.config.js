/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{ts,tsx}",
    "../app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CBF0E9",
        secondary: "#95E1D3",
        tertiary: "#95E1D3",
        customGray: '#808080',
      },
      fontFamily: {
        yellowtail: ["Yellowtail_400Regular"],
      },
    },
  },
  plugins: [],
};
