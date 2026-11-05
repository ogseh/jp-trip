# 日本冒険譚 · Japan Quest 2027

A JRPG-flavoured trip planner for our Japan trip (Jan 21 – Feb 6, 2027):
Osaka → Himeji → Kobe → Takamatsu & the art islands → Kyoto → Tokyo.

## What's on the site

- **World Map**: day-by-day route on an animated map of Japan. Pick a day, press PLAY, or use ← →.
- **Calendar**: the whole trip, Jan 18 – Feb 7, weeks starting on Monday.
- **Stages**: accommodation options with P1–P4 voting stamps, how we get there, and local transport for each city.
- **Quest Log**: planned activities by day, with category filters and checkboxes (saved in your browser).
- **Treasury**: accommodation and transport costs per person and for all four, using each city's top-voted stay,
  plus rail-pass toggles and ways to save.

## Editing the plan

Everything comes from **`js/data.js`** (days, activities, transport, passes) and **`js/stays.js`** (accommodation options).
Edit that file and refresh the page. Prices are rough per-person estimates in yen.

## Run locally

It's a plain static site with no build step. Any static server works:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` straight from disk won't work, because browsers block ES modules on `file://`.)

## Deploy to Vercel

Import the repo in Vercel and keep the defaults (Framework preset: **Other**, no build command,
output directory = repo root). Or from the CLI, run `npx vercel` in this folder.

## Shared voting on Vercel

Votes go to a small serverless function (`api/votes.js`) that stores them in Upstash Redis:

1. In the Vercel project, open **Storage → Create → Upstash for Redis** (free tier) and connect it to the project.
   This adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables.
2. Redeploy. The Stages section then says "Votes are shared with everyone".

Without a database, votes are saved only in each person's browser. There are no accounts: anyone with the
link can stamp for any of P1–P4, so share the link only with the group.

## Files

- `index.html`: page structure
- `css/style.css`: styling and animations
- `js/data.js`: **the trip data (edit me)**
- `js/stays.js`: accommodation options per city
- `js/votes.js`: voting storage (claude.ai artifact database, Vercel API, or this browser)
- `api/votes.js`: Vercel function that stores votes
- `js/main.js`: map, panels and cost calculations
- `js/japan-geo.js`: Japan outline (generated from Natural Earth via world-atlas)
