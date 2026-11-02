# 日本冒険譚 · Japan Quest 2027

A JRPG-flavoured trip planner for our Japan trip (Jan 21 – Feb 6, 2027):
Osaka → Himeji → Kobe → Takamatsu & the art islands → Kyoto → Tokyo.

## What's on the site

- **World Map**: day-by-day route on an animated map of Japan. Pick a day, press PLAY, or use ← →.
- **Stages**: accommodation, how we get there, and local transport for each city.
- **Quest Log**: planned activities by day, with category filters and checkboxes (saved in your browser).
- **Treasury**: estimated costs per person and for the whole party, by category and city. You can switch
  between JPY, USD and EUR, and toggle the Kansai Wide Area Pass.

## Editing the plan

Everything comes from **`js/data.js`**: days, activities, hotels, transport and prices.
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

## Files

- `index.html`: page structure
- `css/style.css`: styling and animations
- `js/data.js`: **the trip data (edit me)**
- `js/main.js`: map, panels and cost calculations
- `js/japan-geo.js`: Japan outline (generated from Natural Earth via world-atlas)
