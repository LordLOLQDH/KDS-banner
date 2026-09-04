/* KDS Banner — standalone browser component */
(function () {
  "use strict";

  window.KdsBanner = function (target, config) {
    if (!target) return;
    config = config || {};
    if (config.enabled === false) return;

    var services = (config.services || [
      ["01 — Neue Websites", "Von null auf online – modern, schnell & conversion-orientiert."],
      ["02 — Redesign", "Alt wird neu. Wir ersetzen veraltete Websites durch moderne, die funktionieren."],
      ["03 — Optimierung", "Schneller, besser, mehr Kunden – systematisch verbessert."]
    ]).map(function (item) {
      return '<div class="kds-service"><strong>' + esc(item[0]) + '</strong><p>' + esc(item[1]) + '</p></div>';
    }).join("");

    target.insertAdjacentHTML("beforeend",
      '<section class="kds-central-banner" data-kds="banner">' +
        '<div class="kds-central-card">' +
          '<div class="kds-topline"></div>' +
          '<div class="kds-head"><div class="kds-brand">Kraus <span class="kds-orange">Digital Solutions</span></div><div class="kds-eyebrow">' + esc(config.eyebrow || "DIGITAL INSIGHTS") + '</div></div>' +
          '<div class="kds-body"><div class="kds-badge">' + esc(config.badge || "TESTKUNDEN-RABATT") + '</div><h2 class="kds-title">' + esc(config.title || "Diese Website wurde von Kraus Digital Solutions gemacht") + '</h2><p class="kds-copy">' + esc(config.description || "Du willst auch eine eigene Website? Für unsere ersten Testkunden gibt es einen starken Rabatt – im Gegenzug für eine ehrliche Bewertung. Begrenzte Plätze.") + '</p></div>' +
          '<div class="kds-services">' + services + '</div>' +
          '<div class="kds-cta-wrap"><a class="kds-cta" href="' + esc(config.ctaUrl || "https://kraus-digital-solutions.base44.app/kontakt") + '" target="_blank" rel="noopener noreferrer">' + esc(config.cta || "Testkunden-Rabatt sichern →") + '</a></div>' +
          '<div class="kds-footer"><strong>' + esc(config.footerName || "Adam Gabriel Kraus") + '</strong><div class="kds-footer-company">' + esc(config.footerCompany || "Kraus Digital Solutions") + '</div></div>' +
          '<div class="kds-bottomline"></div>' +
        '</div>' +
      '</section>'
    );
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
