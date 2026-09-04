/* KDS Popup — standalone browser component */
(function () {
  "use strict";

  window.KdsPopup = function (target, config) {
    if (!target) return;
    config = config || {};
    if (config.enabled === false) return;

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
    }, Math.max(0, Number(config.delayMs) || 8000));
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
