# LearningPanama

English lessons site (EN/ES). Next.js 16 + Tailwind 4.

```bash
npm run dev      # http://localhost:3000  (redirects to /en or /es)
npm run build && npm start
```

## Docker (development mode)

```bash
docker compose up --build      # first time / after changing package.json
docker compose up -d           # afterwards, in the background
docker compose logs -f web     # watch logs
docker compose down            # stop
```

App at http://localhost:3000. Edits to your files hot-reload inside the container.
If you add or update an npm package: `docker compose down -v && docker compose up --build`
(`-v` resets the `node_modules` volume so it picks up the new install).

## Docker (production)

Not needed for Vercel (Vercel builds straight from the Git repository).
Useful to test the real production build locally or to deploy on any Docker host.

```bash
docker compose -f docker-compose.prod.yml up -d --build   # http://localhost:8080
docker compose -f docker-compose.prod.yml down
```

Multi-stage image (~300 MB) running Next.js `standalone` output as the non-root `node` user,
read-only filesystem, with a health check. It runs alongside the development container.

## Where things live

| What | Where |
|---|---|
| UI texts (EN / ES) | `src/dictionaries/en.json`, `es.json` |
| Lessons, sections | `src/content/lessons.ts` |
| Resource links | `src/content/resources.ts` |
| Brand colors | `src/app/globals.css` (`--brand`, `--accent`) |

## Add a lesson

Add an object to `lessons` in `src/content/lessons.ts` (title, summary, body, keyPoints and practice in both languages).
Put the YouTube id in `videoId` (the part after `v=`); with `null` the page shows "Video coming soon".
