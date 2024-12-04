/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#FFFFFF",
      secondary: {
        DEFAULT: "#00FF00",
        100: "#69609Eff",
        200: "#676669ff",
        300: "#140382ff",
      },
      tertiary: {
        DEFAULT: "#d0ccd0ff",
        100: "#a63d40ff",
        200: "#fbfbf2ff",
      },
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {},
  },
  plugins: [],
}

// From coolors.co pallette gen
// https://coolors.co/visualizer/242326-333147-69609e-676669-140382-d0ccd0-a63d40-fbfbf2
// --raisin-black: #242326ff;
// --space-cadet: #333147ff;
// --ultra-violet: #69609Eff;
// --dim-gray: #676669ff;
// --navy-blue: #140382ff;
// --french-gray: #d0ccd0ff;
// --redwood: #a63d40ff;
// --floral-white: #fbfbf2ff;