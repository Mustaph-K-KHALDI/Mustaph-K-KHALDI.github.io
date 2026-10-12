(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const menu = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#main-nav');
  const THEME_KEY = 'mk-theme';

  /* Theme: theme-init.js applies the initial value before paint; this wires the toggle. */
  let stored;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }

  applyTheme(stored === 'dark' || stored === 'light' ? stored : preferred);

  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });

  /* Mobile menu: click toggles; Escape, outside click, link click, or growing past the mobile breakpoint close it. */
  if (!menu || !nav) return;

  const isOpen = () => nav.classList.contains('open');

  function setMenu(open, returnFocus) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (!open && returnFocus) menu.focus();
  }

  menu.addEventListener('click', () => setMenu(!isOpen()));

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setMenu(false, true);
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target) && !menu.contains(event.target)) setMenu(false);
  });

  window.matchMedia('(max-width: 720px)').addEventListener('change', (event) => {
    if (!event.matches) setMenu(false);
  });
})();
