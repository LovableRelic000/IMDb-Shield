/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        imdb: {
          yellow: '#F5C518',
          gold: '#e2b616',
          dark: '#0f0f0f',
          darker: '#080808',
          card: '#181818',
          cardHover: '#222222',
          border: '#2a2a2a',
          muted: '#8e8e8e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
