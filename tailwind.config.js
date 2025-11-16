/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    container: {
      padding: '15px',
      center: true,
    },

    extend: {
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },

      fontFamily:{
        bodyFont: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
        titleFont: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        // Minimalistic color scheme with dark mode support
        primary: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#000000',
          gray: '#666666',
        },
        background: {
          DEFAULT: '#FFFFFF',
          light: '#FAFAFA',
          gray: '#F5F5F5',
          dark: '#0A0A0A',
          'dark-secondary': '#1A1A1A',
          'dark-tertiary': '#2A2A2A',
        },
        border: {
          DEFAULT: '#E5E5E5',
          light: '#F0F0F0',
          dark: '#D4D4D4',
          'dark-mode': '#2A2A2A',
        },
        text: {
          primary: '#000000',
          secondary: '#666666',
          tertiary: '#999999',
          light: '#CCCCCC',
          'dark-primary': '#FFFFFF',
          'dark-secondary': '#B3B3B3',
          'dark-tertiary': '#808080',
        },
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function({ addUtilities }) {
      const newUtilities = {
        '.minimal-card': {
          'background': '#FFFFFF',
          'border': '1px solid #E5E5E5',
          'transition': 'all 0.2s ease',
        },
        '.minimal-card:hover': {
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

