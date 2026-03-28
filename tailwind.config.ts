/** @type {import('tailwindcss').Config} */
const config: import('tailwindcss').Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ["var(--font-exo)", "sans-serif"],
      },
    
    },
  },
  plugins: [],
}

export default config;