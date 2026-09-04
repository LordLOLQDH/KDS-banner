# KDS Banner & Popup – zentrale Integration

Dieses Repository enthält die zentral ausgelieferte KDS-Integration für Kunden-Websites.

## Wie die zentrale Steuerung funktioniert

Kunden-Websites binden **ein einziges Script** ein: `kds-embed.js`.

Das Script lädt die aktuelle Konfiguration bei jedem Seitenaufruf aus diesem Repository:

`kds-embed.js` → `kds-config.json` → Banner / Popup

Dadurch können Inhalte, Aktivierung und Popup-Verhalten zentral über `kds-config.json` geändert werden. Die Kunden-Website muss dafür nicht jedes Mal neu bearbeitet werden.

## Einbindung

```html
<script src="https://raw.githubusercontent.com/LordLOLQDH/KDS-banner/main/kds-embed.js" defer></script>
```

Das Script erzeugt Banner und Popup selbst und benötigt für diese zentrale Einbindung **kein React und kein Tailwind CSS** auf der Kunden-Website.

## Zentrale Konfiguration

Die Datei `kds-config.json` enthält unter anderem:

- globale Aktivierung
- Banner an/aus
- Popup an/aus
- Popup-Verzögerung (aktuell 8 Sekunden)
- einmal pro Session
- Banner-Texte
- Popup-Texte
- CTA und Ziel-URL
- Services
- KDS Footer

Wenn beispielsweise der Banner-Text in `kds-config.json` geändert wird, übernimmt eine bereits eingebundene Kunden-Website die neue Konfiguration beim nächsten Laden.

## Wichtiger Hinweis zur Aktualität

Der Loader verwendet bewusst die zentrale Repository-Datei. Browser, CDN oder Proxy können Antworten trotzdem zwischenspeichern. Deshalb ist die Lösung für normale zentrale Inhaltsänderungen gedacht, nicht für eine garantiert millisekundengenaue Echtzeitübertragung.

## Bestehende React-Komponenten

`KdsBanner.jsx` und `KdsPopup.jsx` bleiben im Repository als React-Versionen der Komponenten erhalten. Für die zentrale, framework-unabhängige Kunden-Einbindung ist `kds-embed.js` vorgesehen.

## Sicherheit

Die Integration enthält keine geheimen Admin-Passwörter oder API-Schlüssel. Die öffentlich ausgelieferte Konfiguration darf nur öffentliche KDS-Inhalte enthalten.

Ein Website-Betreiber mit vollständigem Zugriff auf seine eigene Website kann eine Script-Einbindung technisch entfernen. Das System ist daher zentral steuerbar, aber keine unentfernbare Kopiersperre.



- Adam Gabriel Kraus
