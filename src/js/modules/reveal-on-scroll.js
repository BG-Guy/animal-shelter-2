// Reveals [data-reveal] blocks the first time they scroll into view by
// adding .is-visible; src/css/motion.css does the actual animating.
// Blocks that arrive in the same batch (a row of cards, the hero on load)
// are numbered in page order via --reveal-order so they land one after
// another. A tall stack on a phone still reveals card by card.
const MAX_STAGGER_STEPS = 6;

export function initRevealOnScroll() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // Entries arrive in observation (= page) order, so a running count
      // gives each newly visible block its place in this batch.
      let order = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--reveal-order", Math.min(order++, MAX_STAGGER_STEPS));
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    // Trigger once a block's top edge is 10% clear of the viewport bottom
    { rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
