/* KDS Banner — standalone browser component */
(function () {
  "use strict";

  window.KdsBanner = function (target, config) {
    if (!target) return;
    config = config || {};
    if (config.enabled === false) return;

    var services = (config.services || [
      ["01 — Neue Websites", "Professionelle Websites – modern, schnell und auf eine überzeugende Nutzererfahrung ausgerichtet."],
      ["02 — Redesign", "Bestehende Websites werden modernisiert, strukturiert und zeitgemäß neu aufgestellt."],
      ["03 — Optimierung", "Gezielte Verbesserungen für Performance, Nutzerfreundlichkeit und eine professionelle Online-Präsenz."]
    ]).map(function (item) {
      return '<div class="kds-service"><strong>' + esc(item[0]) + '</strong><p>' + esc(item[1]) + '</p></div>';
    }).join("");

    target.insertAdjacentHTML("beforeend",
      '<section class="kds-central-banner" data-kds="banner">' +
        '<div class="kds-central-card">' +
          '<div class="kds-topline"></div>' +
          '<div class="kds-head"><div class="kds-brand">Kraus <span class="kds-orange">Digital Solutions</span></div><div class="kds-eyebrow">' + esc(config.eyebrow || "DIGITAL INSIGHTS") + '</div></div>' +
          '<div class="kds-body"><div class="kds-badge">' + esc(config.badge || "ANGEBOT FÜR TESTKUNDEN") + '</div><h2 class="kds-title">' + esc(config.title || "Diese Website wurde von Kraus Digital Solutions erstellt") + '</h2><p class="kds-copy">' + esc(config.description || "Sie möchten ebenfalls eine professionelle Website? Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.") + '</p></div>' +
          '<div class="kds-services">' + services + '</div>' +
          '<div class="kds-cta-wrap"><a class="kds-cta" href="' + esc(config.ctaUrl || "https://kraus-digital-solutions.base44.app/kontakt") + '" target="_blank" rel="noopener noreferrer">' + esc(config.cta || "Unverbindlich informieren →") + '</a></div>' +
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
