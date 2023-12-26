import colors from "./colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      screens: {
        sm: '540px',
        md: '768px',
        lg: '992px',
        xl: '1216px',
        '2xl': '1440px',
      },
      colors,
      borderRadius: {
        none: 0,
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
        xl: '14px',
        xxl: '20px',
        full: '9999px',
      },
      spacing: {
        'mobile': '10px',
        7: '28px',
        17: '68px',
        '0.8': '80%'
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      boxShadow: {
        fixedColumn: '0px 0px 5px rgba(9, 30, 66, 0.15)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};