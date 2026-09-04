/* KDS Central Embed — self-contained HTML/CSS banner + popup. */
(function () {
  "use strict";

  var ROOT_ID = "kds-central-root";

  var config = {
    banner: {
      eyebrow: "DIGITAL INSIGHTS",
      badge: "ANGEBOT FÜR TESTKUNDEN",
      title: "Diese Website wurde von Kraus Digital Solutions erstellt",
      description: "Sie möchten ebenfalls eine professionelle Website? Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.",
      cta: "Unverbindlich informieren →",
      ctaUrl: "https://kraus-digital-solutions.base44.app/kontakt",
      services: [
        ["01 — Neue Websites", "Professionelle Websites – modern, klar strukturiert und auf eine überzeugende Nutzererfahrung ausgerichtet."],
        ["02 — Redesign", "Bestehende Websites werden modernisiert, strukturell überarbeitet und zeitgemäß neu gestaltet."],
        ["03 — Optimierung", "Gezielte Verbesserungen für Performance, Nutzerfreundlichkeit und eine professionelle Online-Präsenz."]
      ],
      footerName: "Adam Gabriel Kraus",
      footerCompany: "Kraus Digital Solutions"
    },
    popup: {
      delayMs: 5000,
      eyebrow: "DIGITAL INSIGHTS",
      badge: "ANGEBOT FÜR TESTKUNDEN",
      title: "Sie möchten ebenfalls eine professionelle Website?",
      description: "Diese Website wurde von Kraus Digital Solutions erstellt. Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.",
      cta: "Unverbindlich informieren →",
      ctaUrl: "https://kraus-digital-solutions.base44.app/kontakt"
    }
  };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" }[c];
    });
  }

  function addStyles() {
    if (document.getElementById("kds-central-styles")) return;
    var style = document.createElement("style");
    style.id = "kds-central-styles";
    style.textContent = `
      .kds-central-banner{box-sizing:border-box;max-width:760px;margin:32px auto;padding:0 16px;font-family:Arial,Helvetica,sans-serif}
      .kds-central-card{overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;box-shadow:0 10px 35px rgba(0,0,0,.16)}
      .kds-topline,.kds-bottomline{background:#ff6a00}.kds-topline{height:5px}.kds-bottomline{height:4px}
      .kds-head{padding:28px 32px;background:#080808}.kds-brand{font-size:24px;font-weight:800}.kds-eyebrow{margin-top:8px;font-size:11px;font-weight:600;letter-spacing:1.5px}
      .kds-body{padding:36px 32px 12px}.kds-badge{font-size:11px;font-weight:800;letter-spacing:2px;color:#ff6a00}.kds-title{margin:12px 0 0;font-size:30px;font-weight:800;line-height:1.15}.kds-copy{margin:18px 0 0;font-size:15px;line-height:1.6}
      .kds-services{padding:8px 32px 34px}.kds-service{margin-top:10px;padding:15px;border:1px solid #292929;border-radius:9px;background:#111}.kds-service strong{color:#ff6a00}.kds-service p{margin:6px 0 0;font-size:14px;line-height:1.5}
      .kds-cta-wrap{padding:0 32px 36px;text-align:center}.kds-cta{display:inline-block;padding:15px 28px;border-radius:8px;background:#ff6a00;color:#fff!important;text-decoration:none!important;font-weight:800}
      .kds-footer{padding:24px 32px;background:#080808;border-top:1px solid #252525}.kds-footer-company{margin-top:4px;color:#ff6a00;font-size:13px;font-weight:600}
      .kds-popup{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}.kds-popup-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px)}
      .kds-popup-card{position:relative;width:100%;max-width:440px;overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;font-family:Arial,Helvetica,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.4)}
      .kds-popup-content{padding:30px 28px 14px}.kds-popup-brand{font-size:21px;font-weight:800}.kds-popup-eyebrow{margin-top:6px;font-size:10px;font-weight:600;letter-spacing:1.5px}.kds-popup-badge{margin-top:26px;font-size:11px;font-weight:800;letter-spacing:2px;color:#ff6a00}.kds-popup-title{margin:10px 0 0;font-size:25px;font-weight:800;line-height:1.2}.kds-popup-copy{margin:12px 0 0;color:#d4d4d4;font-size:14px;line-height:1.6}
      .kds-popup-actions{padding:20px 28px 28px;text-align:center}.kds-popup-close{position:absolute;right:12px;top:12px;width:32px;height:32px;border:0;border-radius:50%;background:#1a1a1a;color:#fff;font-size:20px;line-height:32px;cursor:pointer}.kds-popup-no{display:block;width:100%;margin-top:14px;border:0;background:transparent;color:#888;text-decoration:underline;cursor:pointer}
      @media(max-width:520px){.kds-head,.kds-body,.kds-services,.kds-cta-wrap,.kds-footer{padding-left:20px;padding-right:20px}.kds-title{font-size:25px}.kds-brand{font-size:21px}}
    `;
    document.head.appendChild(style);
  }

  function getTarget() {
    var target = document.getElementById(ROOT_ID);
    if (!target) {
      target = document.createElement("div");
      target.id = ROOT_ID;
    }
    return target;
  }

  function placeBanner(target) {
    var containers = document.querySelectorAll("main, [role=main]");
    var container = containers.length ? containers[0] : document.body;
    var children = Array.prototype.filter.call(container.children, function (el) {
      return el.id !== ROOT_ID && !el.hasAttribute("data-kds-ignore-position");
    });
    if (children.length >= 2) container.insertBefore(target, children[1]);
    else container.appendChild(target);
  }

  function renderBanner(target) {
    var b = config.banner;
    var services = b.services.map(function (item) {
      return '<div class="kds-service"><strong>' + esc(item[0]) + '</strong><p>' + esc(item[1]) + '</p></div>';
    }).join("");

    target.innerHTML = '<section class="kds-central-banner" data-kds="banner"><div class="kds-central-card">' +
      '<div class="kds-topline"></div><div class="kds-head"><div class="kds-brand">Kraus Digital Solutions</div><div class="kds-eyebrow">' + esc(b.eyebrow) + '</div></div>' +
      '<div class="kds-body"><div class="kds-badge">' + esc(b.badge) + '</div><h2 class="kds-title">' + esc(b.title) + '</h2><p class="kds-copy">' + esc(b.description) + '</p></div>' +
      '<div class="kds-services">' + services + '</div><div class="kds-cta-wrap"><a class="kds-cta" href="' + esc(b.ctaUrl) + '">' + esc(b.cta) + '</a></div>' +
      '<div class="kds-footer"><strong>' + esc(b.footerName) + '</strong><div class="kds-footer-company">' + esc(b.footerCompany) + '</div></div><div class="kds-bottomline"></div></div></section>';
  }

  function renderPopup(target) {
    var p = config.popup;
    var popup = document.createElement("div");
    popup.className = "kds-popup";
    popup.innerHTML = '<div class="kds-popup-backdrop"></div><div class="kds-popup-card"><button class="kds-popup-close" aria-label="Schließen">×</button><div class="kds-popup-content"><div class="kds-popup-brand">Kraus Digital Solutions</div><div class="kds-popup-eyebrow">' + esc(p.eyebrow) + '</div><div class="kds-popup-badge">' + esc(p.badge) + '</div><h2 class="kds-popup-title">' + esc(p.title) + '</h2><p class="kds-popup-copy">' + esc(p.description) + '</p></div><div class="kds-popup-actions"><a class="kds-cta" href="' + esc(p.ctaUrl) + '">' + esc(p.cta) + '</a><button class="kds-popup-no">Nein, danke</button></div></div>';
    function close() { popup.remove(); }
    popup.querySelector(".kds-popup-close").addEventListener("click", close);
    popup.querySelector(".kds-popup-no").addEventListener("click", close);
    popup.querySelector(".kds-popup-backdrop").addEventListener("click", close);
    target.appendChild(popup);
  }

  function load() {
    addStyles();
    var target = getTarget();
    target.innerHTML = "";
    placeBanner(target);
    renderBanner(target);
    setTimeout(function () { renderPopup(target); }, config.popup.delayMs);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
