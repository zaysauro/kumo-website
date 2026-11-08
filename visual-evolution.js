/* Kumo — Etapa 3: Glass Tabs (navegação) e Morph Cards (produtos).
   Complementa script.js sem alterá-lo: tema, header, menu mobile e modal continuam lá. */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- GLASS TABS ---------- */
  const nav = document.querySelector(".glass-tabs");
  const lens = nav?.querySelector(".glass-lens");
  if (nav && lens) {
    const links = [...nav.querySelectorAll("a")];
    const desktop = window.matchMedia("(min-width:821px)");
    let active = null;   // link da seção visível
    let target = null;   // link sob a lente agora
    let glint = 200;

    const place = (link) => {
      if (!desktop.matches) return;
      if (!link) { nav.classList.remove("has-lens"); links.forEach(l => l.classList.remove("is-lensed")); target = null; return; }
      const navBox = nav.getBoundingClientRect();
      const box = link.getBoundingClientRect();
      const moved = target && target !== link;
      nav.style.setProperty("--lens-x", `${box.left - navBox.left}px`);
      nav.style.setProperty("--lens-w", `${box.width}px`);
      glint = (glint + (moved ? 70 : 0)) % 360;
      lens.style.setProperty("--glint", `${glint}deg`);
      links.forEach(l => l.classList.toggle("is-lensed", l === link));
      if (moved && !reduce) {
        nav.classList.remove("is-moving"); void lens.offsetWidth; nav.classList.add("is-moving");
      }
      nav.classList.add("has-lens");
      target = link;
    };

    links.forEach(link => {
      link.addEventListener("pointerenter", () => place(link));
      link.addEventListener("focus", () => place(link));
    });
    nav.addEventListener("pointerleave", () => place(active));
    nav.addEventListener("focusout", e => { if (!nav.contains(e.relatedTarget)) place(active); });
    lens.addEventListener("animationend", () => nav.classList.remove("is-moving"));

    /* A lente acompanha a seção visível (só para links internos #...). */
    const byId = new Map(links.filter(l => l.hash && l.getAttribute("href").startsWith("#")).map(l => [l.hash.slice(1), l]));
    const sections = [...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      const visible = new Map();
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        const best = [...visible.entries()].filter(([, r]) => r > 0).sort((a, b) => b[1] - a[1])[0];
        active = best ? byId.get(best[0]) : null;
        if (!nav.matches(":hover") && !nav.contains(document.activeElement)) place(active);
      }, { rootMargin: "-35% 0px -45% 0px", threshold: [0, .25, .5, .75, 1] });
      sections.forEach(s => io.observe(s));
    }
    window.addEventListener("resize", () => place(target || active), { passive: true });
    document.fonts?.ready.then(() => place(target || active));
  }

  /* ---------- MORPH CARDS ---------- */
  const rail = document.querySelector("[data-morph]");
  if (rail) {
    const cards = [...rail.querySelectorAll("[data-morph-card]")];
    const heads = cards.map(c => c.querySelector(".morph-head"));
    const wide = window.matchMedia("(min-width:960px)");
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)");
    let hoverTimer = 0;

    const open = (card, { focus = false } = {}) => {
      cards.forEach(c => {
        const isOpen = c === card;
        c.classList.toggle("is-open", isOpen);
        const head = c.querySelector(".morph-head");
        const body = c.querySelector(".morph-body");
        head.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) body.removeAttribute("inert"); else body.setAttribute("inert", "");
      });
      if (focus) card.querySelector(".morph-head").focus();
    };

    cards.forEach((card, i) => {
      const head = heads[i];
      head.addEventListener("click", () => {
        /* No celular, tocar no card aberto fecha; no desktop sempre há um aberto. */
        if (card.classList.contains("is-open") && !wide.matches) {
          card.classList.remove("is-open");
          head.setAttribute("aria-expanded", "false");
          card.querySelector(".morph-body").setAttribute("inert", "");
          return;
        }
        open(card);
      });
      head.addEventListener("keydown", e => {
        const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = cards[(i + keys[e.key] + cards.length) % cards.length];
        open(next, { focus: true });
      });
      /* Desktop com mouse: passar o cursor sobre uma coluna fechada abre o card (com pequena intenção). */
      card.addEventListener("pointerenter", () => {
        if (!wide.matches || !fine.matches || card.classList.contains("is-open")) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => open(card), 140);
      });
      card.addEventListener("pointerleave", () => clearTimeout(hoverTimer));
      /* Clique em qualquer ponto de uma coluna fechada também abre. */
      card.addEventListener("click", e => {
        if (!card.classList.contains("is-open") && wide.matches && !e.target.closest(".morph-head")) open(card);
      });
    });

    open(cards.find(c => c.classList.contains("is-open")) || cards[0]);
  }
})();
