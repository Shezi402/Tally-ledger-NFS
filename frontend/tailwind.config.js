/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ledger: {
          paper: "#F6F1E4",
          line: "#DDD3B8",
          ink: "#1E2B22",
          forest: "#2F4B34",
          moss: "#4A6B4E",
          rust: "#B4552C",
          gold: "#C89A3A",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
