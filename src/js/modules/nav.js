export function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const close = document.getElementById("nav-close");
  const menu = document.getElementById("nav-menu");
  const backdrop = document.getElementById("nav-backdrop");
  const header = document.getElementById("site-header");
  if (!toggle || !menu || !backdrop || !header) return;

  const openMenu = () => {
    menu.classList.remove("translate-x-full");
    menu.setAttribute("aria-hidden", "false");
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  };

  const closeMenu = () => {
    menu.classList.add("translate-x-full");
    menu.setAttribute("aria-hidden", "true");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  };

  toggle.addEventListener("click", openMenu);
  close?.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  const applyScrollShadow = () => {
    header.classList.toggle("shadow-soft", window.scrollY > 8);
  };
  applyScrollShadow();
  window.addEventListener("scroll", applyScrollShadow, { passive: true });
}
