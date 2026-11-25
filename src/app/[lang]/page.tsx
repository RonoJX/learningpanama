import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons, sections } from "@/content/lessons";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const featured = lessons.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            {dict.home.badge}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {dict.home.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{dict.home.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/learn`}
              className="rounded-full bg-white px-6 py-3 font-semibold text-brand transition hover:bg-accent hover:text-white"
            >
              {dict.home.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}/resources`}
              className="rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl font-bold">{dict.home.sectionsTitle}</h2>
        <p className="mt-2 text-muted">{dict.home.sectionsSubtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/${lang}/learn/${section.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <span className="text-4xl" aria-hidden>
                {section.emoji}
              </span>
              <h3 className="mt-3 text-xl font-semibold group-hover:text-brand">
                {section.title[lang]}
              </h3>
              <p className="mt-1 text-sm text-muted">{section.description[lang]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl font-bold">{dict.home.featuredTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featured.map((lesson) => (
            <Link
              key={`${lesson.section}/${lesson.slug}`}
              href={`/${lang}/learn/${lesson.section}/${lesson.slug}`}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {sections.find((s) => s.slug === lesson.section)?.title[lang]}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{lesson.title[lang]}</h3>
              <p className="mt-1 text-sm text-muted">{lesson.summary[lang]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl font-bold">{dict.home.howTitle}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {dict.home.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl bg-brand/5 p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-accent p-8 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">{dict.home.bandTitle}</h2>
            <p className="mt-1 text-white/90">{dict.home.bandText}</p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="rounded-full bg-white px-6 py-3 font-semibold text-accent transition hover:bg-brand hover:text-white"
          >
            {dict.home.bandCta}
          </Link>
        </div>
      </section>
    </>
  );
}
