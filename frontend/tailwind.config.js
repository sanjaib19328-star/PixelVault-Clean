/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forensic: {
          bg: '#080B12',
          panel: '#0F1420',
          card: '#161F30',
          border: '#202B40',
          primary: '#C8FF00',
          warning: '#FF5C35',
          info: '#00E5FF',
          muted: '#8A99AD',
          text: '#FFFFFF',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
