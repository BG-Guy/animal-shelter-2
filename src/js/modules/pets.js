import { pets } from "../data/pets.js";

const TILTS = ["-3deg", "2deg", "-1.5deg", "2.5deg"];

function petCard(pet, index) {
  const card = document.createElement("article");
  card.className = "cork-card";
  card.style.setProperty("--tilt", TILTS[index % TILTS.length]);
  card.innerHTML = `
    <div class="cork-card-board">
      <div class="cork-pin" aria-hidden="true"></div>
      <div class="cork-photo">
        <div class="cork-photo-frame" aria-hidden="true">${pet.emoji}</div>
      </div>
      <div class="bg-brand-bg/95 rounded-xl p-4 flex flex-col shadow-soft">
        <h3 class="font-heading text-heading-3 text-brand-text leading-none mb-1">${pet.name}</h3>
        <p class="text-sm text-brand-text-muted mb-3">${pet.breed} · ${pet.age}</p>
        <p class="text-sm text-brand-text/90 mb-4 flex-1">${pet.blurb}</p>
        <button type="button" class="w-full py-2 rounded-full text-sm font-semibold bg-brand-secondary text-brand-secondary-contrast hover:brightness-95 transition">
          Meet ${pet.name}
        </button>
      </div>
    </div>
  `;
  return card;
}

export function renderPets() {
  const grid = document.getElementById("pets-grid");
  if (!grid) return;
  pets.forEach((pet, index) => grid.appendChild(petCard(pet, index)));
}
