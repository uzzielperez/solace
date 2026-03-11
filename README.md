# Solace

A neuroscience- and art-based companion for grief and loss. The site is **Solace**; the 150-day extended program is **Kintsugi**.

## What’s inside

- **Home** — Intro and links to the 21-day program and Kintsugi
- **21-Day Program** — Daily practices (science + art + reflection) to stabilize and begin integrating loss
- **Kintsugi** — 150-day program in five phases: the break, gathering the pieces, the gold, firing the vessel, kintsugi
- **No Timeline** — Short explanation that grief has no fixed timeline
- **Journal** — Private, device-only journal (localStorage)
- **Honor** — Space to name and honor who or what you’ve lost (localStorage)

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Surge

1. Install Surge (one-time): `npm install -g surge`
2. Build: `npm run build`
3. Deploy: `surge dist`
   - When prompted, choose or type a domain (e.g. `solace.surge.sh` or `your-name.surge.sh`)

Or use the deploy script (after `npm install -g surge` and logging in):

```bash
npm run deploy
```

The build copies `index.html` to `200.html` so Surge serves the SPA correctly for all routes.

## Tech

- React 19, TypeScript, Vite
- Tailwind CSS 4, Framer Motion
- React Router (client-side only)
- No backend; journal and honor data stay in the browser (localStorage)
# solace
