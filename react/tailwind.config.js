/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#3b0764",
        "light-white": "rgba(255,255,255,0.18)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

