// Counts each [data-count-up] figure up from zero the first time it
// scrolls into view. The real number stays in the HTML, so the figure
// still reads correctly without JS or with reduced motion.
const DURATION_MS = 1400;
// Let the stat strip finish rising in before the numbers start rolling
const START_DELAY_MS = 350;

// Tween one figure from 0 to its target, easing out so it lands gently
function countUp(el, target) {
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function initCountUp() {
  const figures = document.querySelectorAll("[data-count-up]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!figures.length || reducedMotion || !("IntersectionObserver" in window)) return;

  const targets = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => countUp(el, targets.get(el)), START_DELAY_MS);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  // Remember each real value, then park the figure at 0 until it's seen
  figures.forEach((el) => {
    const target = Number(el.textContent.trim());
    if (!Number.isFinite(target)) return;
    targets.set(el, target);
    el.textContent = "0";
    observer.observe(el);
  });
}
