/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parcoBlue: "#0671AD",
        parcoBlueHover: '#044F79',
        parcoHighlight: "#21B8FD",
        pastelWater: "#ADC5E3",
        blueSecondaryDark: "#344767",
        blueSecondaryDarkHover: "#293852",
        offWhite: "#F9F9F9",
        grayMedium: "#A3A7AA",
        grayDark: "#495057",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },

  },
  plugins: [],
}
