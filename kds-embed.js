/*
 * KDS Central Embed
 *
 * Add this script to a customer website:
 * <script src="https://raw.githubusercontent.com/LordLOLQDH/KDS-banner/main/kds-embed.js" defer></script>
 *
 * The script fetches kds-config.json from this repository. Changes to the
 * central configuration are therefore picked up by customer websites without
 * replacing their local banner/popup code.
 */
(function () {
  "use strict";

  var BASE = "https://raw.githubusercontent.com/LordLOLQDH/KDS-banner/main/";
  var CONFIG_URL = BASE + "kds-config.json";
  var SESSION_KEY = "kds_popup_seen";
  var ROOT_ID = "kds-central-root";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function injectStyles() {
    if (document.getElementById("kds-central-styles")) return;
    var style = document.createElement("style");
    style.id = "kds-central-styles";
    style.textContent = [
      ".kds-central-banner{box-sizing:border-box;max-width:760px;margin:32px auto;padding:0 16px;font-family:Arial,Helvetica,sans-serif}",
      ".kds-central-card{overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;box-shadow:0 10px 35px rgba(0,0,0,.16)}",
      ".kds-orange{color:#ff6a00}.kds-topline{height:5px;background:#ff6a00}.kds-head{padding:28px 32px;background:#080808}.kds-brand{font-size:24px;font-weight:700}.kds-eyebrow{margin-top:8px;font-size:11px;letter-spacing:1.5px}.kds-body{padding:36px 32px 12px}.kds-badge{font-size:11px;font-weight:700;letter-spacing:2px;color:#ff6a00}.kds-title{margin:12px 0 0;font-size:30px;line-height:1.15}.kds-copy{margin:18px 0 0;color:#fff;font-size:15px;line-height:1.6}.kds-services{padding:8px 32px 34px}.kds-service{margin-top:10px;padding:15px;border:1px solid #292929;border-radius:9px;background:#111}.kds-service strong{color:#ff6a00}.kds-service p{margin:6px 0 0;color:#fff;font-size:14px;line-height:1.5}.kds-cta-wrap{padding:0 32px 36px;text-align:center}.kds-cta{display:inline-block;padding:15px 28px;border-radius:8px;background:#ff6a00;color:#fff!important;text-decoration:none!important;font-weight:700}.kds-footer{padding:24px 32px;background:#080808;border-top:1px solid #252525}.kds-footer-company{margin-top:4px;color:#ff6a00;font-size:13px}.kds-bottomline{height:4px;background:#ff6a00}",
      ".kds-popup{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}.kds-popup-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px)}.kds-popup-card{position:relative;width:100%;max-width:440px;overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;font-family:Arial,Helvetica,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.4)}.kds-popup-content{padding:30px 28px 14px}.kds-popup-brand{font-size:21px;font-weight:700}.kds-popup-eyebrow{margin-top:6px;font-size:10px;letter-spacing:1.5px}.kds-popup-badge{margin-top:26px;font-size:11px;font-weight:700;letter-spacing:2px;color:#ff6a00}.kds-popup-title{margin:10px 0 0;font-size:25px;line-height:1.2}.kds-popup-copy{margin:12px 0 0;color:#d4d4d4;font-size:14px;line-height:1.6}.kds-popup-actions{padding:20px 28px 28px;text-align:center}.kds-popup-close{position:absolute;right:12px;top:12px;width:32px;height:32px;border:0;border-radius:50%;background:#1a1a1a;color:#fff;font-size:20px;line-height:32px;cursor:pointer}.kds-popup-no{display:block;width:100%;margin-top:14px;border:0;background:transparent;color:#888;text-decoration:underline;cursor:pointer}.kds-hidden{display:none!important}",
      "@media(max-width:520px){.kds-head,.kds-body,.kds-services,.kds-cta-wrap,.kds-footer{padding-left:20px;padding-right:20px}.kds-title{font-size:25px}.kds-brand{font-size:21px}}"
    ].join("");
    document.head.appendChild(style);
  }

  function getRoot() {
    var root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      document.body.appendChild(root);
    }
    return root;
  }

  function renderBanner(root, config) {
    if (!config.enabled || !config.banner || !config.banner.enabled) return;
    var b = config.banner;
    var services = (b.services || []).map(function (item) {
      return '<div class="kds-service"><strong>' + escapeHtml(item[0]) + '</strong><p>' + escapeHtml(item[1]) + '</p></div>';
    }).join("");
    root.insertAdjacentHTML("beforeend",
      '<section class="kds-central-banner" data-kds="banner">' +
        '<div class="kds-central-card">' +
          '<div class="kds-topline"></div>' +
          '<div class="kds-head"><div class="kds-brand">Kraus <span class="kds-orange">Digital Solutions</span></div><div class="kds-eyebrow">' + escapeHtml(b.eyebrow) + '</div></div>' +
          '<div class="kds-body"><div class="kds-badge">' + escapeHtml(b.badge) + '</div><h2 class="kds-title">' + escapeHtml(b.title) + '</h2><p class="kds-copy">' + escapeHtml(b.description) + '</p></div>' +
          '<div class="kds-services">' + services + '</div>' +
          '<div class="kds-cta-wrap"><a class="kds-cta" href="' + escapeHtml(b.ctaUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(b.cta) + '</a></div>' +
          '<div class="kds-footer"><strong>' + escapeHtml(b.footerName) + '</strong><div class="kds-footer-company">' + escapeHtml(b.footerCompany) + '</div></div>' +
          '<div class="kds-bottomline"></div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderPopup(root, config) {
    if (!config.enabled || !config.popup || !config.popup.enabled) return;
    var p = config.popup;
    var seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch (_) {}
    if (p.oncePerSession && seen) return;

    var popup = document.createElement("div");
    popup.className = "kds-popup kds-hidden";
    popup.setAttribute("data-kds", "popup");
    popup.innerHTML =
      '<div class="kds-popup-backdrop"></div>' +
      '<div class="kds-popup-card" role="dialog" aria-modal="true" aria-label="KDS Hinweis">' +
        '<div class="kds-topline"></div>' +
        '<button class="kds-popup-close" type="button" aria-label="Schließen">×</button>' +
        '<div class="kds-popup-content"><div class="kds-popup-brand">Kraus <span class="kds-orange">Digital Solutions</span></div><div class="kds-popup-eyebrow">' + escapeHtml(p.eyebrow) + '</div><div class="kds-popup-badge">' + escapeHtml(p.badge) + '</div><h2 class="kds-popup-title">' + escapeHtml(p.title) + '</h2><p class="kds-popup-copy">' + escapeHtml(p.description) + '</p></div>' +
        '<div class="kds-popup-actions"><a class="kds-cta" href="' + escapeHtml(p.ctaUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(p.cta) + '</a><button class="kds-popup-no" type="button">Nein danke</button></div>' +
        '<div class="kds-bottomline"></div>' +
      '</div>';

    function close() {
      popup.remove();
      if (p.oncePerSession) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (_) {}
      }
    }

    popup.querySelector(".kds-popup-close").addEventListener("click", close);
    popup.querySelector(".kds-popup-no").addEventListener("click", close);
    popup.querySelector(".kds-popup-backdrop").addEventListener("click", close);
    root.appendChild(popup);

    setTimeout(function () {
      popup.classList.remove("kds-hidden");
      if (p.oncePerSession) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (_) {}
      }
    }, Math.max(0, Number(p.delayMs) || 8000));
  }

  function start(config) {
    injectStyles();
    var root = getRoot();
    root.innerHTML = "";
    renderBanner(root, config);
    renderPopup(root, config);
  }

  function load() {
    fetch(CONFIG_URL, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("KDS config HTTP " + response.status);
        return response.json();
      })
      .then(start)
      .catch(function (error) {
        console.warn("KDS Integration konnte nicht geladen werden:", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
