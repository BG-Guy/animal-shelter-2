// The footer is revealed via a pure-CSS curtain effect (see #page-shell,
// #footer-spacer, and #site-footer in src/css/base.css): the footer is
// position: fixed, so #page-shell (opaque, higher z-index) covers it until
// the shell finishes scrolling past, and #footer-spacer reserves the scroll
// room the fixed footer no longer occupies in flow. A negative margin on
// #page-shell with position: sticky on the footer looks equivalent but
// never actually reveals anything: since the footer is the last thing on
// the page, the scroll position where a sticky footer would "unstick" and
// the page's absolute scroll end are the same point, so it never gets a
// chance to be unstuck-and-visible before scrolling simply stops. This
// module just keeps --footer-height (and #footer-spacer's height with it)
// in sync with the footer's actual, responsive height.
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
