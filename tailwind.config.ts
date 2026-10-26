import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/app.{js,ts,vue}',
    './app/error.{js,ts,vue}'
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        brand: {
          black: '#0A0B0D',
          'black-soft': '#12141A',
          anthracite: '#181C24',
          'anthracite-card': '#202632',
          'anthracite-surface': '#272F3E',
          'anthracite-border': '#2D3546',
          'anthracite-border-light': '#3E485D',
          gold: {
            DEFAULT: '#D4AF37',
            50: '#FDFBF7',
            100: '#FAF4E8',
            200: '#F4E7CB',
            300: '#EDD7A7',
            400: '#E4C37C',
            500: '#D4AF37',
            600: '#BA9422',
            700: '#947314',
            800: '#6E540C',
            900: '#463507',
            light: '#E6CA65',
            muted: '#C5A059',
            dark: '#997D28'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
        'gold-sm': '0 2px 10px -2px rgba(212, 175, 55, 0.18)',
        'gold-md': '0 4px 24px -2px rgba(212, 175, 55, 0.28)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)'
      },
      borderRadius: {
        '2.5xl': '20px'
      }
    }
  },
  plugins: []
}
