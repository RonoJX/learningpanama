"use client";

import { useEffect, useState } from "react";
import type { Word } from "@/content/lessons";
import type { Dictionary } from "@/lib/i18n";
import { PlayIcon } from "./SectionIcon";

type Labels = Pick<Dictionary["learn"], "wordsTitle" | "wordsHint" | "play" | "playSlow" | "noAudio">;

/** Picks an English voice, preferring US English, then any English voice. */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-US" && v.localService) ??
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang.startsWith("en"))
  );
}

export function WordList({
  words,
  labels,
  compact = false,
}: {
  words: Word[];
  labels: Labels;
  /** Compact: no title/hint and a single column (used in the home hero card). */
  compact?: boolean;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState<string | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    // Some browsers load voices asynchronously; asking once warms the list up.
    window.speechSynthesis.getVoices();
    return () => window.speechSynthesis.cancel();
  }, []);

  function speak(text: string, rate: number, key: string) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    setSpeaking(key);
    synth.speak(utterance);
  }

  const list = (
    <ul className={`grid gap-2 ${compact ? "" : "mt-4 sm:grid-cols-2"}`}>
      {words.map((word) => (
        <li
          key={word.en}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card py-2 pr-2 pl-4"
        >
          <div className="min-w-0">
            <strong className="text-[17px]">{word.en}</strong>{" "}
            <span className="text-sm text-muted">{word.es}</span>
          </div>
          {supported && (
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => speak(word.en, 0.9, `${word.en}-n`)}
                aria-label={`${labels.play}: ${word.en}`}
                title={labels.play}
                className={`grid h-11 w-11 place-items-center rounded-[10px] text-white transition ${
                  speaking === `${word.en}-n` ? "bg-accent" : "bg-brand hover:bg-brand-dark"
                }`}
              >
                <PlayIcon />
              </button>
              <button
                type="button"
                onClick={() => speak(word.en, 0.55, `${word.en}-s`)}
                aria-label={`${labels.playSlow}: ${word.en}`}
                title={labels.playSlow}
                className={`grid h-11 w-11 place-items-center rounded-[10px] border text-xs font-bold transition ${
                  speaking === `${word.en}-s`
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-brand hover:border-brand"
                }`}
              >
                0.5×
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  if (compact) return list;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">{labels.wordsTitle}</h2>
      <p className="mt-1 text-sm text-muted">{supported ? labels.wordsHint : labels.noAudio}</p>
      {list}
    </section>
  );
}
