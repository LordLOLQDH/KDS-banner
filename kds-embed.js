(function () {
  'use strict';

  const BANNER_ID = 'kds-central-banner';
  const BANNER_URL = 'https://cdn.jsdelivr.net/gh/LordLOLQDH/KDS-banner@main/kds-banner.html';

  function placeBanner(banner) {
    if (document.getElementById(BANNER_ID)) return;

    const main = document.querySelector('main');
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');

    if (main) {
      const hero = main.querySelector('[class*="hero"], [id*="hero"]');
      if (hero && hero.parentElement === main) hero.insertAdjacentElement('afterend', banner);
      else if (h1 && h1.closest('main') === main) h1.insertAdjacentElement('afterend', banner);
      else main.insertBefore(banner, main.firstChild);
    } else if (h1) h1.insertAdjacentElement('afterend', banner);
    else if (header && header.parentElement) header.insertAdjacentElement('afterend', banner);
    else document.body.insertBefore(banner, document.body.firstChild);
  }

  function loadBanner() {
    if (document.getElementById(BANNER_ID)) return;

    fetch(BANNER_URL, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error('Banner konnte nicht geladen werden');
        return response.text();
      })
      .then(html => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html.trim();
        const banner = wrapper.firstElementChild;
        if (banner) placeBanner(banner);
      })
      .catch(error => console.error('KDS Banner:', error));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBanner, { once: true });
  } else {
    loadBanner();
  }
})();
