# Furever Home 🐾

A portfolio project: a warm, friendly, hand-drawn-feel website for an animal
shelter. Built with vanilla JavaScript and Tailwind CSS — no framework.

## Status

The theme is chosen — **Caveat + Nunito** on the **Golden Retriever** palette
— and `index.html` is now the real site structure: navbar, hero, stats,
adoptable pets, how-it-works, about, volunteer/donate CTAs, testimonials, and
a reveal-on-scroll footer.

`style-guide.html` is kept around as the original design-exploration page
(pick a font pairing / palette, see it live) — useful if the theme ever needs
revisiting.

## Theme

The whole visual theme is driven by CSS variables in `src/css/tokens.css`
(colors, fonts, fluid type scale, shadows, radii). `tailwind.config.js` reads
its `brand.*` colors and `heading`/`body` font families from those variables,
so re-theming the site means editing one file, not hunting through markup.

- **Fonts** — Caveat (headings) + Nunito (body), self-hosted in
  `assets/fonts/` so the site works offline and loads faster.
- **Palette** — mustard `#F4A825`, terracotta `#E07A5F`, cream `#FFF8ED`,
  sage `#8AA17E`, brown `#5C4033`.

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
index.html                    the live site
style-guide.html               font/color exploration page (dev reference)

src/css/
  tokens.css                    CSS custom properties — the whole theme lives here
  base.css                      element resets + reveal-footer plumbing
  input.css                     Tailwind entry point (imports the above)

src/js/
  main.js                       entry point — wires up all modules
  modules/
    nav.js                       mobile menu toggle + sticky header shadow
    reveal-footer.js             keeps --footer-height in sync for the reveal effect
    reveal-on-scroll.js          fades in [data-reveal] elements as they enter view
    pets.js                      renders pet cards from data/pets.js
  data/
    pets.js                       adoptable pet data (edit this to add/remove pets)
  style-guide.js                 logic for style-guide.html only

dist/output.css                 built Tailwind CSS (committed)
assets/fonts/                    self-hosted font files + fonts.css
tailwind.config.js               brand colors/fonts, sourced from CSS variables
.github/workflows/deploy-pages.yml   builds + deploys to GitHub Pages on push to main
```

## Notable patterns

- **Reveal footer** — `#page-shell` (everything except the footer) has a
  `margin-bottom` equal to the footer's own height, and `#site-footer` is
  `position: sticky; bottom: 0`. That's the entire effect — pure CSS, no
  scroll listener — `reveal-footer.js` just keeps the height variable
  accurate as content/viewport changes.
- **Scroll reveal** — add `data-reveal` to any element to have it fade/slide
  in once it enters the viewport (`reveal-on-scroll.js`, IntersectionObserver
  based, respects `prefers-reduced-motion`).
- **Data-driven pets** — the adoptable-pets grid renders from
  `src/js/data/pets.js`; add a pet by adding an array entry, no HTML editing.
