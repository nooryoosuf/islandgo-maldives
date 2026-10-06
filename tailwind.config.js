/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe5fe',
          300: '#93d5fd',
          400: '#60bcfa',
          500: '#3b9ff6',
          600: '#0b7abf',
          700: '#0c628f',
          800: '#105374',
          900: '#134561',
          950: '#0a2342',
        },
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        lagoon: {
          100: '#d7f3ef',
          500: '#14a89a',
          600: '#0d8a7f',
          700: '#0b6f67',
        },
        sand: {
          50: '#fdfbf7',
          100: '#faf6ef',
          200: '#f5eee0',
        },
        ink: {
          900: '#0a2342',
          700: '#334155',
          500: '#64748b',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,35,66,0.05), 0 8px 24px -12px rgba(10,35,66,0.12)',
      },
    },
  },
  plugins: [],
}
