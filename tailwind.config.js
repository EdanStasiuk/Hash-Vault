/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans"],
        roboto: ["Roboto"],
        robotoFlex: ["Roboto Flex"]
      },
      colors: {
        primary: {
          //purple
          50: "color(display-p3 0.969 0.961 1 / <alpha-value>)",
          100: "color(display-p3 0.925 0.906 0.996 / <alpha-value>)",
          200: "color(display-p3 0.851 0.808 0.992 / <alpha-value>)",
          300: "color(display-p3 0.792 0.729 0.988 / <alpha-value>)",
          400: "color(display-p3 0.718 0.635 0.984 / <alpha-value>)",
          500: "color(display-p3 0.643 0.537 0.98 / <alpha-value>)",
          600: "color(display-p3 0.42 0.251 0.969 / <alpha-value>)",
          700: "color(display-p3 0.235 0.039 0.882 / <alpha-value>)",
          800: "color(display-p3 0.153 0.024 0.576 / <alpha-value>)",
          900: "color(display-p3 0.078 0.012 0.286 / <alpha-value>)",
          950: "color(display-p3 0.039 0.008 0.153 / <alpha-value>)",
        },
        secondary: {
          //blue
          50: "color(display-p3 0.961 0.969 1 / <alpha-value>)",
          100: "color(display-p3 0.922 0.933 1 / <alpha-value>)",
          200: "color(display-p3 0.839 0.871 1 / <alpha-value>)",
          300: "color(display-p3 0.78 0.82 1 / <alpha-value>)",
          400: "color(display-p3 0.702 0.757 1 / <alpha-value>)",
          500: "color(display-p3 0.62 0.686 1 / <alpha-value>)",
          600: "color(display-p3 0.302 0.427 1 / <alpha-value>)",
          700: "color(display-p3 0 0.18 0.98 / <alpha-value>)",
          800: "color(display-p3 0 0.118 0.639 / <alpha-value>)",
          900: "color(display-p3 0 0.059 0.322 / <alpha-value>)",
          950: "color(display-p3 0 0.027 0.161 / <alpha-value>)",
        },
        background: {
          //black
          50: "color(display-p3 0.906 0.91 0.933 / <alpha-value>)",
          100: "color(display-p3 0.812 0.82 0.871 / <alpha-value>)",
          200: "color(display-p3 0.608 0.631 0.733 / <alpha-value>)",
          300: "color(display-p3 0.42 0.451 0.6 / <alpha-value>)",
          400: "color(display-p3 0.275 0.298 0.404 / <alpha-value>)",
          500: "color(display-p3 0.145 0.157 0.212 / <alpha-value>)",
          600: "color(display-p3 0.114 0.122 0.165 / <alpha-value>)",
          700: "color(display-p3 0.09 0.098 0.129 / <alpha-value>)",
          800: "color(display-p3 0.059 0.063 0.082 / <alpha-value>)",
          900: "color(display-p3 0.031 0.035 0.047 / <alpha-value>)",
          950: "color(display-p3 0.016 0.016 0.024 / <alpha-value>)",
        },
        error: {
          //red
          50: "color(display-p3 1 0.922 0.922 / <alpha-value>)",
          100: "color(display-p3 0.996 0.824 0.824 / <alpha-value>)",
          200: "color(display-p3 0.988 0.671 0.671 / <alpha-value>)",
          300: "color(display-p3 0.98 0.502 0.502 / <alpha-value>)",
          400: "color(display-p3 0.969 0.353 0.353 / <alpha-value>)",
          500: "color(display-p3 0.949 0.188 0.188 / <alpha-value>)",
          600: "color(display-p3 0.875 0.043 0.043 / <alpha-value>)",
          700: "color(display-p3 0.655 0.027 0.027 / <alpha-value>)",
          800: "color(display-p3 0.250 0.010 0.010 / <alpha-value>)",
          900: "color(display-p3 0.216 0.004 0.004 / <alpha-value>)",
          950: "color(display-p3 0.118 0 0 / <alpha-value>)",
        },
      },
      letterSpacing: {
        logo: "0.3em"
      },
      scale: {
        '103':'1.03',
        '300':'3',
      },
      spacing: {
        'condense': '-10px',
      },
      width: {
        '3.5/12': '28%',
      },
      minWidth: {
        '1/2': '50%',
        '1/5': '20%',
      },
      height: {
        '9/6': '140%',
        '18': '70px'
      }
    },
  },
};
