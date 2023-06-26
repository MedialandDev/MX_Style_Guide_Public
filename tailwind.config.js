/** @type {import('tailwindcss').Config} */
const colors = {
  'orange': '#F0844A',
  'pink': '#C70067',
  'green': '#35B597',
  'blue': '#005D91',
  'black': '#313334',
  'dark-gray': '#585A5C',
  'light-gray':'#9FA0A0',
  'white': '#FFFEFD'
}
const screens = {
  'xs': '375px',
  'sm': '576px',
  'md': '768px',
  'lg': '992px',
  'xl': '1400px',
  'xxl': '1920px', //xxl 
}
const spacing = {
  '5px':'5px',
  '8px':'8px',
  '14px':'14px',
  '15px':'15px',
  '16px':'16px',
  '20px':'20px',
  '24px':'24px',
  '30px':'30px',
  '32px':'32px',
  '40px':'40px',
  '60px':'60px',
  '80px':'80px',
  '100px':'100px',
  '120px':'120px',
}
export default {
  content: ["./src/**/*.{html,js,pug}"],
  theme: {
    container: {
      center:true,
      padding: {
        DEFAULT: '25px',
        sm: '25px',
        md: '50px',
        xl: '0',
        xxl: '0',
      },
      screens: screens,
    },
    extend: {
      colors: colors,
      screens: screens,
      spacing: spacing,
      lineHeight: {
        '100': '100%',
        '120': '120%',
        '130': '130%',
        '150': '150%',
        '180': '180%',
      }
    },
  },
  plugins: [],
  separator: '_',  //改: 到 _ 因為pug 不支援 :
}

