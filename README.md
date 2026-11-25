# LearningPanama

English lessons site (EN/ES). Next.js 16 + Tailwind 4.

```bash
npm run dev      # http://localhost:3000  (redirects to /en or /es)
npm run build && npm start
```

## Docker (production)

Not needed for Vercel (Vercel builds straight from the Git repository).
Useful to test the real production build locally or to deploy on any Docker host.

```bash
docker compose up -d --build   # http://localhost:8080 (rebuild after every change)
docker compose logs -f web     # watch logs
docker compose down            # stop
```

Multi-stage image (~300 MB) running Next.js `standalone` output as the non-root `node` user,
read-only filesystem, with a health check.

## Where things live

| What | Where |
|---|---|
| UI texts (EN / ES) | `src/dictionaries/en.json`, `es.json` |
| Sections | `src/content/lessons.ts` |
| Lessons (one file per section) | `src/content/lesson-data/*.ts` |
| Resource links | `src/content/resources.ts` |
| Brand colors | `src/app/globals.css` (`--brand`, `--accent`) |

## Add a lesson

Add an object to the section's file in `src/content/lesson-data/` (title, summary, body, keyPoints and practice in both languages).
Put the YouTube id in `videoId` (the part after `v=`); with `null` the page shows "Video coming soon".
Optional `words: [{ en: "boarding pass", es: "pase de abordar" }]` adds the "Listen and repeat" audio list.
