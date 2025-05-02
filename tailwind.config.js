/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#242442'
        },
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed'
        },
        highlight: {
          DEFAULT: '#e2e8f0',
          dark: '#cbd5e1'
        }
      }
    },
  },
  plugins: [],
};