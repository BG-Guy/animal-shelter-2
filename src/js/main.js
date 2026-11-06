import { initCountUp } from "./modules/count-up.js";
import { initNav } from "./modules/nav.js";
import { initPetNotebook } from "./modules/pet-notebook.js";
import { initRevealFooter } from "./modules/reveal-footer.js";
import { initRevealOnScroll } from "./modules/reveal-on-scroll.js";
import { renderPets } from "./modules/pets.js";

renderPets();
initPetNotebook();
initNav();
initRevealFooter();
initRevealOnScroll();
initCountUp();
