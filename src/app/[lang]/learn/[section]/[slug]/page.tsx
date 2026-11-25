import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getLesson, getLessonsBySection, getSection, lessons } from "@/content/lessons";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link
        href={`/${lang}/learn/${section.slug}`}
        className="text-sm font-medium text-brand hover:underline"
      >
        ← {section.title[lang]}
      </Link>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-accent">
        {section.title[lang]} · {dict.learn.level}: {dict.learn.levels[lesson.level]}
      </p>
      <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{lesson.title[lang]}</h1>
      <p className="mt-2 text-lg text-muted">{lesson.summary[lang]}</p>

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

      <section className="mt-10 rounded-2xl bg-brand/5 p-6">
        <h2 className="text-xl font-bold text-brand">{dict.learn.keyPoints}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {lesson.keyPoints[lang].map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="text-xl font-bold text-accent">{dict.learn.practice}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {lesson.practice[lang].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">{dict.learn.moreInSection}</h2>
          <ul className="mt-3 space-y-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${lang}/learn/${item.section}/${item.slug}`}
                  className="font-medium text-brand hover:underline"
                >
                  {item.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
