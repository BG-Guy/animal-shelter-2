# Furever Home 🐾

A portfolio project: a warm, friendly, hand-drawn-feel website for an animal
shelter. Built with vanilla JavaScript and Tailwind CSS — no framework.

## Status

Step 1: **style exploration**. `index.html` is a living style guide — pick a
font pairing and a color palette and watch a mini homepage preview update
live, so we can settle on a direction before building out the real site.

Open `index.html` in a browser (or run `npm start`) to try it.

## Font pairings

Each pairing is a hand-written/display font for headings + a soft, rounded
font for body text:

- **Caveat + Nunito** — playful & scrapbook-y
- **Kalam + Quicksand** — cozy & rounded
- **Patrick Hand + Poppins** — storybook & clean
- **Shantell Sans + Karla** — modern hand-lettered

Fonts are self-hosted (`assets/fonts/`) rather than loaded from Google Fonts,
so the page works offline and loads a bit faster.

## Color palettes

- **Golden Retriever** — mustard, terracotta & cream
- **Peachy Paws** — peach, coral & teal
- **Sunny Shelter** — sunflower yellow, pink & deep teal
- **Cozy Blanket** — red, mustard & forest green

## Development

```bash
npm install
npm run watch:css   # rebuilds dist/output.css on change
npm start           # serves the project locally
```

`dist/output.css` is committed so the page also works with no build step
(e.g. straight from GitHub Pages).

## Project structure

```
index.html          the style-guide / preview page
src/input.css        Tailwind source
src/main.js          font/palette data + interactivity (vanilla JS)
dist/output.css       built Tailwind CSS (committed)
assets/fonts/         self-hosted font files + fonts.css
tailwind.config.js    palette colors & font families
```
