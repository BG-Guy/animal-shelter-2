// The footer is revealed via a pure-CSS curtain effect (see #page-shell and
// #site-footer in src/css/base.css): the shell has a negative bottom margin
// equal to the footer's height, so the sticky footer beneath is only
// uncovered once the shell finishes scrolling past. This module just keeps
// --footer-height in sync with the footer's actual (responsive) height.
export function initRevealFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const setFooterHeight = () => {
    document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
  };

  setFooterHeight();
  window.addEventListener("resize", setFooterHeight);

  if ("ResizeObserver" in window) {
    new ResizeObserver(setFooterHeight).observe(footer);
  }
}
