import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonsBySection, getSection, sections } from "@/content/lessons";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    sections.map((section) => ({ lang, section: section.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/learn/[section]">): Promise<Metadata> {
  const { lang, section: slug } = await params;
  const section = getSection(slug);
  if (!hasLocale(lang) || !section) return {};
  return { title: section.title[lang], description: section.description[lang] };
}

export default async function SectionPage({
  params,
}: PageProps<"/[lang]/learn/[section]">) {
  const { lang, section: slug } = await params;
  if (!hasLocale(lang)) notFound();
  const section = getSection(slug);
  if (!section) notFound();
  const dict = getDictionary(lang);
  const items = getLessonsBySection(section.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <Link href={`/${lang}/learn`} className="text-sm font-medium text-brand hover:underline">
        ← {dict.learn.backToLessons}
      </Link>
      <h1 className="mt-4 text-4xl font-extrabold">
        <span aria-hidden>{section.emoji}</span> {section.title[lang]}
      </h1>
      <p className="mt-2 text-muted">{section.description[lang]}</p>

      <ul className="mt-10 space-y-4">
        {items.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/${lang}/learn/${section.slug}/${lesson.slug}`}
              className="block rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{lesson.title[lang]}</h2>
                <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {dict.learn.levels[lesson.level]}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{lesson.summary[lang]}</p>
              <p className="mt-3 text-sm font-semibold text-accent">{dict.learn.start} →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
