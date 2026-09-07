// Font pairings: a hand-written display font for headings + a soft, rounded font for body copy.
const fontPairings = [
  {
    id: "caveat-nunito",
    name: "Caveat + Nunito",
    vibe: "Playful & scrapbook-y",
    headingClass: "font-caveat",
    bodyClass: "font-nunito",
  },
  {
    id: "kalam-quicksand",
    name: "Kalam + Quicksand",
    vibe: "Cozy & rounded",
    headingClass: "font-kalam",
    bodyClass: "font-quicksand",
  },
  {
    id: "patrick-poppins",
    name: "Patrick Hand + Poppins",
    vibe: "Storybook & clean",
    headingClass: "font-patrick",
    bodyClass: "font-poppins",
  },
  {
    id: "shantell-karla",
    name: "Shantell Sans + Karla",
    vibe: "Modern hand-lettered",
    headingClass: "font-shantell",
    bodyClass: "font-karla",
  },
];

// Warm, friendly color palettes. Each maps to Tailwind classes defined in tailwind.config.js.
const palettes = [
  {
    id: "retriever",
    name: "Golden Retriever",
    vibe: "Mustard, terracotta & cream",
    swatches: ["bg-retriever-mustard", "bg-retriever-terracotta", "bg-retriever-cream", "bg-retriever-sage", "bg-retriever-brown"],
    nav: "bg-retriever-terracotta text-white",
    hero: "bg-retriever-cream text-retriever-brown",
    cta: "bg-retriever-mustard text-retriever-brown hover:brightness-95",
    card: "bg-white border-retriever-sage/40",
    avatar: "bg-retriever-mustard/30",
    cardBtn: "bg-retriever-terracotta text-white hover:brightness-95",
  },
  {
    id: "peachy",
    name: "Peachy Paws",
    vibe: "Peach, coral & teal",
    swatches: ["bg-peachy-peach", "bg-peachy-coral", "bg-peachy-cream", "bg-peachy-teal", "bg-peachy-charcoal"],
    nav: "bg-peachy-coral text-white",
    hero: "bg-peachy-cream text-peachy-charcoal",
    cta: "bg-peachy-teal text-white hover:brightness-95",
    card: "bg-white border-peachy-peach/50",
    avatar: "bg-peachy-peach/40",
    cardBtn: "bg-peachy-coral text-white hover:brightness-95",
  },
  {
    id: "sunny",
    name: "Sunny Shelter",
    vibe: "Sunflower, pink & teal",
    swatches: ["bg-sunny-yellow", "bg-sunny-orange", "bg-sunny-pink", "bg-sunny-cream", "bg-sunny-deepteal"],
    nav: "bg-sunny-deepteal text-white",
    hero: "bg-sunny-cream text-sunny-deepteal",
    cta: "bg-sunny-orange text-white hover:brightness-95",
    card: "bg-white border-sunny-pink/60",
    avatar: "bg-sunny-yellow/40",
    cardBtn: "bg-sunny-deepteal text-white hover:brightness-95",
  },
  {
    id: "cozy",
    name: "Cozy Blanket",
    vibe: "Red, mustard & forest green",
    swatches: ["bg-cozy-red", "bg-cozy-mustard", "bg-cozy-cream", "bg-cozy-green", "bg-cozy-brown"],
    nav: "bg-cozy-brown text-cozy-cream",
    hero: "bg-cozy-cream text-cozy-brown",
    cta: "bg-cozy-red text-white hover:brightness-95",
    card: "bg-white border-cozy-mustard/50",
    avatar: "bg-cozy-mustard/40",
    cardBtn: "bg-cozy-green text-white hover:brightness-95",
  },
];

const STORAGE_KEY = "furever-home-style-pick";

