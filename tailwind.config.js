module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        stripe:
          "0px 2px 10px -1px rgba(50, 50, 93, 0.25), 0px 1px 3px -1px rgba(0, 0, 0, 0.003)",
      },
      colors: {
        primary: "#009DAE",
        secondary: "#71DFE7",
        accent: "#FFE652",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
