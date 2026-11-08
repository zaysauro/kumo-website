/* Kumo — home: seletor por segmento e menu Produtos.
   Complementa script.js (tema, header, menu mobile, modal), sem substituí-lo. */
(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Seletor "Qual é o seu negócio?" */
  const picker = document.querySelector("[data-picker]");
  if (picker) {
    const buttons = [...picker.querySelectorAll("[data-seg]")];
    const panels = [...picker.querySelectorAll("[data-panel]")];
    const tether = picker.querySelector(".picker-tether");

    const select = (id, focus = false) => {
      buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.seg === id)));
      panels.forEach(p => {
        const active = p.dataset.panel === id;
        p.hidden = !active;
        p.classList.toggle("is-active", active);
        if (active) {
          if (tether) tether.style.setProperty("--p-tether", getComputedStyle(p).getPropertyValue("--p"));
          if (!reduceMotion) {
            p.classList.remove("is-entering");
            void p.offsetWidth;
            p.classList.add("is-entering");
          }
        }
      });
      if (focus) buttons.find(b => b.dataset.seg === id)?.focus();
    };

    buttons.forEach((b, i) => {
      b.addEventListener("click", () => select(b.dataset.seg));
      b.addEventListener("keydown", e => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const next = buttons[(i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length];
        select(next.dataset.seg, true);
      });
    });
  }

  /* Menu "Produtos" no desktop */
  const wrap = document.querySelector(".nav-products");
  const toggle = document.querySelector("[data-products-toggle]");
  const menu = document.querySelector("[data-products-menu]");
  if (wrap && toggle && menu) {
    const isMobile = () => window.matchMedia("(max-width:820px)").matches;
    const setOpen = open => {
      wrap.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => {
      if (isMobile()) return;
      setOpen(!wrap.classList.contains("is-open"));
    });
    document.addEventListener("click", e => {
      if (!wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && wrap.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    wrap.addEventListener("focusout", e => {
      if (!wrap.contains(e.relatedTarget)) setOpen(false);
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  }

  /* Menu mobile: foco preso enquanto aberto (script.js cuida de abrir/fechar). */
  const nav = document.querySelector("#main-nav");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (nav && menuToggle) {
    document.addEventListener("keydown", e => {
      if (e.key !== "Tab" || !nav.classList.contains("mobile-open")) return;
      const items = [menuToggle, ...nav.querySelectorAll("a[href],button:not([disabled])")].filter(el => el.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    nav.querySelectorAll("button[data-client-open]").forEach(b => b.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("mobile-open");
      document.body.classList.remove("menu-open");
    }));
  }
})();
