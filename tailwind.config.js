/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      fontFamily: {
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
      boxShadow: {
        soft: "0 8px 24px -8px rgba(92, 64, 51, 0.25)",
      },
    },
  },
  plugins: [],
};
