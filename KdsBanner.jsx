import React from "react";

/**
 * KDS-Banner (Kraus Digital Solutions)
 * Design: schwarzer Hintergrund (#050505), Akzent Orange (#ff6a00), Arial.
 * Einbau: <KdsBanner /> an beliebiger Stelle einbinden (Tailwind CSS erforderlich).
 */
export default function KdsBanner() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
      <div
        className="overflow-hidden rounded-2xl border"
        style={{ background: "#0d0d0d", borderColor: "#222" }}
      >
        <div style={{ height: 5, background: "#ff6a00" }} />

        <div className="px-7 py-7 sm:px-9" style={{ background: "#080808" }}>
          <div className="text-2xl font-bold" style={{ color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
            Kraus <span style={{ color: "#ff6a00" }}>Digital Solutions</span>
          </div>
          <div
            className="mt-2 text-xs"
            style={{ color: "#fff", letterSpacing: "1.5px", fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            DIGITAL INSIGHTS
          </div>
        </div>

        <div className="px-7 pt-10 sm:px-9" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="text-xs font-bold" style={{ color: "#ff6a00", letterSpacing: "2px" }}>
            TESTKUNDEN-RABATT
          </div>
          <h2 className="mt-3 text-3xl font-bold leading-[1.15]" style={{ color: "#fff" }}>
            Diese Website wurde von
            <br />
            <span style={{ color: "#ff6a00" }}>Kraus Digital Solutions</span> gemacht
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: "#fff" }}>
            Du willst auch eine eigene Website? Für unsere ersten Testkunden
            gibt es einen starken Rabatt – im Gegenzug für eine ehrliche
            Bewertung. Begrenzte Plätze.
          </p>
        </div>

        <div className="px-7 pb-10 sm:px-9" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="mt-7 space-y-2.5">
            {[
              ["01 — Neue Websites", "Von null auf online – modern, schnell & conversion-orientiert."],
              ["02 — Redesign", "Alt wird neu. Wir ersetzen veraltete Websites durch moderne, die funktionieren."],
              ["03 — Optimierung", "Schneller, besser, mehr Kunden – systematisch verbessert."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-[9px] border p-4"
                style={{ background: "#111", borderColor: "#292929" }}
              >
                <strong style={{ color: "#ff6a00" }}>{t}</strong>
                <p className="mt-1.5 text-sm" style={{ color: "#fff" }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-7 pb-11 text-center sm:px-9" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <a
            href="https://kraus-digital-solutions.base44.app/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg font-bold transition-transform hover:scale-[1.03]"
            style={{ background: "#ff6a00", color: "#fff", padding: "15px 28px" }}
          >
            Testkunden-Rabatt sichern →
          </a>
        </div>

        <div
          className="border-t px-7 py-6 sm:px-9"
          style={{ background: "#080808", borderColor: "#252525", fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <div className="font-bold" style={{ color: "#fff" }}>
            Adam Gabriel Kraus
          </div>
          <div className="mt-1 text-[13px]" style={{ color: "#ff6a00" }}>
            Kraus Digital Solutions
          </div>
        </div>

        <div style={{ height: 4, background: "#ff6a00" }} />
      </div>
    </section>
  );
}
