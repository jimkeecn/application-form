module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts,scss}", // Correct relative path
    "./**/*.{html,ts,scss}", // Correct relative path
    "!./node_modules/**/*" // Exclude node_modules
  ],
  theme: {
    extend: {},
  },
  plugins: [
    
  ],
}

