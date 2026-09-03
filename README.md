# KDS Banner

Zentrale KDS-Banner-Komponente für Kundenwebsites.

## Demo

index.html leitet automatisch auf demo.html weiter.
Die Demo ist eine neutrale, vollständige Beispielwebsite für die fiktive Firma „Nordlicht Studio“.

- Startseite: KDS-Banner + KDS-Popup
- Kontaktseite: kein KDS-Popup und kein KDS-Banner
- Das Popup erscheint bei jedem neuen Laden der Startseite erneut.
- kontakt.html kann direkt über die Navigation geöffnet werden.

## Einbindung

```html
<script
  src="https://lordlolqdh.github.io/KDS-banner/kds-banner.js"
  data-customer="ziemlich-beschissen"
  data-mode="both"
  data-home-only="true">
</script>
```

## Modi

- both – Popup + Banner
- popup – nur Popup
- banner – nur Banner

data-home-only="true" verhindert die Anzeige auf Unterseiten. Alternativ kann das Script ausschließlich auf der Startseite eingebunden werden.

Die zentrale Konfiguration liegt in config.json.

## Hinweis

Die Komponente ist zentral verwaltbar, aber keine technische Kopiersperre. Ein Betreiber mit vollständigem Zugriff auf seine Website kann eine Script-Einbindung grundsätzlich entfernen.
