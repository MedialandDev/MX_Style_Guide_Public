/** @type {import('tailwindcss').Config} */
const colors = {
  's1': '#F0844A',
  's2': '#35B597',
  's3': '#C70067',
  's4': '#005D91',
  'gray1': '#313334',
  'gray2': '#585A5C',
  'gray3':'#9FA0A0',
  'w1': '#FFFEFD'
}
const screens = {
  'xs': '320px',
  'sm': '576px',
  'md': '768px',
  'lg': '992px',
  'xl': '1400px',
  'xxl': '1920px', //xxl 
}
const spacing = {
  '4px':'4px',
  '8px':'8px',
  '10px':'10px',
  '12px':'12px',
  '16px':'16px',
  '20px':'20px',
  '24px':'24px',
  '28px':'28px',
  '30px':'30px',
  '32px':'32px',
  '40px':'40px',
  '48px':'48px',
  '60px':'60px',
  '64px':'64px',
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
        DEFAULT: '24px',
        sm: '24px',
        md: '48px',
        lg:'60px',
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
        '160': '160%',
        '150':'150%',
        '180': '180%',
      },
      gridTemplateColumns: {
        '3-card': 'repeat(3, minmax(0, 410px))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        transLeft: {
          '0%, 100%':{ transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-5px)' }
        },
        transRight: {
          '0%, 100%':{ transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(5px)' }
        },
        faseIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'trans-left': 'transLeft .6s ease forwards',
        'trans-right': 'transRight .6s ease forwards',
        'fase-in': 'fadeIn .5s ease forwards',
      },
    },
  },
  plugins: [],
}

