module.exports = {
  // purge: ["./src/**/*.vue"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      // TODO 设置少点的屏幕 breakPoint
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
