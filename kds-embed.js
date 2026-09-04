(function () {
  'use strict';

  const BANNER_ID = 'kds-central-banner';

  function injectBanner() {
    if (document.getElementById(BANNER_ID)) return;

    const style = document.createElement('style');
    style.id = BANNER_ID + '-style';
    style.textContent = `
      #${BANNER_ID} {
        box-sizing: border-box;
        width: 100%;
        margin: 28px 0;
        padding: 0;
        font-family: Inter, Arial, Helvetica, sans-serif;
        color: #ffffff;
      }

      #${BANNER_ID} *,
      #${BANNER_ID} *::before,
      #${BANNER_ID} *::after {
        box-sizing: border-box;
      }

      #${BANNER_ID} .kds-inner {
        position: relative;
        overflow: hidden;
        width: 100%;
        border: 1px solid rgba(255, 128, 0, 0.35);
        border-radius: 18px;
        padding: 32px;
        background: linear-gradient(135deg, #0b0b0b 0%, #151515 55%, #0b0b0b 100%);
        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
      }

      #${BANNER_ID} .kds-inner::before {
        content: '';
        position: absolute;
        top: -100px;
        right: -80px;
        width: 260px;
        height: 260px;
        border-radius: 50%;
        background: rgba(255, 128, 0, 0.12);
        filter: blur(20px);
        pointer-events: none;
      }

      #${BANNER_ID} .kds-content {
        position: relative;
        z-index: 1;
      }

      #${BANNER_ID} .kds-badge {
        display: inline-block;
        margin-bottom: 12px;
        padding: 6px 10px;
        border: 1px solid rgba(255, 128, 0, 0.45);
        border-radius: 999px;
        color: #ff8a00;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      #${BANNER_ID} .kds-title {
        margin: 0 0 10px;
        font-size: clamp(24px, 4vw, 38px);
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -0.02em;
      }

      #${BANNER_ID} .kds-title span {
        color: #ff8a00;
      }

      #${BANNER_ID} .kds-text {
        max-width: 760px;
        margin: 0 0 22px;
        color: #cfcfcf;
        font-size: 15px;
        line-height: 1.65;
      }

      #${BANNER_ID} .kds-services {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin: 0 0 24px;
      }

      #${BANNER_ID} .kds-service {
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.035);
      }

      #${BANNER_ID} .kds-service-number {
        display: block;
        margin-bottom: 6px;
        color: #ff8a00;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
      }

      #${BANNER_ID} .kds-service-title {
        margin: 0 0 5px;
        font-size: 14px;
        font-weight: 700;
      }

      #${BANNER_ID} .kds-service-text {
        margin: 0;
        color: #a9a9a9;
        font-size: 12px;
        line-height: 1.5;
      }

      #${BANNER_ID} .kds-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        flex-wrap: wrap;
      }

      #${BANNER_ID} .kds-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 0 20px;
        border-radius: 10px;
        background: #ff8a00;
        color: #111111;
        font-size: 14px;
        font-weight: 800;
        text-decoration: none;
        transition: transform 0.2s ease, background 0.2s ease;
      }

      #${BANNER_ID} .kds-button:hover {
        transform: translateY(-1px);
        background: #ff9d2e;
      }

      #${BANNER_ID} .kds-company {
        color: #8e8e8e;
        font-size: 12px;
      }

      @media (max-width: 700px) {
        #${BANNER_ID} .kds-inner {
          padding: 24px 20px;
          border-radius: 14px;
        }

        #${BANNER_ID} .kds-services {
          grid-template-columns: 1fr;
        }

        #${BANNER_ID} .kds-actions {
          align-items: stretch;
        }

        #${BANNER_ID} .kds-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('aside');
    banner.id = BANNER_ID;
    banner.setAttribute('aria-label', 'Kraus Digital Solutions');
    banner.innerHTML = `
      <div class="kds-inner">
        <div class="kds-content">
          <div class="kds-badge">Digital Insights</div>
          <h2 class="kds-title">ANGEBOT FÜR <span>TESTKUNDEN</span></h2>
          <p class="kds-text">
            Diese Website wurde von Kraus Digital Solutions erstellt. Sie möchten ebenfalls eine professionelle Website?
            Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche
            Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.
          </p>

          <div class="kds-services">
            <div class="kds-service">
              <span class="kds-service-number">01</span>
              <h3 class="kds-service-title">Neue Websites</h3>
              <p class="kds-service-text">Professionelle Websites – modern, klar strukturiert und auf eine überzeugende Nutzererfahrung ausgerichtet.</p>
            </div>
            <div class="kds-service">
              <span class="kds-service-number">02</span>
              <h3 class="kds-service-title">Redesign</h3>
              <p class="kds-service-text">Bestehende Websites werden modernisiert, strukturell überarbeitet und zeitgemäß neu gestaltet.</p>
            </div>
            <div class="kds-service">
              <span class="kds-service-number">03</span>
              <h3 class="kds-service-title">Optimierung</h3>
              <p class="kds-service-text">Gezielte Verbesserungen für Performance, Nutzerfreundlichkeit und eine professionelle Online-Präsenz.</p>
            </div>
          </div>

          <div class="kds-actions">
            <a class="kds-button" href="https://kraus-digital-solutions.base44.app/kontakt" target="_blank" rel="noopener noreferrer">
              Unverbindlich informieren →
            </a>
            <div class="kds-company">Kraus Digital Solutions · Adam Gabriel Kraus</div>
          </div>
        </div>
      </div>
    `;

    const main = document.querySelector('main');
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');

    if (main) {
      const hero = main.querySelector('[class*="hero"], [id*="hero"]');
      if (hero && hero.parentElement === main) {
        hero.insertAdjacentElement('afterend', banner);
      } else if (h1 && h1.closest('main') === main) {
        h1.insertAdjacentElement('afterend', banner);
      } else {
        main.insertBefore(banner, main.firstChild);
      }
    } else if (h1) {
      h1.insertAdjacentElement('afterend', banner);
    } else if (header && header.parentElement) {
      header.insertAdjacentElement('afterend', banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBanner, { once: true });
  } else {
    injectBanner();
  }
})();
