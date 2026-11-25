import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Docker on Windows: bind mounts don't emit file events, so poll for changes.
  // Only enabled when WATCH_POLL_MS is set (see docker-compose.yml).
  ...(process.env.WATCH_POLL_MS
    ? { watchOptions: { pollIntervalMs: Number(process.env.WATCH_POLL_MS) } }
    : {}),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
