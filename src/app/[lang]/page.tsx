import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonCard } from "@/components/LessonCard";
import { SkillCard } from "@/components/SkillCard";
import { WordList } from "@/components/WordList";
import { getSection, lessons, sections } from "@/content/lessons";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const featured = lessons.slice(0, 3);
  const preview = lessons.find((lesson) => lesson.words?.length) ?? lessons[0];
  const previewSection = getSection(preview.section);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden
          className="absolute -top-[120px] -right-[120px] h-[420px] w-[420px] rounded-full border-[56px] border-white/6"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:pt-[88px] sm:pb-24 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-[22px]">
            <span className="flex items-center gap-2 self-start rounded-full bg-white/14 px-3.5 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-[#FF6B81]" aria-hidden />
              {dict.home.badge}
            </span>
            <h1 className="text-[40px] leading-[1.04] font-extrabold tracking-[-0.02em] sm:text-[62px]">
              {dict.home.title}
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-white/86 sm:text-[19px]">
              {dict.home.subtitle}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/learn`}
                className="rounded-full bg-white px-[26px] py-[15px] font-bold text-brand transition hover:bg-accent hover:text-white"
              >
                {dict.home.ctaPrimary}
              </Link>
              <Link
                href={`/${lang}/resources`}
                className="rounded-full border border-white/45 px-[26px] py-[15px] font-semibold transition hover:bg-white/10"
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/80">
              <span>
                {sections.length} {dict.home.statSkills}
              </span>
              <span>{dict.home.statFree}</span>
              <span>{dict.home.statBilingual}</span>
            </div>
          </div>

          {/* Lesson preview card with working audio */}
          <div className="flex flex-col gap-[18px] rounded-[22px] bg-white p-6 text-foreground shadow-[0_30px_60px_rgba(4,20,52,0.35)] sm:p-7">
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-accent">
              {previewSection?.title[lang]} · {dict.learn.levels[preview.level]}
            </span>
            <h2 className="text-[22px] font-bold">{preview.title[lang]}</h2>
            <p className="text-sm font-semibold text-muted">{dict.learn.wordsTitle}</p>
            {preview.words && (
              <WordList words={preview.words.slice(0, 3)} labels={dict.learn} compact />
            )}
            <Link
              href={`/${lang}/learn/${preview.section}/${preview.slug}`}
              className="text-[15px] font-semibold text-brand hover:text-accent"
            >
              {dict.learn.start} →
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-4 pt-[88px]">
        <h2 className="text-3xl font-extrabold tracking-[-0.01em] sm:text-4xl">
          {dict.home.sectionsTitle}
        </h2>
        <p className="mt-2 mb-8 text-[17px] text-muted">{dict.home.sectionsSubtitle}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <SkillCard
              key={section.slug}
              section={section}
              index={index}
              lang={lang}
              cta={dict.home.seeLessons}
            />
          ))}
        </div>
      </section>

      {/* Featured lessons */}
      <section className="mx-auto max-w-6xl px-4 pt-[88px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{dict.home.featuredTitle}</h2>
          <Link href={`/${lang}/learn`} className="font-semibold text-brand hover:text-accent">
            {dict.home.allLessons} →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((lesson, index) => (
            <LessonCard
              key={`${lesson.section}/${lesson.slug}`}
              lesson={lesson}
              section={getSection(lesson.section)}
              index={index}
              lang={lang}
              levels={dict.learn.levels}
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pt-[88px]">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-12">
          <h2 className="mb-8 text-3xl font-extrabold sm:text-4xl">{dict.home.howTitle}</h2>
          <ol className="grid gap-8 md:grid-cols-3 md:gap-5">
            {dict.home.steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-2.5">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full font-bold text-white ${
                    index === dict.home.steps.length - 1 ? "bg-accent" : "bg-brand"
                  }`}
                >
                  {index + 1}
                </span>
                <strong className="text-lg">{step.title}</strong>
                <span className="text-[15px] leading-relaxed text-muted">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
