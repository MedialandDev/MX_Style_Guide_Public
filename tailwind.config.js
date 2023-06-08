/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,pug}"],
  theme: {
    extend: {
      colors: {
        'primary': '#1F1F1F',
        'secondary': '#665E5B',
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
        'light': '#f8f9fa',
        'dark' : '#343a40',
        'brown': '#AE987F',
        'beige': '#FBF8F6',
      },
    },
  },
  plugins: [],
}

