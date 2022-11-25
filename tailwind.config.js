/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0CABA8",
        gray: "#D9D9D9",
        notice: "#999999",
        lightGary: "#EDEDED",
        modalBackground: "#F8F8FA",
        subContent: "#767676",
      },
    },
  },
  plugins: [],
};
