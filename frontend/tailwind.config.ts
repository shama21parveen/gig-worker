import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#132033',
        mist: '#f5f7fb',
        line: '#d6dce7',
        brand: {
          50: '#eef8f5',
          100: '#d5f0e6',
          200: '#b1e2d1',
          300: '#82ceb5',
          400: '#4db092',
          500: '#248b71',
          600: '#1a6e5a',
          700: '#145749',
          800: '#124539',
          900: '#10382f'
        },
        accent: {
          50: '#fff8ec',
          100: '#ffefcf',
          200: '#ffdc9a',
          300: '#ffc560',
          400: '#f8a722',
          500: '#e88f12',
          600: '#c46f0b',
          700: '#9b520d',
          800: '#804112',
          900: '#6c3614'
        },
        danger: {
          50: '#fff2f0',
          100: '#ffe0da',
          200: '#ffc5ba',
          300: '#ff9f8e',
          400: '#fe6c54',
          500: '#ed4428',
          600: '#dc371c',
          700: '#b72f19',
          800: '#922a1c',
          900: '#79281d'
        }
      },
      boxShadow: {
        panel: '0 18px 50px rgba(19, 32, 51, 0.08)',
        lift: '0 28px 80px rgba(19, 32, 51, 0.14)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Fraunces', 'ui-serif', 'Georgia']
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(19,32,51,0.08) 1px, transparent 0)'
      }
    },
  },
  plugins: [],
};

export default config;
