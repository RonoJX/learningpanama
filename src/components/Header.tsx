"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

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
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-brand">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm text-white">
            LP
          </span>
          <span className="text-lg">
            Learning<span className="text-accent">Panama</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-brand/10 ${
                isActive(link.href) ? "text-brand" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            hrefLang={other}
            className="ml-2 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            {nav.switchLanguage}
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
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
                  className={`block rounded-lg px-3 py-2 font-medium ${
                    isActive(link.href) ? "bg-brand/10 text-brand" : "text-muted"
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
                className="block rounded-lg px-3 py-2 font-semibold text-accent"
              >
                {nav.switchLanguage}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
