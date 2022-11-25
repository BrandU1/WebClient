/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./atoms/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "w-[24px]", //상품 디테일 페이지 pick line
    "w-[30px]", //전체 페이지 pick 버튼 크기
    "w-[45px]", //상품 디테일 페이지 pick 버튼 크기
    "h-[24px]",
    "h-[30px]",
    "h-[45px]",
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
        red: "#E44A38",
        yellow: "#ECAF49",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
