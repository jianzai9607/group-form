/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  corePlugins: {
    preflight: false // To avoid conflict with antd
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens
    },
    extend: {
      colors: {},
      spacing: {
        2.5: "0.625rem",
        3.5: "0.875rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        11.5: "2.875rem",
        12.5: "3.125rem",
        13: "3.25rem",
        13.5: "3.375rem",
        14.5: "3.625rem",
        15: "3.75rem",
        15.5: "3.875rem",
        16.5: "4.125rem",
        17: "4.25rem",
        17.5: "4.375rem",
        18: "4.5rem",
        18.5: "4.625rem",
        19: "4.75rem",
        19.5: "4.875rem",
        20.5: "5.125rem",
        21: "5.25rem",
        21.5: "5.375rem",
        22: "5.5rem",
        22.5: "5.625rem",
        23: "5.75rem",
        23.5: "5.875rem",
        25: "6.25rem",
        25.5: "6.375rem",
        26: "6.5rem",
        26.5: "6.625rem",
        27: "6.75rem",
        27.5: "6.875rem",
        29: "7.25rem",
        29.5: "7.375rem",
        30: "7.5rem"
      }
    }
  },
  variants: {
    extend: {}
  }
};
