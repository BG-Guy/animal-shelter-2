export function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const header = document.getElementById("site-header");
  if (!toggle || !menu || !header) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("flex");
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const applyScrollShadow = () => {
    header.classList.toggle("shadow-soft", window.scrollY > 8);
  };
  applyScrollShadow();
  window.addEventListener("scroll", applyScrollShadow, { passive: true });
}
