import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).contact.title };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contact } = getDictionary(lang);

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <h1 className="text-4xl font-extrabold">{contact.title}</h1>
      <p className="mt-2 text-muted">{contact.subtitle}</p>
      <div className="mt-8">
        <ContactForm labels={contact} />
      </div>
    </div>
  );
}
