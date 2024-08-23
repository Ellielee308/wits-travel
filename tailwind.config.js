/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"], // 定義字體族群
      },
      screens: {
        md: "576px",
        lg: "992px",
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
