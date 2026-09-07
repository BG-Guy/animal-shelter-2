import { pets } from "../data/pets.js";

function petCard(pet) {
  const card = document.createElement("article");
  card.className =
    "wag bg-brand-surface rounded-3xl p-6 border border-brand-border shadow-soft flex flex-col";
  card.innerHTML = `
    <div class="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center text-4xl mb-4">
      ${pet.emoji}
    </div>
    <h3 class="font-heading text-heading-3 text-brand-text leading-none mb-1">${pet.name}</h3>
    <p class="text-sm text-brand-text-muted mb-3">${pet.breed} · ${pet.age}</p>
    <p class="text-sm text-brand-text/90 mb-5 flex-1">${pet.blurb}</p>
    <button type="button" class="w-full py-2 rounded-full text-sm font-semibold bg-brand-secondary text-brand-secondary-contrast hover:brightness-95 transition">
      Meet ${pet.name}
    </button>
  `;
  return card;
}

export function renderPets() {
  const grid = document.getElementById("pets-grid");
  if (!grid) return;
  pets.forEach((pet) => grid.appendChild(petCard(pet)));
}
