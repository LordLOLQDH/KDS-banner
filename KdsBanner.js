/* KDS Banner — standalone browser component */
(function () {
  "use strict";

  function addStyles() {
    if (document.getElementById("kds-banner-styles")) return;
    var style = document.createElement("style");
    style.id = "kds-banner-styles";
    style.textContent = ".kds-central-banner{box-sizing:border-box;max-width:760px;margin:32px auto;padding:0 16px;font-family:Arial,Helvetica,sans-serif}.kds-central-card{overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;box-shadow:0 10px 35px rgba(0,0,0,.16)}.kds-orange{color:#ff6a00}.kds-topline{height:5px;background:#ff6a00}.kds-head{padding:28px 32px;background:#080808}.kds-brand{font-size:24px;font-weight:700}.kds-eyebrow{margin-top:8px;font-size:11px;letter-spacing:1.5px;color:#fff}.kds-body{padding:36px 32px 12px}.kds-badge{font-size:11px;font-weight:700;letter-spacing:2px;color:#ff6a00}.kds-title{margin:12px 0 0;font-size:30px;line-height:1.15;color:#fff}.kds-copy{margin:18px 0 0;color:#fff;font-size:15px;line-height:1.6}.kds-services{padding:8px 32px 34px}.kds-service{margin-top:10px;padding:15px;border:1px solid #292929;border-radius:9px;background:#111}.kds-service strong{color:#ff6a00}.kds-service p{margin:6px 0 0;color:#fff;font-size:14px;line-height:1.5}.kds-cta-wrap{padding:0 32px 36px;text-align:center}.kds-cta{display:inline-block;padding:15px 28px;border-radius:8px;background:#ff6a00;color:#fff!important;text-decoration:none!important;font-weight:700;transition:transform .2s,background .2s}.kds-cta:hover{transform:translateY(-1px);background:#ff7b22}.kds-footer{padding:24px 32px;background:#080808;border-top:1px solid #252525}.kds-footer strong{color:#fff}.kds-footer-company{margin-top:4px;color:#ff6a00;font-size:13px}.kds-bottomline{height:4px;background:#ff6a00}@media(max-width:520px){.kds-head,.kds-body,.kds-services,.kds-cta-wrap,.kds-footer{padding-left:20px;padding-right:20px}.kds-title{font-size:25px}.kds-brand{font-size:21px}}";
    document.head.appendChild(style);
  }

  window.KdsBanner = function (target, config) {
    if (!target) return;
    config = config || {};
    if (config.enabled === false) return;
    addStyles();

    var services = (config.services || [
      ["01 — Neue Websites", "Professionelle Websites – modern, klar strukturiert und auf eine überzeugende Nutzererfahrung ausgerichtet."],
      ["02 — Redesign", "Bestehende Websites werden modernisiert, strukturell überarbeitet und zeitgemäß neu gestaltet."],
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
      .replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
