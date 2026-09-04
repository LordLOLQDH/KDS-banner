(function () {
  'use strict';

  const BANNER_ID = 'kds-central-banner';

  function injectBanner() {
    if (document.getElementById(BANNER_ID)) return;

    const style = document.createElement('style');
    style.id = BANNER_ID + '-style';
    style.textContent = `
      #${BANNER_ID} { box-sizing:border-box; width:100%; margin:28px 0; padding:0; font-family:Inter,Arial,Helvetica,sans-serif; color:#fff; }
      #${BANNER_ID} *, #${BANNER_ID} *::before, #${BANNER_ID} *::after { box-sizing:border-box; }
      #${BANNER_ID} .kds-inner { position:relative; overflow:hidden; width:100%; border:1px solid rgba(255,128,0,.35); border-radius:18px; padding:30px; background:linear-gradient(135deg,#0b0b0b,#151515 55%,#0b0b0b); box-shadow:0 14px 40px rgba(0,0,0,.25); }
      #${BANNER_ID} .kds-inner::before { content:''; position:absolute; top:-100px; right:-80px; width:260px; height:260px; border-radius:50%; background:rgba(255,128,0,.12); filter:blur(20px); pointer-events:none; }
      #${BANNER_ID} .kds-content { position:relative; z-index:1; }
      #${BANNER_ID} .kds-brand { margin:0 0 8px; font-size:14px; font-weight:800; letter-spacing:.04em; }
      #${BANNER_ID} .kds-badge { display:inline-block; margin-bottom:10px; color:#ff8a00; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
      #${BANNER_ID} .kds-title { margin:0 0 9px; font-size:clamp(23px,4vw,34px); line-height:1.1; font-weight:800; letter-spacing:-.02em; }
      #${BANNER_ID} .kds-title span { color:#ff8a00; }
      #${BANNER_ID} .kds-text { max-width:720px; margin:0 0 18px; color:#cfcfcf; font-size:14px; line-height:1.55; }
      #${BANNER_ID} .kds-button { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:0 18px; border-radius:9px; background:#ff8a00; color:#111; font-size:13px; font-weight:800; text-decoration:none; transition:transform .2s,background .2s; }
      #${BANNER_ID} .kds-button:hover { transform:translateY(-1px); background:#ff9d2e; }
      #${BANNER_ID} .kds-company { margin-top:15px; color:#8e8e8e; font-size:11px; }
      @media(max-width:700px) { #${BANNER_ID} .kds-inner { padding:23px 19px; border-radius:14px; } #${BANNER_ID} .kds-button { width:100%; } }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('aside');
    banner.id = BANNER_ID;
    banner.setAttribute('aria-label', 'Kraus Digital Solutions');
    banner.innerHTML = `
      <div class="kds-inner">
        <div class="kds-content">
          <div class="kds-brand">Kraus Digital Solutions</div>
          <div class="kds-badge">DIGITAL INSIGHTS</div>
          <h2 class="kds-title">ANGEBOT FÜR <span>TESTKUNDEN</span></h2>
          <p class="kds-text">Diese Website wurde von Kraus Digital Solutions erstellt. Sie möchten ebenfalls eine professionelle Website? Für ausgewählte Testkunden bieten wir attraktive Konditionen.</p>
          <a class="kds-button" href="https://kraus-digital-solutions.base44.app/kontakt" target="_blank" rel="noopener noreferrer">Unverbindlich informieren →</a>
          <div class="kds-company">Kraus Digital Solutions · Adam Gabriel Kraus</div>
        </div>
      </div>
    `;

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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectBanner, { once:true });
  else injectBanner();
})();