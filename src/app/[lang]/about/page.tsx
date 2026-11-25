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
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl font-extrabold">{about.title}</h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <h2 className="mt-10 text-2xl font-bold">{about.valuesTitle}</h2>
      <ul className="mt-4 space-y-2">
        {about.values.map((value) => (
          <li key={value} className="flex gap-3">
            <span className="mt-1 text-accent" aria-hidden>
              ✔
            </span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
