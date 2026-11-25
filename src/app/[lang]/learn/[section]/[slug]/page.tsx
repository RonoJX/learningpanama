import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoEmbed } from "@/components/VideoEmbed";
import { WordList } from "@/components/WordList";
import {
  getAdjacentLessons,
  getLesson,
  getLessonsBySection,
  getSection,
  lessons,
} from "@/content/lessons";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    lessons.map((lesson) => ({ lang, section: lesson.section, slug: lesson.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/learn/[section]/[slug]">): Promise<Metadata> {
  const { lang, section, slug } = await params;
  const lesson = getLesson(section, slug);
  if (!hasLocale(lang) || !lesson) return {};
  return { title: lesson.title[lang], description: lesson.summary[lang] };
}

export default async function LessonPage({
  params,
}: PageProps<"/[lang]/learn/[section]/[slug]">) {
  const { lang, section: sectionSlug, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const lesson = getLesson(sectionSlug, slug);
  const section = getSection(sectionSlug);
  if (!lesson || !section) notFound();

  const dict = getDictionary(lang);
  const others = getLessonsBySection(section.slug).filter((item) => item.slug !== lesson.slug);
  const { prev, next } = getAdjacentLessons(lesson);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:py-[72px]">
      <Link
        href={`/${lang}/learn/${section.slug}`}
        className="text-sm font-semibold text-brand hover:text-accent"
      >
        ← {section.title[lang]}
      </Link>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.06em] text-accent">
        {section.title[lang]} · {dict.learn.levels[lesson.level]}
      </p>
      <h1 className="mt-2 text-3xl leading-tight font-extrabold tracking-[-0.02em] sm:text-[44px]">
        {lesson.title[lang]}
      </h1>
      <p className="mt-3 text-lg text-muted">{lesson.summary[lang]}</p>

      <div className="mt-8">
        <VideoEmbed
          videoId={lesson.videoId}
          title={lesson.title[lang]}
          labels={dict.learn}
        />
      </div>

      <div className="mt-8 space-y-4 text-lg leading-relaxed">
        {lesson.body[lang].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {lesson.words && lesson.words.length > 0 && (
        <WordList words={lesson.words} labels={dict.learn} />
      )}

      <div className="mt-10 grid gap-5">
        <section className="rounded-[18px] border border-border bg-card p-6 sm:p-[26px]">
          <h2 className="text-xl font-bold text-brand">{dict.learn.keyPoints}</h2>
          <ul className="mt-4 space-y-3">
            {lesson.keyPoints[lang].map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/8 text-brand"
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[18px] border border-accent/25 bg-accent/5 p-6 sm:p-[26px]">
          <h2 className="text-xl font-bold text-accent">{dict.learn.practice}</h2>
          <ol className="mt-4 space-y-3">
            {lesson.practice[lang].map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">{dict.learn.moreInSection}</h2>
          <ul className="mt-3 space-y-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${lang}/learn/${item.section}/${item.slug}`}
                  className="font-semibold text-brand hover:text-accent"
                >
                  {item.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav
        aria-label={`${dict.learn.prev} / ${dict.learn.next}`}
        className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/${lang}/learn/${prev.section}/${prev.slug}`}
            className="group rounded-[18px] border border-border bg-card p-5 transition hover:border-brand/40 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              ← {dict.learn.prev}
            </span>
            <span className="mt-1 block font-semibold group-hover:text-brand">
              {prev.title[lang]}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`/${lang}/learn/${next.section}/${next.slug}`}
            className="group rounded-2xl border border-border bg-card p-4 text-right transition hover:border-brand/40 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {dict.learn.next} →
            </span>
            <span className="mt-1 block font-semibold group-hover:text-brand">
              {next.title[lang]}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
