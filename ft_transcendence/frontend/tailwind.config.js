/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans'],
        'press': ['Press Start 2P', 'cursive'],
        'code': ['Source Code Pro', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontWeight: {
        'light': 100, // Example: 'font-light' class
        'normal': 400, // Example: 'font-normal' class
        'medium': 500, // Example: 'font-medium' class
        'bold': 700,   // Example: 'font-bold' class
      },
    },
  },
  plugins: [require("daisyui")],
}