# DJ Loves Me — website

Personal site for **Daniel · DJ Loves Me**. Editorial, warm, grown-up-playful — deep teal dominant with a red accent (the glasses). The site is built around flyers and a gig calendar.

## Stack

- **Next.js** (App Router, JavaScript) — rendering, routing
- **Tailwind CSS v4** — styling with brand tokens in `app/globals.css`
- **Notion** — CMS for the `Gigs` and `About` databases
- **Vercel** — hosting & deployment (one-click from GitHub)
- **Hostinger** — domain

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

The site works with **no Notion setup yet** — `lib/notion.js` falls back to sample gigs so you can design without blocking on the CMS. Wire it up with:

```bash
cp .env.example .env.local
# then fill in NOTION_TOKEN, NOTION_DB_GIGS, NOTION_DB_ABOUT
```

## Notion schema

### `Gigs` database

| Property  | Type         | Notes                                 |
| --------- | ------------ | ------------------------------------- |
| Name      | Title        | Gig / event title                     |
| Date      | Date         | With time, used for sorting + filter  |
| Venue     | Rich text    | Venue name                            |
| City      | Rich text    | City                                  |
| Country   | Rich text    | 2-letter code or full name            |
| Flyer     | Files & media | 3:4 portrait image preferred          |
| Tickets   | URL          | Optional ticket link                  |
| Status    | Select       | `upcoming` / `past` (optional)        |
| Notes     | Rich text    | Short description (3 lines on card)   |

### `About` database

A single-row database (or a single page will do) with:

| Property | Type      | Notes            |
| -------- | --------- | ---------------- |
| Name     | Title     | Headline         |
| Body     | Rich text | Long-form bio    |

Share each database with your Notion integration before deploying.

## Project structure

```
app/
  layout.js         ← site chrome: header, footer, fonts, metadata
  page.js           ← home: hero + upcoming gigs + CTA
  gigs/page.js      ← full gig calendar (upcoming + past)
  about/page.js     ← about page
  globals.css       ← Tailwind + brand tokens
components/
  GigCard.jsx       ← reusable flyer-forward gig card
lib/
  notion.js         ← Notion client (with sample fallback)
public/             ← static assets
```

## Brand tokens

Pulled from `app/globals.css` (logo-driven, nocturnal):

- `--color-ink` pure black — the ground
- `--color-paper` / `--color-paper-mute` — type on black
- `--grad-pink → --grad-purple → --grad-blue` — signature gradient (matches logo pill border)
- `--color-gold` — warm highlight from the logo's audio-wave
- Display font: **Bebas Neue** (bold condensed caps, mirrors logo wordmark)
- Body font: **Inter**

### Logo

`public/logo.svg` is the current placeholder — pill + gradient border + audio wave + wordmark. Swap it for your actual logo file any time (keep the filename `logo.svg` or change the `<img src>` in `app/layout.js`).

## Deploy

Pushing to `main` on `bachatalovesme/djlovesme-web` auto-deploys via Vercel.
Set `NOTION_TOKEN`, `NOTION_DB_GIGS`, `NOTION_DB_ABOUT` in Vercel project settings.

The domain is managed at Hostinger — point it to Vercel via DNS once the project is connected.
