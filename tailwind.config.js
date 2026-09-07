/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,html}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      fontFamily: {
        // Live site tokens (src/css/tokens.css) — change the theme by editing the CSS variables, not here.
        heading: ["var(--font-heading)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],

        // Style-guide-only font families, used to preview each pairing.
        caveat: ["Caveat", "cursive"],
        nunito: ["Nunito", "sans-serif"],
        kalam: ["Kalam", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
        patrick: ["Patrick Hand", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        shantell: ["Shantell Sans", "cursive"],
        karla: ["Karla", "sans-serif"],
      },
      colors: {
        // Live site tokens, backed by CSS variables so the whole theme is swappable from one file.
        brand: {
          bg: "var(--color-bg)",
          surface: "var(--color-surface)",
          primary: "var(--color-primary)",
          "primary-contrast": "var(--color-primary-contrast)",
          secondary: "var(--color-secondary)",
          "secondary-contrast": "var(--color-secondary-contrast)",
          accent: "var(--color-accent)",
          "accent-contrast": "var(--color-accent-contrast)",
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          border: "var(--color-border)",
        },

        // Style-guide-only palettes, used to preview each option.
        retriever: {
          mustard: "#F4A825",
          terracotta: "#E07A5F",
          cream: "#FFF8ED",
          brown: "#5C4033",
          sage: "#8AA17E",
        },
        peachy: {
          peach: "#FFB88C",
          coral: "#FF6F59",
          cream: "#FFF4E6",
          teal: "#2A9D8F",
          charcoal: "#3D3D3D",
        },
        sunny: {
          yellow: "#FFC857",
          orange: "#F77F00",
          pink: "#FFCAD4",
          cream: "#FFFBF2",
          deepteal: "#264653",
        },
        cozy: {
          red: "#D62828",
          mustard: "#F4A261",
          cream: "#FAF3E0",
          green: "#606C38",
          brown: "#432818",
        },
      },
      fontSize: {
        hero: "var(--fs-hero)",
        "heading-2": "var(--fs-h2)",
        "heading-3": "var(--fs-h3)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
};
