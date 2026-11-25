# LearningPanama

English lessons site (EN/ES). Next.js 16 + Tailwind 4.

```bash
npm run dev      # http://localhost:3000  (redirects to /en or /es)
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| UI texts (EN / ES) | `src/dictionaries/en.json`, `es.json` |
| Lessons, sections | `src/content/lessons.ts` |
| Resource links | `src/content/resources.ts` |
| Brand colors | `src/app/globals.css` (`--brand`, `--accent`) |
| Contact endpoint | `src/app/api/contact/route.ts` |

## Add a lesson

Add an object to `lessons` in `src/content/lessons.ts` (title, summary, body, keyPoints and practice in both languages).
Put the YouTube id in `videoId` (the part after `v=`); with `null` the page shows "Video coming soon".

## Contact form email

Copy `.env.example` to `.env.local` and fill in a [Resend](https://resend.com) key.
Without it, messages are only logged in development and the endpoint returns 503 in production.
