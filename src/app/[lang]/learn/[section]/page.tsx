import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonCard } from "@/components/LessonCard";
import { SectionIcon, sectionTone } from "@/components/SectionIcon";
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
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-[72px]">
      <Link href={`/${lang}/learn`} className="text-sm font-semibold text-brand hover:text-accent">
        ← {dict.learn.backToLessons}
      </Link>
      <div className="mt-6 flex items-center gap-4">
        <SectionIcon slug={section.slug} tone={sectionTone(sections.indexOf(section))} size="lg" />
        <h1 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
          {section.title[lang]}
        </h1>
      </div>
      <p className="mt-3 text-[17px] text-muted">{section.description[lang]}</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((lesson, index) => (
          <LessonCard
            key={lesson.slug}
            lesson={lesson}
            index={index}
            lang={lang}
            levels={dict.learn.levels}
          />
        ))}
      </div>
    </div>
  );
}
