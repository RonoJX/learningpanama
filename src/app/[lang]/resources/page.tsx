import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resources } from "@/content/resources";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/resources">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).resources.title };
}

export default async function ResourcesPage({
  params,
}: PageProps<"/[lang]/resources">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-extrabold">{dict.resources.title}</h1>
      <p className="mt-2 text-muted">{dict.resources.subtitle}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <li key={resource.url} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">{resource.title}</h2>
            <p className="mt-1 text-sm text-muted">{resource.description[lang]}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
            >
              {dict.resources.open} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
