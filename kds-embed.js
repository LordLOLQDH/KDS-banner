/* KDS Remote Embed — loads the banner from GitHub centrally and popup independently. */
(function () {
  "use strict";

  var ROOT_ID = "kds-central-root";
  var VERSION = "emoji-test-3";
  var BANNER_URL = "https://cdn.jsdelivr.net/gh/LordLOLQDH/KDS-banner@b4160f1743bd07f3022547ed48b7bac751628ae6/KdsBanner.js?" + VERSION;
  var POPUP_URL = "https://cdn.jsdelivr.net/gh/LordLOLQDH/KDS-banner@061d175cc38a98a9bf0006cdb5bc0952807d2448/KdsPopup.js?" + VERSION;

  var config = {
    banner: {
      enabled: true,
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
      enabled: true,
      delayMs: 5000,
      oncePerSession: false,
      eyebrow: "DIGITAL INSIGHTS",
      badge: "ANGEBOT FÜR TESTKUNDEN",
      title: "Sie möchten ebenfalls eine professionelle Website?",
      description: "Diese Website wurde von Kraus Digital Solutions erstellt. Für ausgewählte Testkunden bieten wir attraktive Konditionen – im Gegenzug freuen wir uns über eine ehrliche Bewertung unserer Arbeit. Die Anzahl der Plätze ist begrenzt.",
      cta: "Unverbindlich informieren →",
      ctaUrl: "https://kraus-digital-solutions.base44.app/kontakt"
    }
  };

  function addStyles() {
    if (document.getElementById("kds-central-styles")) return;
    var style = document.createElement("style");
    style.id = "kds-central-styles";
    style.textContent = ".kds-central-banner{box-sizing:border-box;max-width:760px;margin:32px auto;padding:0 16px;font-family:Arial,Helvetica,sans-serif}.kds-central-card{overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;box-shadow:0 10px 35px rgba(0,0,0,.16)}.kds-orange{color:#ff6a00}.kds-topline{height:5px;background:#ff6a00}.kds-head{padding:28px 32px;background:#080808}.kds-brand{font-size:24px;font-weight:800}.kds-eyebrow{margin-top:8px;font-size:11px;font-weight:600;letter-spacing:1.5px;color:#fff}.kds-body{padding:36px 32px 12px}.kds-badge{font-size:11px;font-weight:800;letter-spacing:2px;color:#ff6a00}.kds-title{margin:12px 0 0;font-size:30px;font-weight:800;line-height:1.15;color:#fff}.kds-copy{margin:18px 0 0;color:#fff;font-size:15px;font-weight:400;line-height:1.6}.kds-services{padding:8px 32px 34px}.kds-service{margin-top:10px;padding:15px;border:1px solid #292929;border-radius:9px;background:#111}.kds-service strong{color:#ff6a00;font-weight:800}.kds-service p{margin:6px 0 0;color:#fff;font-size:14px;font-weight:400;line-height:1.5}.kds-cta-wrap{padding:0 32px 36px;text-align:center}.kds-cta{display:inline-block;padding:15px 28px;border-radius:8px;background:#ff6a00;color:#fff!important;text-decoration:none!important;font-weight:800;transition:transform .2s,background .2s}.kds-cta:hover{transform:translateY(-1px);background:#ff7b22}.kds-footer{padding:24px 32px;background:#080808;border-top:1px solid #252525}.kds-footer strong{color:#fff;font-weight:800}.kds-footer-company{margin-top:4px;color:#ff6a00;font-size:13px;font-weight:600}.kds-bottomline{height:4px;background:#ff6a00}.kds-popup{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}.kds-popup-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px)}.kds-popup-card{position:relative;width:100%;max-width:440px;overflow:hidden;border:1px solid #222;border-radius:16px;background:#0d0d0d;color:#fff;font-family:Arial,Helvetica,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.4)}.kds-popup-content{padding:30px 28px 14px}.kds-popup-brand{font-size:21px;font-weight:800}.kds-popup-eyebrow{margin-top:6px;font-size:10px;font-weight:600;letter-spacing:1.5px;color:#fff}.kds-popup-badge{margin-top:26px;font-size:11px;font-weight:800;letter-spacing:2px;color:#ff6a00}.kds-popup-title{margin:10px 0 0;font-size:25px;font-weight:800;line-height:1.2;color:#fff}.kds-popup-copy{margin:12px 0 0;color:#d4d4d4;font-size:14px;font-weight:400;line-height:1.6}.kds-popup-actions{padding:20px 28px 28px;text-align:center}.kds-popup-close{position:absolute;right:12px;top:12px;width:32px;height:32px;border:0;border-radius:50%;background:#1a1a1a;color:#fff;font-size:20px;line-height:32px;cursor:pointer}.kds-popup-no{display:block;width:100%;margin-top:14px;border:0;background:transparent;color:#888;text-decoration:underline;cursor:pointer}.kds-hidden{display:none!important}@media(max-width:520px){.kds-head,.kds-body,.kds-services,.kds-cta-wrap,.kds-footer{padding-left:20px;padding-right:20px}.kds-title{font-size:25px}.kds-brand{font-size:21px}}";
    document.head.appendChild(style);
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = url;
      s.async = true;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("KDS script could not load: " + url)); };
      document.head.appendChild(s);
    });
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

  function startBanner() {
    addStyles();
    var target = getTarget();
    target.innerHTML = "";
    placeBanner(target);
    if (window.KdsBanner) window.KdsBanner(target, config.banner);
  }

  function startPopup() {
    var target = document.getElementById(ROOT_ID);
    if (target && window.KdsPopup) window.KdsPopup(target, config.popup);
  }

  function load() {
    loadScript(BANNER_URL).then(startBanner).catch(function (e) { console.warn("KDS Banner konnte nicht geladen werden", e); });
    loadScript(POPUP_URL).then(startPopup).catch(function (e) { console.warn("KDS Popup konnte nicht geladen werden", e); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
