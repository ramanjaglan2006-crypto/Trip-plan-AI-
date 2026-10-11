/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#080D1B',
        darkSurface: '#111A2E',
        darkElevated: '#19243A',
        darkBorder: '#29354B',
        brandCyan: '#22D3EE',
        brand: {
          50: '#f0fdf4',
          100: '#e0effe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'panel': '24px',
      }
    },
  },
  plugins: [],
}
