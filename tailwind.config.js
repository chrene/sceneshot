// @/tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'background-gradients': 'repeat(4, minmax(100px, 1fr))',
      }
    }
  },
  plugins: [],
}