/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#F8F8F8",
        base: "#EA7C69",
        ash: "#6B7E86",
        green: "#50D1AA",
        yellow: "#FDC55E",
        blue: "#9290FE",
        white: "#FFFFFF",
        black: "#000000",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "heading-lg": "var(--heading-lg)",
        "heading-md": "var(--heading-md)",
        "body-lg": "var(--body-lg)",
        "body-md": "var(--body-md)",
        "body-sm": "var(--body-sm)",
      },
      fontWeight: {
        regular: "var(--weight-regular)",
        medium: "var(--weight-medium)",
        semi: "var(--weight-semi)",
        bold: "var(--weight-bold)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
