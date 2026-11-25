import Link from "next/link";
import type { Lesson, Section } from "@/content/lessons";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PlayIcon } from "./SectionIcon";

const bands = [
  { band: "bg-brand", icon: "text-brand" },
  { band: "bg-brand-dark", icon: "text-brand" },
  { band: "bg-accent", icon: "text-accent" },
];

/** Lesson card with a coloured top band, as in the home page design. */
export function LessonCard({
  lesson,
  section,
  index,
  lang,
  levels,
}: {
  lesson: Lesson;
  section?: Section;
  index: number;
  lang: Locale;
  levels: Dictionary["learn"]["levels"];
}) {
  const tone = bands[index % bands.length];
  return (
    <Link
      href={`/${lang}/learn/${lesson.section}/${lesson.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className={`grid h-[150px] place-items-center ${tone.band}`}>
        <span
          className={`grid h-14 w-14 place-items-center rounded-full bg-white transition group-hover:scale-110 ${tone.icon}`}
        >
          <PlayIcon size={22} />
        </span>
      </div>
      <div className="flex flex-col gap-2 p-[22px]">
        <span className="text-xs font-bold uppercase tracking-[0.06em] text-accent">
          {section ? `${section.title[lang]} · ` : ""}
          {levels[lesson.level]}
        </span>
        <strong className="text-lg leading-snug group-hover:text-brand">{lesson.title[lang]}</strong>
        <span className="text-[15px] leading-normal text-muted">{lesson.summary[lang]}</span>
      </div>
    </Link>
  );
}
