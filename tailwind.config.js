const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,js}"],
  },
  theme: {
    extend: {
      orange: colors.orange,
    },
  },
  plugins: [],
};
