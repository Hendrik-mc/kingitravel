import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4fbff',
          100: '#dff3ff',
          500: '#0077b6',
          700: '#005f8f',
          900: '#023047'
        }
      }
    }
  },
  plugins: []
};

export default config;
