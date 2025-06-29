/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#111827',
        'theme-bg': 'var(--bg-color)',
        'theme-text': 'var(--text-color)',
        'theme-primary': 'var(--primary-color)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}; 