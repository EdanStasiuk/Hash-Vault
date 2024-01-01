/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans"],
        roboto: ["Roboto"],
        robotoFlex: ["Roboto Flex"],
        ruda: ["Ruda"],
      },
      colors: {
        hero: {
          500: "#A489FA",
        },
        ghost: {
          500: "#BABABA",
          900: "#505050"
        },
        primary: { //purple
          50: "#F7F5FF",
          100: "#ECE7FE",
          200: "#D9CEFD",
          300: "#CABAFC",
          400: "#B7A2FB",
          500: "#A489FA",
          600: "#6B40F7",
          700: "#3C0AE1",
          800: "#270693",
          900: "#140349",
          950: "#0A0227",
        },
        secondary: { //blue
          50: "#F5F7FF",
          100: "#EBEEFF",
          200: "#D6DEFF",
          300: "#C7D1FF",
          400: "#B3C1FF",
          500: "#9EAFFF",
          600: "#4D6DFF",
          700: "#002EFA",
          800: "#001EA3",
          900: "#000F52",
          950: "#000729",
        },
        background: { //black
          50: "#E7E8EE",
          100: "#CFD1DE",
          200: "#9BA1BB",
          300: "#6B7399",
          400: "#464C67",
          500: "#252836",
          600: "#1D1F2A",
          700: "#171921",
          800: "#0F1015",
          900: "#08090C",
          950: "#040406",
        },
        error: { //red
          50: "#FFE5E5",
          100: "#FFCCCC",
          200: "#FF9999",
          300: "#FF6666",
          400: "#FF3333",
          500: "#FF0000",
          600: "#CC0000",
          700: "#990000",
          800: "#660000",
          900: "#330000",
          950: "#190000",
        },
        confirmed: { // green
          50: "#E7FEED",
          100: "#CFFCDA",
          200: "#9AF9B2",
          300: "#6AF68D",
          400: "#3AF368",
          500: "#0EE843",
          600: "#0BBC37",
          700: "#088B29",
          800: "#065B1B",
          900: "#03300E",
          950: "#011807",
        },
      },
      letterSpacing: {
        logo: "0.3em"
      },
      scale: {
        '80': '0.8',
        '103': '1.03',
        '250': '2.5',
        '300': '3',
        '370': '3.7',
      },
      spacing: {
        'condense': '-10px',
      },
      height: {
        '18': '70px'
      }
    },
  },
};
