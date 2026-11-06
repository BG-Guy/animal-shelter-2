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
  components.css                craft cards (tape, notes, poster, box) + marker squiggles
  paper-texture.css             .rough-paper: textured card surfaces with hand-cut edges
  sticker.css                   die-cut sticker buttons (every CTA on the home page)
  paper-band.css                full-width torn-paper section bands + torn page edge
  polaroid.css                  hero polaroid snapshots
  stat-strip.css                kraft-paper stats strip
  step-cards.css                "How it works" scraps: sticky note, torn sheet, gift tag
  pet-notebook.css              "Looking for a home" notebook: bookmarks, cover, pages, page turns
  motion.css                    scroll choreography for [data-reveal] blocks
  input.css                     Tailwind entry point (imports the above)

src/js/
  main.js                       entry point — wires up all modules
  modules/
    nav.js                       mobile menu toggle + sticky header shadow
    reveal-footer.js             keeps --footer-height in sync for the reveal effect
    reveal-on-scroll.js          marks [data-reveal] elements visible as they enter view
    count-up.js                  counts the stat figures up from zero on first view
    pets.js                      renders the pet notebook (tabs + pages) from data/pets.js
    pet-notebook.js              page-turn animation when a bookmark is picked or a page swiped
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
- **Scroll reveal** — add `data-reveal` to any element to have it rise in
  once it enters the viewport. `reveal-on-scroll.js` (IntersectionObserver)
  numbers blocks that arrive together so they stagger; `motion.css` then
  lands the craft details inside each block — tape, pins, stickers, marker
  squiggles. Animations use the individual `translate`/`scale`/`rotate`
  properties so they never overwrite a card's own tilt. Respects
  `prefers-reduced-motion`.
- **Data-driven pets** — the adoption notebook renders from
  `src/js/data/pets.js`; add a pet by adding an array entry (with an
  optional `photos` list of `{ prop, caption }` snapshots) and it gets its
  own bookmark and page, no HTML editing.
