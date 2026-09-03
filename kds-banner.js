(() => {
  "use strict";

  const script = document.currentScript;
  if (!script) return;

  const customer = script.dataset.customer || "unknown";
  const mode = script.dataset.mode || "both";
  const configUrl =
    script.dataset.config ||
    "https://lordlolqdh.github.io/KDS-banner/config.json";

  const defaults = {
    brand: "Kraus Digital Solutions",
    eyebrow: "DIGITAL INSIGHTS",
    badge: "TESTKUNDEN-RABATT",
    title: "Du brauchst auch eine Website?",
    text:
      "Diese Website wurde von Kraus Digital Solutions gemacht. Für unsere ersten Testkunden gibt es einen starken Rabatt – im Gegenzug für eine ehrliche Bewertung. Begrenzte Plätze.",
    button: "Testkunden-Rabatt sichern →",
    link: "https://kraus-digital-solutions.base44.app/",
    popup: true,
    banner: true
  };

  const css = `
    .kds-root, .kds-root * { box-sizing: border-box; }
    .kds-root {
      --kds-orange: #ff6a00;
      --kds-bg: #0b0b0b;
      --kds-panel: #101010;
      --kds-border: #292929;
      --kds-text: #f5f5f5;
      --kds-muted: #c8c8c8;
      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--kds-text);
    }
    .kds-banner {
      width: min(100% - 24px, 720px);
      margin: 28px auto;
      padding: 28px 20px 24px;
      background: var(--kds-panel);
      border: 1px solid var(--kds-border);
      border-top: 3px solid var(--kds-orange);
      border-bottom: 3px solid var(--kds-orange);
      border-radius: 14px;
      box-shadow: 0 12px 35px rgba(0,0,0,.22);
    }
    .kds-brand {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -.02em;
      margin-bottom: 4px;
    }
    .kds-brand span { color: var(--kds-orange); }
    .kds-eyebrow {
      font-size: 10px;
      letter-spacing: .18em;
      color: #fff;
      margin-bottom: 34px;
    }
    .kds-badge {
      color: var(--kds-orange);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .16em;
      margin-bottom: 12px;
    }
    .kds-title {
      margin: 0 0 16px;
      font-size: clamp(26px, 5vw, 42px);
      line-height: .98;
      letter-spacing: -.035em;
      font-weight: 850;
    }
    .kds-title span { color: var(--kds-orange); }
    .kds-text {
      margin: 0 0 22px;
      color: var(--kds-muted);
      font-size: 14px;
      line-height: 1.65;
    }
    .kds-items { display: grid; gap: 8px; margin: 0 0 22px; }
    .kds-item {
      padding: 13px 14px;
      border: 1px solid #303030;
      border-radius: 8px;
      background: #121212;
    }
    .kds-item strong {
      display: block;
      color: var(--kds-orange);
      font-size: 11px;
      margin-bottom: 4px;
    }
    .kds-item small { color: #ddd; font-size: 11px; line-height: 1.45; }
    .kds-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      width: 100%;
      padding: 12px 18px;
      border-radius: 12px;
      background: var(--kds-orange);
      color: #fff !important;
      text-decoration: none !important;
      font-weight: 800;
      font-size: 13px;
      transition: transform .15s ease, filter .15s ease;
    }
    .kds-button:hover { transform: translateY(-1px); filter: brightness(1.06); }
    .kds-credit { margin: 22px 0 0; font-size: 11px; line-height: 1.5; }
    .kds-credit strong { display:block; color:#fff; }
    .kds-credit span { color:var(--kds-orange); }

    .kds-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(0,0,0,.76);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
    }
    .kds-popup {
      position: relative;
      width: min(100%, 760px);
      max-height: min(90vh, 760px);
      overflow: auto;
      background: #0d0d0d;
      border: 1px solid #292929;
      border-top: 3px solid var(--kds-orange);
      border-bottom: 3px solid var(--kds-orange);
      border-radius: 20px;
      padding: 42px 28px 30px;
      box-shadow: 0 25px 80px rgba(0,0,0,.55);
    }
    .kds-close {
      position:absolute;
      top:14px;
      right:14px;
      width:42px;
      height:42px;
      border:0;
      border-radius:50%;
      background:#1c1c1c;
      color:#ddd;
      font-size:28px;
      line-height:1;
      cursor:pointer;
    }
    .kds-popup .kds-title { font-size: clamp(34px, 7vw, 58px); }
    .kds-popup .kds-text { font-size: clamp(15px, 2.3vw, 20px); }
    .kds-popup .kds-button { width:auto; min-width:min(100%, 420px); font-size:17px; }
    .kds-no-thanks {
      display:block;
      width:max-content;
      margin:20px auto 0;
      border:0;
      background:none;
      color:#8e8e8e;
      text-decoration:underline;
      cursor:pointer;
      font-size:14px;
    }
    body.kds-lock { overflow:hidden !important; }
    @media (max-width: 520px) {
      .kds-popup { padding:42px 20px 25px; border-radius:18px; }
      .kds-banner { padding:24px 18px 22px; }
      .kds-eyebrow { margin-bottom:28px; }
    }
  `;

  function loadStyle() {
    if (document.getElementById("kds-banner-style")) return;
    const style = document.createElement("style");
    style.id = "kds-banner-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[ch]));
  }

  function titleHtml(title) {
    const safe = escapeHtml(title);
    const parts = safe.split(/(Website\?)/i);
    return parts.map((part, i) =>
      /Website\?/i.test(part) ? "<span>" + part + "</span>" : part
    ).join("");
  }

  function content(c, popup = false) {
    return `
      ${popup ? '<button class="kds-close" type="button" aria-label="Schließen">×</button>' : ""}
      <div class="kds-brand">Kraus <span>Digital Solutions</span></div>
      <div class="kds-eyebrow">${escapeHtml(c.eyebrow)}</div>
      <div class="kds-badge">${escapeHtml(c.badge)}</div>
      <h2 class="kds-title">${titleHtml(c.title)}</h2>
      <p class="kds-text">${escapeHtml(c.text)}</p>
      <div class="kds-items">
        <div class="kds-item"><strong>01 — Neue Websites</strong><small>Von null auf online – modern, schnell & conversion-orientiert.</small></div>
        <div class="kds-item"><strong>02 — Redesign</strong><small>Alt wird neu. Wir ersetzen veraltete Websites durch moderne, die funktionieren.</small></div>
        <div class="kds-item"><strong>03 — Optimierung</strong><small>Schneller, besser, mehr Kunden – systematisch verbessert.</small></div>
      </div>
      <a class="kds-button" href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.button)}</a>
      <div class="kds-credit"><strong>Adam Gabriel Kraus</strong><span>Kraus Digital Solutions</span></div>
    `;
  }

  function renderBanner(c) {
    if (!c.banner || document.querySelector("[data-kds-banner]")) return;
    const host = document.createElement("div");
    host.className = "kds-root";
    host.dataset.kdsBanner = customer;
    host.innerHTML = '<section class="kds-banner" aria-label="Kraus Digital Solutions">' + content(c) + "</section>";
    const footer = document.querySelector("footer");
    if (footer) footer.parentNode.insertBefore(host, footer);
    else document.body.appendChild(host);
  }

  function renderPopup(c) {
    if (!c.popup || sessionStorage.getItem("kds-popup-dismissed") === "1") return;
    const overlay = document.createElement("div");
    overlay.className = "kds-root kds-overlay";
    overlay.innerHTML = '<div class="kds-popup" role="dialog" aria-modal="true" aria-label="Kraus Digital Solutions">' +
      content(c, true) +
      '<button class="kds-no-thanks" type="button">Nein danke</button></div>';

    const close = () => {
      sessionStorage.setItem("kds-popup-dismissed", "1");
      overlay.remove();
      document.body.classList.remove("kds-lock");
    };
    overlay.querySelector(".kds-close").addEventListener("click", close);
    overlay.querySelector(".kds-no-thanks").addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    document.body.appendChild(overlay);
    document.body.classList.add("kds-lock");
  }

  async function start() {
    loadStyle();

    let config = { ...defaults };
    try {
      const response = await fetch(configUrl, { cache: "no-store" });
      if (response.ok) config = { ...config, ...(await response.json()) };
    } catch (_) {
      // Use embedded defaults if the config endpoint is unavailable.
    }

    window.KDSBanner = {
      customer,
      config,
      closePopup: () => document.querySelector(".kds-overlay")?.remove()
    };

    if (mode === "banner" || mode === "both") renderBanner(config);
    if (mode === "popup" || mode === "both") renderPopup(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();