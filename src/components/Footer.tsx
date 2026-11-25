import type { Dictionary } from "@/lib/i18n";

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="mt-[88px] border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-8 text-sm text-muted">
        <p>
          <strong className="text-brand">
            Learning<span className="text-accent">Panama</span>
          </strong>
          <span className="ml-2">{footer.tagline}</span>
        </p>
        <p>© LearningPanama. {footer.rights}</p>
      </div>
    </footer>
  );
}
