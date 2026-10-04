/* Kumo — interaction layer. No framework required. */
const PRODUCT_URLS = {
  crm: "https://crm.sistemakumo.com.br",
  pdv: "https://meucaixa.sistemakumo.com.br"
};

const root = document.documentElement;
const body = document.body;
const header = document.querySelector("#header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("#main-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");
const modal = document.querySelector("[data-client-modal]");
const modalPanel = modal?.querySelector(".modal-panel");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Theme — light is the official Kumo default. */
const savedTheme = localStorage.getItem("kumo-theme");
if (savedTheme === "dark") {
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
}

function syncThemeButton() {
  if (!themeToggle) return;
  const dark = body.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo noturno");
  themeToggle.querySelector(".theme-label").textContent = dark ? "Modo claro" : "Modo noturno";
  themeToggle.querySelector(".theme-icon").setAttribute("data-dark", dark ? "true" : "false");
}
syncThemeButton();

themeToggle?.addEventListener("click", () => {
  const dark = !body.classList.contains("dark-theme");
  body.classList.toggle("dark-theme", dark);
  body.classList.toggle("light-theme", !dark);
  localStorage.setItem("kumo-theme", dark ? "dark" : "light");
  syncThemeButton();
});

/* Header state — one passive scroll listener. */
let ticking = false;
function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 16);
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}, { passive: true });
updateHeader();

/* Mobile navigation — full-screen, keyboard-friendly. */
function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("mobile-open");
  body.classList.remove("menu-open");
}
menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("mobile-open", !open);
  body.classList.toggle("menu-open", !open);
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

/* Reveal-on-scroll. Content remains visible if JS is unavailable. */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

/* Product links are sourced from one object. */
document.querySelectorAll("[data-product-link]").forEach(link => {
  const key = link.dataset.productLink;
  if (PRODUCT_URLS[key]) link.href = PRODUCT_URLS[key];
});

/* Subtle pointer tilt — transform only, desktop pointer devices. */
if (!prefersReducedMotion && window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = "";
      });
    };
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = Math.max(-3, Math.min(3, -y * 5));
      const rotateY = Math.max(-3, Math.min(3, x * 5));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    card.addEventListener("pointerleave", reset);
  });
}

/* Client modal with focus trap and ESC. */
let lastFocused = null;
let modalOpen = false;

function getFocusable(container) {
  return [...container.querySelectorAll(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  )];
}

function openModal() {
  if (!modal || modalOpen) return;
  lastFocused = document.activeElement;
  modalOpen = true;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  const focusable = getFocusable(modalPanel);
  requestAnimationFrame(() => focusable[0]?.focus());
}

function closeModal() {
  if (!modal || !modalOpen) return;
  modalOpen = false;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  lastFocused?.focus?.();
}

document.querySelectorAll("[data-client-open]").forEach(button => button.addEventListener("click", openModal));
document.querySelectorAll("[data-client-close]").forEach(button => button.addEventListener("click", closeModal));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (modalOpen) closeModal();
    if (nav?.classList.contains("mobile-open")) closeMenu();
  }
  if (event.key !== "Tab" || !modalOpen) return;
  const focusable = getFocusable(modalPanel);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* Close mobile menu if the viewport becomes desktop-sized. */
window.matchMedia("(min-width:821px)").addEventListener?.("change", event => {
  if (event.matches) closeMenu();
});
