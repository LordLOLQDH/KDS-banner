import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * KDS-Popup (Kraus Digital Solutions)
 * Erscheint einmal pro Sitzung nach 8 Sekunden (sessionStorage).
 * Benötigt: Tailwind CSS + lucide-react.
 * Einbau: einmal global einbinden, z. B. im Layout der App.
 */
const SESSION_KEY = "kds_popup_seen";

export default function KdsPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl"
        style={{ background: "#0d0d0d", borderColor: "#222", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div style={{ height: 5, background: "#ff6a00" }} />

        <button
          onClick={close}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Schließen"
          style={{ background: "#1a1a1a" }}
        >
          <X size={16} />
        </button>

        <div className="px-7 pt-9 sm:px-9">
          <div className="text-xl font-bold" style={{ color: "#fff" }}>
            Kraus <span style={{ color: "#ff6a00" }}>Digital Solutions</span>
          </div>
          <div className="mt-1.5 text-[11px]" style={{ color: "#fff", letterSpacing: "1.5px" }}>
            DIGITAL INSIGHTS
          </div>

          <div className="mt-7 text-xs font-bold" style={{ color: "#ff6a00", letterSpacing: "2px" }}>
            TESTKUNDEN-RABATT
          </div>
          <h2 className="mt-3 text-2xl font-bold leading-tight" style={{ color: "#fff" }}>
            Du brauchst auch eine <span style={{ color: "#ff6a00" }}>Website?</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#d4d4d4" }}>
            Diese Website wurde von Kraus Digital Solutions gemacht. Für unsere
            ersten Testkunden gibt es einen starken Rabatt – im Gegenzug für
            eine ehrliche Bewertung. Begrenzte Plätze.
          </p>
        </div>

        <div className="px-7 pb-9 pt-7 text-center sm:px-9">
          <a
            href="https://kraus-digital-solutions.base44.app/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg font-bold transition-transform hover:scale-[1.03]"
            style={{ background: "#ff6a00", color: "#fff", padding: "14px 26px" }}
          >
            Testkunden-Rabatt sichern →
          </a>
          <button
            onClick={close}
            className="mt-4 block w-full text-xs underline"
            style={{ color: "#888" }}
          >
            Nein danke
          </button>
        </div>

        <div style={{ height: 4, background: "#ff6a00" }} />
      </div>
    </div>
  );
}
