import type { Dictionary } from "@/lib/i18n";
import { PlayIcon } from "./SectionIcon";

export function VideoEmbed({
  videoId,
  title,
  labels,
}: {
  videoId: string | null;
  title: string;
  labels: Pick<Dictionary["learn"], "videoSoon" | "videoSoonText">;
}) {
  if (!videoId) {
    return (
      <div className="grid aspect-video place-items-center rounded-[18px] border border-dashed border-brand/30 bg-brand/5 p-6 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand">
            <PlayIcon size={22} />
          </span>
          <p className="mt-2 text-lg font-semibold text-brand">{labels.videoSoon}</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted">{labels.videoSoonText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-[18px] border border-border bg-black shadow-sm">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