let state = {
  fontId: fontPairings[0].id,
  paletteId: palettes[0].id,
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.fontId && saved.paletteId) state = saved;
  } catch (e) {
    // ignore corrupt/missing storage
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getFont(id) {
  return fontPairings.find((f) => f.id === id) || fontPairings[0];
}
function getPalette(id) {
  return palettes.find((p) => p.id === id) || palettes[0];
}

function renderPreview() {
  const font = getFont(state.fontId);
  const palette = getPalette(state.paletteId);

  const preview = document.getElementById("preview");
  preview.className = `max-w-5xl mx-auto rounded-3xl shadow-soft border-4 border-white overflow-hidden transition-colors duration-300 ${font.bodyClass}`;

  document.getElementById("preview-nav").className = `flex items-center justify-between px-6 py-4 ${palette.nav}`;
  document.getElementById("preview-logo").className = `text-2xl ${font.headingClass}`;

  document.getElementById("preview-hero").className = `grid sm:grid-cols-2 gap-6 items-center px-6 pb-8 pt-2 ${palette.hero}`;

  document.getElementById("preview-heading").className = `text-4xl sm:text-5xl leading-tight mb-3 ${font.headingClass}`;
  document.getElementById("preview-body").className = `mb-5 text-[15px] leading-relaxed opacity-90 ${font.bodyClass}`;
  document.getElementById("preview-cta").className = `wag px-6 py-3 rounded-full font-semibold shadow-soft ${palette.cta}`;

  document.getElementById("preview-card").className = `rounded-2xl p-5 border-2 ${palette.card}`;
  document.getElementById("preview-avatar").className = `w-16 h-16 rounded-full flex items-center justify-center text-3xl ${palette.avatar}`;
  document.getElementById("preview-pet-name").className = `text-xl leading-none ${font.headingClass}`;
  document.getElementById("preview-card-btn").className = `mt-4 w-full py-2 rounded-full text-sm font-semibold ${palette.cardBtn}`;

  document.getElementById("summary").textContent = `${font.name}, on ${palette.name}`;
}

function renderFontGrid() {
  const grid = document.getElementById("font-grid");
  grid.innerHTML = "";
  fontPairings.forEach((font) => {
    const selected = font.id === state.fontId;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `text-left rounded-2xl p-5 border-2 bg-white transition wag ${
      selected ? "border-stone-800 shadow-soft" : "border-stone-200 hover:border-stone-400"
    }`;
    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs uppercase tracking-wide text-stone-400">${font.vibe}</span>
        ${selected ? '<span class="text-xs font-semibold text-stone-800">Selected ✓</span>' : ""}
      </div>
      <p class="${font.headingClass} text-3xl text-stone-800 mb-1">Every paw deserves a home</p>
      <p class="${font.bodyClass} text-sm text-stone-500">${font.name}</p>
    `;
    card.addEventListener("click", () => {
      state.fontId = font.id;
      saveState();
      renderFontGrid();
      renderPreview();
    });
    grid.appendChild(card);
  });
}

function renderPaletteGrid() {
  const grid = document.getElementById("palette-grid");
  grid.innerHTML = "";
  palettes.forEach((palette) => {
    const selected = palette.id === state.paletteId;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `text-left rounded-2xl p-5 border-2 bg-white transition wag ${
      selected ? "border-stone-800 shadow-soft" : "border-stone-200 hover:border-stone-400"
    }`;
    const swatches = palette.swatches
      .map((s) => `<span class="w-8 h-8 rounded-full border border-black/10 ${s}"></span>`)
      .join("");
    card.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <p class="text-stone-800 font-semibold">${palette.name}</p>
        ${selected ? '<span class="text-xs font-semibold text-stone-800">Selected ✓</span>' : ""}
      </div>
      <div class="flex gap-2 mb-3">${swatches}</div>
      <p class="text-sm text-stone-500">${palette.vibe}</p>
    `;
    card.addEventListener("click", () => {
      state.paletteId = palette.id;
      saveState();
      renderPaletteGrid();
      renderPreview();
    });
    grid.appendChild(card);
  });
}

document.getElementById("reset-btn").addEventListener("click", () => {
  state = { fontId: fontPairings[0].id, paletteId: palettes[0].id };
  saveState();
  renderFontGrid();
  renderPaletteGrid();
  renderPreview();
});

loadState();
renderFontGrid();
renderPaletteGrid();
renderPreview();
