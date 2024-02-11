/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#f9f9f8",
        white: "#ffffff",
        table_header: "#f7f9f9b0",
        table_border: "#f5f5f5",
        primary: {
          50: "#f0f8eb",
          100: "#d0eac1",
          200: "#badfa3",
          300: "#9ad17a",
          400: "#86c860",
          500: "#68ba38",
          600: "#5fa933",
          700: "#4a8428",
          800: "#39661f",
          900: "#2c4e18",
        },
        secondary: {
          50: "#e6e7e7",
          100: "#b2b4b6",
          200: "#8d8f92",
          300: "#5a5c61",
          400: "#393d42",
          500: "#080c13",
          600: "#070b11",
          700: "#06090d",
          800: "#04070a",
          900: "#030508",
        },
        dark_surface: {
          500: "#14151a",
          600: "#181a20",
        },
        copy: {
          50: "#fefffe",
          100: "#fcfefb",
          200: "#fbfdf9",
          300: "#f9fcf7",
          400: "#f8fcf5",
          500: "#f6fbf3",
          600: "#e0e4dd",
          700: "#afb2ad",
          800: "#878a86",
          900: "#676966",
        },
      },
      backgroundImage: {
        "login-bg": "url('/public/login-bg.webp')",
      },
      fontFamily: {
        epilogue: ["epilogue", ...fontFamily.sans],
        work_sans: ['"work sans"', ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

