import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).about.title };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { about } = getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-[72px]">
      <h1 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">{about.title}</h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-12 rounded-3xl border border-border bg-card p-7 sm:p-10">
        <h2 className="text-2xl font-extrabold">{about.valuesTitle}</h2>
        <ul className="mt-6 space-y-4">
          {about.values.map((value, index) => (
            <li key={value} className="flex gap-3">
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  index % 2 === 0 ? "bg-brand/8 text-brand" : "bg-accent/8 text-accent"
                }`}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
