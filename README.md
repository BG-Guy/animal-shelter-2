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
npm run build       # regenerates index.html from src/layout + src/components, then builds CSS
npm run watch:css   # rebuilds dist/output.css on change (run alongside editing)
npm start           # serves the project locally
```

`index.html` and `dist/output.css` are both committed, built artifacts —
the page works with no build step (e.g. straight from GitHub Pages), but
**don't hand-edit `index.html`**: edit `src/layout/index.html` or a file in
`src/components/` and run `npm run build:html` (or `npm run build`), or
your changes will be overwritten on the next build. CI runs `npm run build`
on every deploy too, so the committed file always matches its source.

## Project structure

```
index.html                    the live site — GENERATED, edit src/layout + src/components instead
style-guide.html               font/color exploration page (dev reference, hand-edited directly)

src/layout/
  index.html                    the page shell: <head>, skip link, #page-shell/#footer-spacer
                                 wrapper and script tag, with <!-- @include name --> markers

src/components/                 one HTML partial per section of the live site — open any file
                                 here to read/edit just that piece of the page
  navbar.html
  hero.html
  stats.html
  pets.html                     wraps #pets-grid, which pets.js fills in at runtime
  how-it-works.html
  about.html
  get-involved.html
  testimonials.html
  footer.html

scripts/
  build-html.js                  assembles index.html from src/layout + src/components

src/css/
  tokens.css                    CSS custom properties — the whole theme lives here
  base.css                      element resets + reveal-footer plumbing
  input.css                     Tailwind entry point (imports the above)
  components/
    index.css                    imports every component's custom CSS file
    pets.css                     cork-board pet card styles (gradients Tailwind can't express)
                                  — most components need no file here since they're styled
                                  entirely with Tailwind utility classes in their .html partial

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

`style-guide.html` is a single small, self-contained tool page (not a
section of the live site), so it isn't split into components — it keeps its
own markup and `src/js/style-guide.js`.

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
