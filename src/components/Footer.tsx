import type { Dictionary } from "@/lib/i18n";

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="mt-20 border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-brand">
          Learning<span className="text-accent">Panama</span>
          <span className="ml-2 font-normal text-muted">{footer.tagline}</span>
        </p>
        <p>
          © LearningPanama. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
