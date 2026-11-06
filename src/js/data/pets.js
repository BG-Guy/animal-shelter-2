// Adoptable pets shown in the "Looking for a home" notebook. Each pet gets
// a bookmark tab and its own notebook page. `photos` are the extra
// snapshots stuck on that page: a photo of the same pet (`src`, `alt`), plus
// a handwritten caption (drawn from the blurb); `prop` is the emoji fallback. `photo` is the pet's
// portrait in images/ (pet-<name>.webp, and pet-<name>-tab.webp for its tab).
export const pets = [
  {
    name: "Buddy",
    photo: "images/pet-buddy.webp",
    photoAlt: "Buddy, a yellow Labrador mix, sitting with a tennis ball in his mouth",
    species: "Dog",
    breed: "Labrador mix",
    age: "2 yrs",
    emoji: "🐶",
    blurb: "Loves belly rubs, tennis balls, and greeting everyone like an old friend.",
    photos: [
      { prop: "🎾", caption: "tennis ball champ", src: "images/pet-buddy-snap-a.webp", alt: "Buddy lying on a blanket with an orange tennis ball between his paws" },
      { prop: "💛", caption: "belly rubs, please", src: "images/pet-buddy-snap-b.webp", alt: "Buddy on his back on a blanket, paws up, asking for belly rubs" },
    ],
  },
  {
    name: "Willow",
    photo: "images/pet-willow.webp",
    photoAlt: "Willow, an orange-and-grey tabby cat, sitting with a calm, watchful look",
    species: "Cat",
    breed: "Tabby",
    age: "1 yr",
    emoji: "🐱",
    blurb: "A sunbeam-chaser who'll happily supervise you from the nearest windowsill.",
    photos: [
      { prop: "☀️", caption: "sunbeam patrol", src: "images/pet-willow-snap-a.webp", alt: "Willow asleep in a patch of sunlight" },
      { prop: "🪟", caption: "window supervisor", src: "images/pet-willow-snap-b.webp", alt: "Willow sitting on a windowsill, looking outside" },
    ],
  },
  {
    name: "Biscuit",
    photo: "images/pet-biscuit.webp",
    photoAlt: "Biscuit, a tricolor Beagle mix, sitting with one paw raised to shake",
    species: "Dog",
    breed: "Beagle mix",
    age: "4 yrs",
    emoji: "🐕",
    blurb: "Gentle, food-motivated, and already knows sit, stay, and shake.",
    photos: [
      { prop: "🦴", caption: "will sit for snacks", src: "images/pet-biscuit-snap-a.webp", alt: "Biscuit sitting perfectly still for a treat held above his nose" },
      { prop: "🐾", caption: "shake? done.", src: "images/pet-biscuit-snap-b.webp", alt: "Biscuit placing his paw in a person’s hand" },
    ],
  },
  {
    name: "Clover",
    photo: "images/pet-clover.webp",
    photoAlt: "Clover, a Holland Lop rabbit with floppy ears and a cream-and-brown coat",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "8 mo",
    emoji: "🐰",
    blurb: "Quiet and curious — perfect for a calm home with a little garden.",
    photos: [
      { prop: "🌿", caption: "garden explorer", src: "images/pet-clover-snap-a.webp", alt: "Clover hopping through grass and clover leaves" },
      { prop: "🍃", caption: "quiet & curious", src: "images/pet-clover-snap-b.webp", alt: "Clover sitting still, sniffing the air" },
    ],
  },
];
