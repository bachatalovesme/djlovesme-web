/**
 * Notion CMS client — DJ Loves Me
 *
 * Two databases:
 *   1. Gigs  — upcoming + past shows (with flyer image)
 *   2. About — long-form about page content
 *
 * Works with or without Notion credentials:
 *   - If NOTION_TOKEN + NOTION_DB_GIGS are set, pulls live from Notion.
 *   - If not set (local dev before Notion is wired), returns sample data so
 *     the UI renders. This keeps `npm run dev` working immediately.
 */

import { Client } from "@notionhq/client";

const TOKEN = process.env.NOTION_TOKEN;
const DB_GIGS = process.env.NOTION_DB_GIGS;
const DB_ABOUT = process.env.NOTION_DB_ABOUT;

const notion = TOKEN ? new Client({ auth: TOKEN }) : null;

/* ───────── helpers ───────── */

const prop = (page, name) => page?.properties?.[name];

const readTitle = (p) =>
  prop(p, "Name")?.title?.map((t) => t.plain_text).join("") ?? "";

const readRichText = (page, name) =>
  prop(page, name)?.rich_text?.map((t) => t.plain_text).join("") ?? "";

const readDate = (page, name) => prop(page, name)?.date?.start ?? null;

const readSelect = (page, name) => prop(page, name)?.select?.name ?? null;

const readUrl = (page, name) => prop(page, name)?.url ?? null;

const readFiles = (page, name) => {
  const files = prop(page, name)?.files ?? [];
  return files
    .map((f) => f?.file?.url || f?.external?.url || null)
    .filter(Boolean);
};

/** Normalize a Notion "Gig" page into the shape the UI expects. */
function mapGig(page) {
  return {
    id: page.id,
    title: readTitle(page) || "Untitled gig",
    date: readDate(page, "Date"),
    venue: readRichText(page, "Venue") || readSelect(page, "Venue"),
    city: readRichText(page, "City") || readSelect(page, "City"),
    country: readRichText(page, "Country") || readSelect(page, "Country"),
    flyer: readFiles(page, "Flyer")[0] ?? null,
    ticketUrl: readUrl(page, "Tickets"),
    status: readSelect(page, "Status"), // "upcoming" / "past"
    notes: readRichText(page, "Notes"),
  };
}

/* ───────── sample fallback (for dev before Notion is wired) ───────── */

const SAMPLE_GIGS = [
  {
    id: "sample-1",
    title: "Bachata Nights · Opening Set",
    date: "2026-05-02T22:00:00",
    venue: "Sala Apolo",
    city: "Barcelona",
    country: "ES",
    flyer: null,
    ticketUrl: null,
    status: "upcoming",
    notes: "Warming up the room before the headliner.",
  },
  {
    id: "sample-2",
    title: "Rooftop Session",
    date: "2026-05-18T20:00:00",
    venue: "Casa Bonay",
    city: "Barcelona",
    country: "ES",
    flyer: null,
    ticketUrl: null,
    status: "upcoming",
    notes: "Sunset to late night — sensual, tropical, warm.",
  },
  {
    id: "sample-3",
    title: "Loves Me · Summer Kickoff",
    date: "2026-06-14T23:00:00",
    venue: "TBD",
    city: "Madrid",
    country: "ES",
    flyer: null,
    ticketUrl: null,
    status: "upcoming",
    notes: "",
  },
];

const usingSamples = () => !notion || !DB_GIGS;

/* ───────── public API ───────── */

export async function getUpcomingGigs({ limit = 20 } = {}) {
  if (usingSamples()) {
    return SAMPLE_GIGS.filter((g) => new Date(g.date) >= new Date()).slice(
      0,
      limit
    );
  }

  try {
    const res = await notion.databases.query({
      database_id: DB_GIGS,
      filter: {
        property: "Date",
        date: { on_or_after: new Date().toISOString() },
      },
      sorts: [{ property: "Date", direction: "ascending" }],
      page_size: limit,
    });
    return res.results.map(mapGig);
  } catch (err) {
    console.error("[notion] getUpcomingGigs failed:", err.message);
    return [];
  }
}

export async function getPastGigs({ limit = 50 } = {}) {
  if (usingSamples()) {
    return []; // no past samples
  }

  try {
    const res = await notion.databases.query({
      database_id: DB_GIGS,
      filter: {
        property: "Date",
        date: { before: new Date().toISOString() },
      },
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: limit,
    });
    return res.results.map(mapGig);
  } catch (err) {
    console.error("[notion] getPastGigs failed:", err.message);
    return [];
  }
}

export async function getAbout() {
  if (!notion || !DB_ABOUT) {
    return {
      headline: "Music, love and late nights.",
      body:
        "I'm Daniel — DJ Loves Me. I play sets that sit somewhere between bachata, house and whatever the room is asking for. Based in Barcelona, available worldwide. Wire up Notion to replace this placeholder from the About database.",
    };
  }

  try {
    const res = await notion.databases.query({
      database_id: DB_ABOUT,
      page_size: 1,
    });
    const page = res.results[0];
    if (!page) return { headline: "", body: "" };
    return {
      headline: readTitle(page),
      body: readRichText(page, "Body"),
    };
  } catch (err) {
    console.error("[notion] getAbout failed:", err.message);
    return { headline: "", body: "" };
  }
}
