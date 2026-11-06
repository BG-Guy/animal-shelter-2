// Renders the "Looking for a home" notebook from data/pets.js: a bookmark
// tab per pet into #pet-tabs, and a two-page spread per pet into
// #pet-pages (snapshots on the left page, details on the right).
// Turning pages is handled by pet-notebook.js; styles in pet-notebook.css.
import { pets } from "../data/pets.js";

// Each pet's colour, cycled: tints its bookmark and its photo backdrops
const TONES = ["mustard", "sage", "rose", "kraft"];
// Washi tape that contrasts with each tone
const TAPE_FOR_TONE = { mustard: "sage", sage: "rose", rose: "mustard", kraft: "sage" };

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// A paper bookmark poking out of the notebook: mini photo + handwritten name
function bookmarkTab(pet, index) {
  const id = slug(pet.name);
  return `
    <button type="button" role="tab" id="pet-tab-${id}" class="nb-tab"
      aria-controls="pet-page-${id}" aria-selected="false" tabindex="-1"
      data-tone="${TONES[index % TONES.length]}" style="--tab-i: ${index}">
      <span class="nb-tab-photo" aria-hidden="true"><img src="${pet.photo.replace(".webp", "-tab.webp")}" alt="" width="96" height="96" loading="lazy" decoding="async"></span>
      <span class="nb-tab-name">${pet.name}</span>
    </button>`;
}

// One extra snapshot of the pet (a photo, or its emoji with a prop); `holder` is how it's stuck down
function snapshot(pet, photo, slotClass, holder) {
  if (!photo) return "";
  return `
    <figure class="nb-photo ${slotClass}">
      ${holder}
      ${photo.src
        ? `<div class="nb-photo-img nb-photo-img--real"><img src="${photo.src}" alt="${photo.alt}" width="480" height="480" loading="lazy" decoding="async"></div>`
        : `<div class="nb-photo-img" aria-hidden="true">${pet.emoji}<span class="nb-photo-prop">${photo.prop}</span></div>`}
      <figcaption>${photo.caption}</figcaption>
    </figure>`;
}

// A pet's spread: the photo page (left) and the details page (right)
function spread(pet, index) {
  const id = slug(pet.name);
  const tone = TONES[index % TONES.length];
  const tape = TAPE_FOR_TONE[tone];
  const [first, second] = pet.photos ?? [];

  return `
    <article role="tabpanel" id="pet-page-${id}" class="nb-spread"
      aria-labelledby="pet-tab-${id}" data-tone="${tone}">
      <div class="nb-page nb-page--photos">
        ${snapshot(pet, first, "nb-photo--a", '<span class="nb-sticker nb-sticker--heart" aria-hidden="true">♥</span>')}
        ${snapshot(pet, second, "nb-photo--b nb-photo--cornered", '<span class="nb-sticker nb-sticker--paw" aria-hidden="true">🐾</span>')}
        <figure class="nb-photo nb-photo--main">
          <span class="craft-tape craft-tape--${tape} nb-tape-left" aria-hidden="true"></span>
          <span class="craft-tape craft-tape--${tape} nb-tape-right" aria-hidden="true"></span>
          <div class="nb-photo-img nb-photo-img--real"><img src="${pet.photo}" alt="${pet.photoAlt}" width="640" height="640" loading="lazy" decoding="async"></div>
          <figcaption>${pet.name}</figcaption>
        </figure>
        <p class="nb-scribble" aria-hidden="true">snapshots ♥</p>
      </div>

      <div class="nb-page nb-page--details">
        <p class="nb-kicker">Adoption file no. ${index + 1}</p>
        <h3 class="nb-name"><span class="marker-swash">${pet.name}</span></h3>
        <dl class="nb-facts">
          <div><dt>Species</dt><dd>${pet.species}</dd></div>
          <div><dt>Breed</dt><dd>${pet.breed}</dd></div>
          <div><dt>Age</dt><dd>${pet.age}</dd></div>
        </dl>
        <p class="nb-notes"><span class="nb-notes-label">Notes:</span> ${pet.blurb}</p>
        <button type="button" class="sticker sticker--terracotta nb-cta">Meet ${pet.name}</button>
        <p class="nb-page-number" aria-hidden="true">${index + 1}</p>
      </div>
    </article>`;
}

export function renderPets() {
  const tabs = document.getElementById("pet-tabs");
  const pages = document.getElementById("pet-pages");
  if (!tabs || !pages) return;

  tabs.innerHTML = pets.map(bookmarkTab).join("");
  pages.innerHTML = pets.map(spread).join("");
}
