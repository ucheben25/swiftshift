# SwiftShip — Shipment & Tracking Company Website

A single-page company website for a shipment and tracking business. Dark theme, clear layout, and a working **tracking demo**.

## What’s included

- **Home** — Hero, trust stats, and CTAs  
- **Services** — Standard, Express, International, Business  
- **How it works** — Book → Ship → Track  
- **Track** — Enter any tracking ID (e.g. `SS-123456789`) to see a demo timeline  
- **About** — Company intro and highlights  
- **Contact** — Email, phone, address and a contact form (submit is demo-only)

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then go to `http://localhost:8080` (or the port shown).

## Customization

- **Branding** — Replace “SwiftShip” and logo in `index.html` and footer.  
- **Colors** — Edit CSS variables in `styles.css` (`:root`: `--accent`, `--bg`, etc.).  
- **Tracking** — Replace the demo logic in `script.js` with real API calls when you have a backend.

## Files

- `index.html` — Page structure and content  
- `styles.css` — Layout and styling (responsive)  
- `script.js` — Mobile menu, tracking demo, contact form handling  

No build step required; plain HTML, CSS, and JavaScript.
