/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        extrabold: '800',
      },
      backdropBlur: {
        nav: '30px',
      },
      transitionDuration: {
        '400': '400ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
}
