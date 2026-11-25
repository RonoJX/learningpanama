"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { GlobeIcon } from "./SectionIcon";

export function Logo({ lang }: { lang: Locale }) {
  return (
    <Link href={`/${lang}`} className="flex items-center gap-2.5 font-bold text-brand">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] bg-brand text-sm text-white">
        LP
        <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-accent" aria-hidden />
      </span>
      <span className="text-[19px]">
        Learning<span className="text-accent">Panama</span>
      </span>
    </Link>
  );
}

export function Header({
  lang,
  nav,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other: Locale = lang === "en" ? "es" : "en";
  const switchHref = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${other}`) || `/${other}`;

  const links = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/learn`, label: nav.learn },
    { href: `/${lang}/resources`, label: nav.resources },
    { href: `/${lang}/about`, label: nav.about },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4">
        <Logo lang={lang} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-[10px] px-3.5 py-2.5 text-[15px] transition ${
                isActive(link.href)
                  ? "bg-brand/8 font-semibold text-brand"
                  : "font-medium text-muted hover:text-brand"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            hrefLang={other}
            className="ml-2 flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <GlobeIcon />
            {nav.switchLanguage}
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-[10px] border border-border px-3.5 text-sm font-semibold text-brand md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
          {nav.menu}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-4 pb-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-[10px] px-3.5 py-3 ${
                    isActive(link.href) ? "bg-brand/8 font-semibold text-brand" : "font-medium text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={switchHref}
                hrefLang={other}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-[10px] px-3.5 py-3 font-semibold text-brand"
              >
                <GlobeIcon />
                {nav.switchLanguage}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
