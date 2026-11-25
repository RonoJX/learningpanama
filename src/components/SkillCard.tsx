import Link from "next/link";
import type { Section } from "@/content/lessons";
import type { Locale } from "@/lib/i18n";
import { SectionIcon, sectionTone } from "./SectionIcon";

export function SkillCard({
  section,
  index,
  lang,
  cta,
  meta,
}: {
  section: Section;
  index: number;
  lang: Locale;
  cta: string;
  meta?: string;
}) {
  return (
    <Link
      href={`/${lang}/learn/${section.slug}`}
      className="group flex flex-col gap-3 rounded-[18px] border border-border bg-card p-[26px] transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
    >
      <SectionIcon slug={section.slug} tone={sectionTone(index)} />
      <strong className="text-xl group-hover:text-brand">{section.title[lang]}</strong>
      <span className="text-[15px] leading-relaxed text-muted">{section.description[lang]}</span>
      <span className="mt-auto flex items-center justify-between gap-2 text-sm font-semibold text-brand">
        <span>{cta} →</span>
        {meta && <span className="font-medium text-muted">{meta}</span>}
      </span>
    </Link>
  );
}
