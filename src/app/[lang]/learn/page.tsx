import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonsBySection, sections } from "@/content/lessons";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/learn">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).learn.title };
}

export default async function LearnPage({ params }: PageProps<"/[lang]/learn">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-4xl font-extrabold">{dict.learn.title}</h1>
      <p className="mt-2 text-muted">{dict.learn.subtitle}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const count = getLessonsBySection(section.slug).length;
          return (
            <Link
              key={section.slug}
              href={`/${lang}/learn/${section.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <span className="text-4xl" aria-hidden>
                {section.emoji}
              </span>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-brand">
                {section.title[lang]}
              </h2>
              <p className="mt-1 text-sm text-muted">{section.description[lang]}</p>
              <p className="mt-4 text-xs font-semibold text-accent">
                {count} {count === 1 ? dict.learn.lessonCountOne : dict.learn.lessonsCount}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
