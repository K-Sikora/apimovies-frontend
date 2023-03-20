/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#11c59e",
        dark: {
          900: "#1a1a1a",
          700: "#363737",
        },
        subheading: "#68686d",
        light: "#f6f8f8",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
