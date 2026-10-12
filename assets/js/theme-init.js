/* Runs synchronously in <head> so the saved/preferred theme is applied before first paint (no light flash in dark mode). Keep in sync with main.js. */
(function () {
  var theme;
  try { theme = localStorage.getItem('mk-theme'); } catch (e) {}
  if (theme !== 'dark' && theme !== 'light') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
