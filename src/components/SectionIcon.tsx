import type { SectionSlug } from "@/content/lessons";

const paths: Record<SectionSlug, React.ReactNode> = {
  pronunciation: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
    </>
  ),
  writing: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  listening: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="17" y="14" width="4" height="7" rx="1" />
    </>
  ),
  speaking: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  grammar: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />,
  vocabulary: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9h10M7 13h6" />
    </>
  ),
};

/** Alternating blue / red tone, following the order of sections. */
export const sectionTone = (index: number) => (index % 2 === 0 ? "brand" : "accent");

export function SectionIcon({
  slug,
  tone = "brand",
  size = "md",
}: {
  slug: SectionSlug;
  tone?: "brand" | "accent";
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-12 w-12 rounded-xl";
  const color = tone === "brand" ? "bg-brand/8 text-brand" : "bg-accent/8 text-accent";
  return (
    <span className={`grid shrink-0 place-items-center ${box} ${color}`}>
      <svg
        width={size === "lg" ? 28 : 24}
        height={size === "lg" ? 28 : 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths[slug]}
      </svg>
    </span>
  );
}

export function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}
