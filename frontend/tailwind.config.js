/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Original primary.500
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#101012",
        },
        light: {
          900: "#FFFFFF",
          800: "#F4F6F8",
          850: "#FDFDFD",
          700: "#DCE3F1",
          500: "#7B8EC8",
          400: "#858EAD",
        },
        // Flattened Primary Colors
        colorP01: "#004278",
        colorP02: "#0058a0",
        colorP03: "#2f78b4",
        colorP04: "#669dca",
        colorP05: "#c2def5",
        colorP06: "#f3f9fd",

        // Secondary Colors
        colorS01: "#d0a600",
        colorS02: "#ffcd03",
        colorS03: "#fed637",
        colorS04: "#ffe065",
        colorS05: "#ffea94",
        colorS06: "#fff3c1",

        // GrayScale Colors
        colorG01: "#030900",
        colorG02: "#11190c",
        colorG03: "#7c807a",
        colorG04: "#b8bbb6",
        colorG05: "#edeeec",
        colorG06: "#ffffff",

        // Error Color
        errorColor: "#F51414",
      },
    },
  },
  plugins: [forms],
};
