import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillCard } from "@/components/SkillCard";
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
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-[72px]">
      <h1 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">{dict.learn.title}</h1>
      <p className="mt-3 text-[17px] text-muted">{dict.learn.subtitle}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => {
          const count = getLessonsBySection(section.slug).length;
          return (
            <SkillCard
              key={section.slug}
              section={section}
              index={index}
              lang={lang}
              cta={dict.home.seeLessons}
              meta={`${count} ${count === 1 ? dict.learn.lessonCountOne : dict.learn.lessonsCount}`}
            />
          );
        })}
      </div>
    </div>
  );
}
