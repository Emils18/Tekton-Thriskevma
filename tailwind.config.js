/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        pill: '9999px',
        oval: '40% 60% 50% 50% / 50% 40% 50% 60%',
      },
      colors: {
        brand: {
          green: '#1B5E20',
          'light-green': '#E8F5E9',
          white: '#FFFFFF',
          accent: '#4CAF50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};