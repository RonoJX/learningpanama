import Link from "next/link";

// The locale isn't available here, so show both languages.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found · Página no encontrada</h1>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/en" className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white">
          English
        </Link>
        <Link href="/es" className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white">
          Español
        </Link>
      </div>
    </div>
  );
}
