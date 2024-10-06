import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          100: "#85c1ff",
          200: "#59a6ff",
          300: "#3d94ff",
          400: "#2281ff",
          500: "#1677ff", // Your primary color
          600: "#0063cc",
          700: "#0052a1",
          800: "#004080",
        },
      },
    },
  },
  plugins: [],
};
