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
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-[72px]">
      <h1 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
        {dict.resources.title}
      </h1>
      <p className="mt-3 text-[17px] text-muted">{dict.resources.subtitle}</p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <li key={resource.url}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-3 rounded-[18px] border border-border bg-card p-[26px] transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  index % 2 === 0 ? "bg-brand/8 text-brand" : "bg-accent/8 text-accent"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                  <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                </svg>
              </span>
              <strong className="text-lg group-hover:text-brand">{resource.title}</strong>
              <span className="text-[15px] leading-relaxed text-muted">{resource.description[lang]}</span>
              <span className="mt-auto text-sm font-semibold text-brand">{dict.resources.open} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
