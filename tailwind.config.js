/** @type {import('tailwindcss').Config} */
module.exports = {
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
        bodyFont: ["Montserrat", "sans-serif"],
        titleFont: ["Inter", "sans-serif"],
      },
            colors: {
        bodyColor: "#1b1d1d",
        textGreen: "#2DF9EC",
        textLight: "#ffffff",
        textDark: "#8f8f8f",
        hoverColor: "rgba(100,255,218,0.1)",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

