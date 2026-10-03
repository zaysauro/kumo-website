
// Theme: light is the official default; dark is an optional night mode.
const themeToggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('kumo-theme');
if (savedTheme === 'dark') document.body.classList.remove('light-theme'), document.body.classList.add('dark-theme');

const syncThemeButton = () => {
  if (!themeToggle) return;
  const dark = document.body.classList.contains('dark-theme');
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo noturno');
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Modo claro' : 'Modo noturno';
};

themeToggle?.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme', !dark);
  localStorage.setItem('kumo-theme', dark ? 'dark' : 'light');
  syncThemeButton();
});

syncThemeButton();

const header = document.querySelector('#header');
const modal = document.querySelector('[data-client-modal]');
const toast = document.querySelector('[data-toast]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const openModal = () => {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => modal.querySelector('.modal-close')?.focus(), 30);
};

const closeModal = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('[data-client-open]').forEach(btn => btn.addEventListener('click', openModal));
document.querySelectorAll('[data-client-close]').forEach(btn => btn.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('.desktop-nav');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('mobile-open', !open);
  nav.style.display = open ? '' : 'flex';
  nav.style.position = open ? '' : 'fixed';
  nav.style.top = open ? '' : '68px';
  nav.style.left = open ? '' : '14px';
  nav.style.right = open ? '' : '14px';
  nav.style.margin = open ? '' : '0';
  nav.style.padding = open ? '' : '18px';
  nav.style.flexDirection = open ? '' : 'column';
  nav.style.gap = open ? '' : '4px';
  nav.style.background = open ? '' : 'rgba(17,20,24,.97)';
  nav.style.border = open ? '' : '1px solid rgba(255,255,255,.10)';
  nav.style.borderRadius = open ? '' : '18px';
  nav.style.backdropFilter = open ? '' : 'blur(18px)';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelector('[data-contact-message]')?.addEventListener('click', () => {
  toast.textContent = 'Os canais comerciais da Kumo serão configurados em breve.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

// Product destinations are centralized here so they can be changed once when
// the final CRM and Meu Caixa domains are defined.
const PRODUCT_URLS = {
  crm: 'https://crm.sistemakumo.com.br',
  pdv: 'https://caixa.sistemakumo.com.br'
};

document.querySelectorAll('[data-product-link]').forEach(link => {
  const key = link.dataset.productLink;
  if (PRODUCT_URLS[key]) link.href = PRODUCT_URLS[key];
});
