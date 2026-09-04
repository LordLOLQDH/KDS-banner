/* KDS Popup — standalone browser component */
(function () {
  "use strict";

  function addStyles() {
    if (document.getElementById("kds-popup-styles")) return;
    var style = document.createElement("style");
    style.id = "kds-popup-styles";
    style.textContent = ".kds-popup{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}.kds-popup-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px)}.kds-popup-card{position:relative;width:100%;max-width:440px;overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;font-family:Arial,Helvetica,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.4)}.kds-popup-content{padding:30px 28px 14px}.kds-popup-brand{font-size:21px;font-weight:800}.kds-orange{color:#ff6a00}.kds-popup-eyebrow{margin-top:6px;font-size:10px;font-weight:600;letter-spacing:1.5px;color:#fff}.kds-popup-badge{margin-top:26px;font-size:11px;font-weight:800;letter-spacing:2px;color:#ff6a00}.kds-popup-title{margin:10px 0 0;font-size:25px;font-weight:800;line-height:1.2;color:#fff}.kds-popup-copy{margin:12px 0 0;color:#d4d4d4;font-size:14px;font-weight:400;line-height:1.6}.kds-popup-actions{padding:20px 28px 28px;text-align:center}.kds-popup-close{position:absolute;right:12px;top:12px;width:32px;height:32px;border:0;border-radius:50%;background:#1a1a1a;color:#fff;font-size:20px;line-height:32px;cursor:pointer}.kds-popup-no{display:block;width:100%;margin-top:14px;border:0;background:transparent;color:#888;text-decoration:underline;cursor:pointer}.kds-cta{display:inline-block;padding:14px 26px;border-radius:8px;background:#ff6a00;color:#fff!important;text-decoration:none!important;font-weight:800;transition:transform .2s,background .2s}.kds-cta:hover{transform:translateY(-1px);background:#ff7b22}.kds-topline{height:5px;background:#ff6a00}.kds-bottomline{height:4px;background:#ff6a00}.kds-hidden{display:none!important}@media(max-width:520px){.kds-popup-content{padding-left:20px;padding-right:20px}.kds-popup-title{font-size:23px}}";
    document.head.appendChild(style);
  }

  window.KdsPopup = function (target, config) {
    if (!target) return;
    config = config || {};
    if (config.enabled === false) return;
    addStyles();

    var key = "kds_popup_seen";
    var seen = false;
    try { seen = sessionStorage.getItem(key) === "1"; } catch (_) {}
    if (config.oncePerSession !== false && seen) return;

    var popup = document.createElement("div");
    popup.className = "kds-popup kds-hidden";
    popup.setAttribute("data-kds", "popup");
    popup.innerHTML =
      '<div class="kds-popup-backdrop"></div>' +
      '<div class="kds-popup-card" role="dialog" aria-modal="true" aria-label="KDS Hinweis">' +
        '<div class="kds-topline"></div>' +
        '<button class="kds-popup-close" type="button" aria-label="Schließen">×</button>' +
        '<div class="kds-popup-content"><div class="kds-popup-brand">Kraus <span class="kds-orange">Digital Solutions</span></div><div class="kds-popup-eyebrow">' + esc(config.eyebrow || "DIGITAL INSIGHTS") + '</div><div class="kds-popup-badge">' + esc(config.badge || "ANGEBOT FÜR TESTKUNDEN") + '</div><h2 class="kds-popup-title">' + esc(config.title || "Sie möchten ebenfalls eine professionelle Website?") + '</h2><p class="kds-popup-copy">' + esc(config.description || "Diese Website wurde von Kraus Digital Solutions erstellt. Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.") + '</p></div>' +
        '<div class="kds-popup-actions"><a class="kds-cta" href="' + esc(config.ctaUrl || "https://kraus-digital-solutions.base44.app/kontakt") + '" target="_blank" rel="noopener noreferrer">' + esc(config.cta || "Unverbindlich informieren →") + '</a><button class="kds-popup-no" type="button">Nicht interessiert</button></div>' +
        '<div class="kds-bottomline"></div>' +
      '</div>';

    function close() {
      popup.remove();
      if (config.oncePerSession !== false) {
        try { sessionStorage.setItem(key, "1"); } catch (_) {}
      }
    }

    popup.querySelector(".kds-popup-close").addEventListener("click", close);
    popup.querySelector(".kds-popup-no").addEventListener("click", close);
    popup.querySelector(".kds-popup-backdrop").addEventListener("click", close);
    target.appendChild(popup);

    setTimeout(function () {
      popup.classList.remove("kds-hidden");
      if (config.oncePerSession !== false) {
        try { sessionStorage.setItem(key, "1"); } catch (_) {}
      }
    }, Math.max(0, Number(config.delayMs) || 5000));
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
