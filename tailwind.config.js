const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        snug: "1.2",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      screens: {
        cxl: "1450px",
        exl: "1600px",
      },
      colors: {
        ethereum: {
          DEFAULT: "#099FD4",
          50: "#9AE1FB",
          100: "#86DCFA",
          200: "#5FD0F8",
          300: "#38C5F7",
          400: "#11B9F5",
          500: "#099FD4",
          600: "#07779E",
          700: "#044E68",
          800: "#022633",
          900: "#000000",
          950: "#000000",
        },
        "milano-red": {
          DEFAULT: "#B72006",
          50: "#FB8D79",
          100: "#FA7C66",
          200: "#F95A3E",
          300: "#F83816",
          400: "#DF2707",
          500: "#B72006",
          600: "#811704",
          700: "#4A0D02",
          800: "#140301",
          900: "#000000",
          950: "#000000",
        },
        fandango: {
          DEFAULT: "#7000CC",
          50: "#C885FF",
          100: "#BF70FF",
          200: "#AC47FF",
          300: "#9A1FFF",
          400: "#8700F5",
          500: "#7000CC",
          600: "#510094",
          700: "#32005C",
          800: "#140024",
          900: "#000000",
          950: "#000000",
        },
        ultraviolet: {
          DEFAULT: "#2C1150",
          50: "#8242D7",
          100: "#7731D3",
          200: "#6426B5",
          300: "#521F93",
          400: "#3F1872",
          500: "#2C1150",
          600: "#130722",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        pistachio: {
          DEFAULT: "#DAEE77",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#F8FCE4",
          300: "#EEF7BF",
          400: "#E4F39B",
          500: "#DAEE77",
          600: "#CDE845",
          700: "#BADA1B",
          800: "#8FA815",
          900: "#65760F",
          950: "#4F5D0C",
        },
        tangerine: {
          DEFAULT: "#D35A03",
          50: "#FDBE90",
          100: "#FDB27C",
          200: "#FC9A54",
          300: "#FC832C",
          400: "#FB6B04",
          500: "#D35A03",
          600: "#9C4202",
          700: "#642B02",
          800: "#2D1301",
          900: "#000000",
          950: "#000000",
        },
        saffron: {
          DEFAULT: "#FBB80E",
          50: "#FEEDC3",
          100: "#FEE7AF",
          200: "#FDDC86",
          300: "#FDD05E",
          400: "#FCC436",
          500: "#FBB80E",
          600: "#CE9403",
          700: "#976D02",
          800: "#5F4501",
          900: "#281D01",
          950: "#0D0900",
        },
        eucalyptus: {
          DEFAULT: "#2A9D5E",
          50: "#9AE4BC",
          100: "#8AE0B1",
          200: "#6AD79B",
          300: "#4ACF86",
          400: "#32BD71",
          500: "#2A9D5E",
          600: "#1E7143",
          700: "#124429",
          800: "#06180E",
          900: "#000000",
          950: "#000000",
        },
        // forest: {
        //   DEFAULT: "#293332",
        //   50: "#D7DFDE",
        //   100: "#CCD6D5",
        //   200: "#B5C4C3",
        //   300: "#9FB2B0",
        //   400: "#88A09D",
        //   500: "#718E8B",
        //   600: "#5F7775",
        //   700: "#4D605E",
        //   800: "#3B4A48",
        //   900: "#293332",
        //   950: "#1C2323",
        // },
        forest: {
          DEFAULT: "#293332",
          50: "#EAECEB", // updated
          100: "#F0F5F3",
          200: "#B5C4C3",
          300: "#9FB2B0",
          400: "#88A09D",
          500: "#CDD8D3",
          600: "#5F7775",
          700: "#364240",
          800: "#5A6462",
          900: "#2A3433",
          950: "#1B2524",
          1000: "#151A19",
        },
        pie: {
          DEFAULT: "#D9A265",
          50: "#FDFBF8",
          100: "#F9F1E8",
          200: "#F1DDC7",
          300: "#E9CAA6",
          400: "#E1B686",
          500: "#D9A265",
          600: "#CE8738",
          700: "#A56A29",
          800: "#784D1E",
          900: "#4B3013",
        },
      },
    },
  },
  plugins: [
    // require("nightwind"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
