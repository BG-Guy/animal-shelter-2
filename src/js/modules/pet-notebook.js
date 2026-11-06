// Turns the pet notebook's pages like a real notebook. Picking a bookmark
// flips leaves over the spine — one leaf per page in between, riffling in
// quick succession — until that pet's spread is open. A sideways swipe
// (touch) or two-finger trackpad swipe turns a single page. On phones the
// notebook shows one page bound at the spiral on its left, so pages swing
// away over the spiral, or swing back in.
// Turning animates copies of the pages: the real target spread opens at
// once underneath, the copies turn on top of it, then they're removed.
// The turn is flat (no perspective, see pet-notebook.css): a leaf narrows
// toward its hinge and opens out on the other side, tinting as it goes.
// Follows the WAI-ARIA tabs pattern: arrow keys / Home / End move between
// bookmarks, and closed pages are hidden from keyboard and screen readers.
const TURN_MS = 800;
// Head start each leaf gets over the next when riffling past several pages
const RIFFLE_GAP_MS = 150;
const SWIPE_PX = 50;
const TRACKPAD_PX = 60;
// Symmetric ease-in-out, so a leaf stands upright exactly halfway through
const TURN_EASING = "cubic-bezier(0.645, 0.045, 0.355, 1)";

const twoPageSpread = window.matchMedia("(min-width: 768px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Modifier classes spelled out in full: Tailwind only keeps styles for
// class names it can find written in the source
const LEAF_KIND = { left: "nb-leaf--left", right: "nb-leaf--right", full: "nb-leaf--full" };
const FACE_SIDE = { front: "nb-leaf-face--front", back: "nb-leaf-face--back" };

// One face of a leaf: a copy of a real page (or whole spread) plus a flat
// tint layer that deepens as the leaf turns edge-on
function leafFace(source, side) {
  const face = document.createElement("div");
  face.className = `nb-leaf-face ${FACE_SIDE[side]}`;
  face.dataset.tone = source.closest(".nb-spread").dataset.tone;

  const copy = source.cloneNode(true);
  ["id", "role", "aria-labelledby"].forEach((attr) => copy.removeAttribute(attr));
  copy.classList.add("is-open");

  const shade = document.createElement("div");
  shade.className = "nb-leaf-shade";

  face.append(copy, shade);
  return face;
}

// A leaf: a sheet hinged on one edge. `kind` is where it sits — the "left"
// or "right" half of a two-page spread (hinged at the spine), or the "full"
// single page on phones (hinged at the spiral on its left edge).
function leaf(kind, front, back) {
  const sheet = document.createElement("div");
  sheet.className = `nb-leaf ${LEAF_KIND[kind]}`;
  sheet.setAttribute("aria-hidden", "true");

  sheet.append(leafFace(front, "front"));
  if (back) sheet.append(leafFace(back, "back"));
  return sheet;
}

// Keyframes for one leaf turning over the spine. Its stacking order swaps
// at the halfway point (when it stands upright) so it lands on top of the
// pages already turned.
function turnOverSpine(endAngle, zLifting, zLanded) {
  const upright = endAngle / 2;
  return [
    { transform: "rotateY(0deg)", zIndex: zLifting },
    { transform: `rotateY(${upright}deg)`, zIndex: zLifting, offset: 0.5 },
    { transform: `rotateY(${upright}deg)`, zIndex: zLanded, offset: 0.5 },
    { transform: `rotateY(${endAngle}deg)`, zIndex: zLanded },
  ];
}

export function initPetNotebook() {
  const tablist = document.getElementById("pet-tabs");
  const track = document.getElementById("pet-pages");
  if (!tablist || !track) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const spreads = [...track.querySelectorAll('[role="tabpanel"]')];
  if (!tabs.length) return;

  let current = 0;
  let activeTurn = null;

  // Mark one bookmark/spread as open; closed spreads are hidden (CSS)
  const select = (index) => {
    current = index;
    tabs.forEach((tab, i) => {
      const isOpen = i === index;
      tab.setAttribute("aria-selected", String(isOpen));
      tab.tabIndex = isOpen ? 0 : -1;
      spreads[i].classList.toggle("is-open", isOpen);
    });
  };

  // Animate turning from one spread to another; returns a handle to stop it
  const animateTurn = (from, to) => {
    const forward = to > from;
    const steps = Math.abs(to - from);
    const temporary = [];
    const running = [];

    const place = (el, z) => {
      el.style.zIndex = z;
      track.append(el);
      temporary.push(el);
      return el;
    };
    const timing = (t) => ({ duration: TURN_MS, delay: t * RIFFLE_GAP_MS, easing: TURN_EASING, fill: "both" });
    const play = (el, frames, t) => running.push(el.animate(frames, timing(t)));

    if (twoPageSpread.matches) {
      // Two-page spreads: leaves turn over the spine, right-to-left going
      // forward, left-to-right going back
      const halves = (i) => spreads[i].querySelectorAll(".nb-page"); // [left page, right page]
      const liftSide = forward ? "right" : "left";
      const landSide = forward ? "left" : "right";

      // The page the leaves land on stays in view until the first one covers it
      place(leaf(landSide, halves(from)[forward ? 0 : 1]), 1);

      for (let t = 0; t < steps; t++) {
        const k = forward ? from + t : from - t;
        const front = halves(k)[forward ? 1 : 0];
        const back = halves(forward ? k + 1 : k - 1)[forward ? 0 : 1];
        const zLifting = 10 + (steps - t) * 2;
        const zLanded = 100 + t * 2;

        const sheet = place(leaf(liftSide, front, back), zLifting);

        play(sheet, turnOverSpine(forward ? -180 : 180, zLifting, zLanded), t);
        play(sheet.querySelector(".nb-leaf-face--front .nb-leaf-shade"), [{ opacity: 0 }, { opacity: 1, offset: 0.5 }, { opacity: 1 }], t);
        play(sheet.querySelector(".nb-leaf-face--back .nb-leaf-shade"), [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }], t);
      }
    } else if (forward) {
      // Phones, forward: each page swings away over the spiral
      for (let t = 0; t < steps; t++) {
        const sheet = place(leaf("full", spreads[from + t]), 10 + steps - t);
        play(sheet, [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-95deg)" }], t);
        play(sheet.querySelector(".nb-leaf-shade"), [{ opacity: 0 }, { opacity: 1 }], t);
      }
    } else {
      // Phones, back: earlier pages swing back in over the open one
      place(leaf("full", spreads[from]), 1);
      for (let t = 0; t < steps; t++) {
        const sheet = place(leaf("full", spreads[from - 1 - t]), 10 + t);
        play(sheet, [{ transform: "rotateY(-95deg)" }, { transform: "rotateY(0deg)" }], t);
        play(sheet.querySelector(".nb-leaf-shade"), [{ opacity: 1 }, { opacity: 0 }], t);
      }
    }

    const cleanUp = () => temporary.forEach((el) => el.remove());
    Promise.all(running.map((animation) => animation.finished)).then(cleanUp, () => {});
    return {
      stop() {
        running.forEach((animation) => animation.cancel());
        cleanUp();
      },
    };
  };

  // Open a pet's spread, turning the pages to get there. A new turn cuts
  // any turn still in progress short.
  const turnTo = (index) => {
    if (index === current || !spreads[index]) return;
    activeTurn?.stop();
    const from = current;
    select(index);
    activeTurn = reducedMotion.matches || !track.animate ? null : animateTurn(from, index);
  };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => turnTo(i)));

  // Arrow keys / Home / End move between bookmarks (wrapping around)
  tablist.addEventListener("keydown", (event) => {
    const targets = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = (targets[event.key] + tabs.length) % tabs.length;
    turnTo(next);
    tabs[next].focus();
  });

  // Touch: a sideways swipe across the page turns one page (vertical
  // swipes still scroll the site — see touch-action in pet-notebook.css)
  let swipeStart = null;
  track.addEventListener("pointerdown", (event) => {
    swipeStart = event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
  });
  track.addEventListener("pointercancel", () => (swipeStart = null));
  track.addEventListener("pointerup", (event) => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    turnTo(current + (dx < 0 ? 1 : -1));
  });

  // Trackpad: a sideways two-finger swipe turns one page. Locked while a
  // page turns so the swipe's momentum doesn't turn several.
  let trackpadX = 0;
  let trackpadLocked = false;
  track.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (trackpadLocked) return;
      trackpadX += event.deltaX;
      if (Math.abs(trackpadX) < TRACKPAD_PX) return;
      turnTo(current + Math.sign(trackpadX));
      trackpadX = 0;
      trackpadLocked = true;
      setTimeout(() => (trackpadLocked = false), TURN_MS);
    },
    { passive: false }
  );

  select(0);
}
