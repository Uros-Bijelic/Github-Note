import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        primary: {
          500: "var(--primary-500)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        black: {
          600: "var(--black-600)",
          700: "var(--black-700)",
          800: "var(--black-800)",
          900: "var(--black-900)",
        },
        white: {
          100: "var(--white-100)",
          300: "var(--white-300)",
          500: "var(--white-500)",
        },
        purple: { 500: "var(--purple-500)", 900: "var(--purple-900)" },
        green: {
          400: "var(--green-400)",
          500: "var(--green-500)",
          900: "var(--green-900)",
        },
        red: { primary: "var(--red-text-error)", bg: "var(--red-bg-error)" },
        gray: { border: "var(--gray-border)" },
      },
      boxShadow: {
        "tw-primary-shadow": "0px 0px 0px 1px #121212",
        "tw-secondary-shadow":
          "0px 1px 3px 0px #1212121A, 0px 0px 0px 1px #12121212, 0px 1px 1px 0px #1212121A",
        "tw-input-shadow":
          "0px 0px 0px 1px #1212121A, 0px 1px 1px 0px #1212121A",
        "tw-stepper-btn": "0px 0px 0px 4px #2E3757",
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
    },
  },
  plugins: [animate, typography],
} satisfies Config;

export default config;
