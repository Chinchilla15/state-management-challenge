/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ravnBlack: "var(--ravn-black)",
        textDark: "var(--text-dark)",
        textLight: "var(--text-light)",
        textEmphasis: "var(--text-emphasis)",
        lowEmphasis: "var(--text-low-emphasis)",
        lowEmphasisSmall: "var(--text-low-emphasis-small)",
      },
      fontSize: {
        default: "var(--text-default)",
        defaultSmall: "var(--text-default-small)",
      },
    },
    plugins: [],
  },
};
