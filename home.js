/* Kumo — home: tema, header, menu, Área do cliente e revelação ao rolar. Sem framework. */
(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.getElementById("header");
  const nav = document.getElementById("main-nav");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const modal = document.querySelector("[data-client-modal]");
  const panel = modal?.querySelector(".modal-panel");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 960px)");
  const focusables = el => [...el.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(n => n.offsetParent !== null);

  /* Tema: mesma chave da versão anterior (kumo-theme). */
  const syncTheme = () => {
    const dark = root.dataset.theme === "dark";
    themeBtn?.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo noturno");
  };
  themeBtn?.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark"; else delete root.dataset.theme;
    try { localStorage.setItem("kumo-theme", dark ? "dark" : "light"); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  /* Header ganha linha ao rolar. */
  let ticking = false;
  const onScroll = () => { header?.classList.toggle("scrolled", window.scrollY > 8); ticking = false; };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, {passive: true});
  onScroll();

  /* Menu mobile: coluna em tela cheia, fecha com ESC, link ou ao virar desktop; prende o foco. */
  const setMenu = open => {
    menuBtn?.setAttribute("aria-expanded", String(open));
    menuBtn?.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav?.classList.toggle("open", open);
    body.classList.toggle("menu-open", open);
    if (open) requestAnimationFrame(() => nav?.querySelector("a")?.focus());
  };
  const menuOpen = () => menuBtn?.getAttribute("aria-expanded") === "true";
  menuBtn?.addEventListener("click", () => setMenu(!menuOpen()));
  nav?.querySelectorAll("a, button").forEach(el => el.addEventListener("click", () => menuOpen() && setMenu(false)));
  mobile.addEventListener?.("change", e => { if (!e.matches) setMenu(false); });

  /* Área do cliente. */
  let lastFocus = null;
  const openModal = () => {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    requestAnimationFrame(() => focusables(panel)[0]?.focus());
  };
  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    lastFocus?.focus?.();
  };
  document.querySelectorAll("[data-client-open]").forEach(b => b.addEventListener("click", openModal));
  document.querySelectorAll("[data-client-close]").forEach(b => b.addEventListener("click", closeModal));

  const trap = (container, e) => {
    const list = focusables(container);
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener("keydown", e => {
    const modalOpen = modal && !modal.hidden;
    if (e.key === "Escape") {
      if (modalOpen) closeModal();
      else if (menuOpen()) { setMenu(false); menuBtn?.focus(); }
    }
    if (e.key !== "Tab") return;
    if (modalOpen) trap(panel, e);
    else if (menuOpen() && header) trap(header, e);
  });

  /* Revelação suave das seções abaixo da dobra. */
  const items = document.querySelectorAll(".statement, .sec-head, .prod, .soon-row, .sites-in, .svc, .process, .about-in, .contact");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), {rootMargin: "0px 0px -8% 0px", threshold: 0.08});
    items.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("rv");
      io.observe(el);
    });
  }
})();
