import type { Locale } from "@/lib/i18n";
import { grammarLessons } from "./lesson-data/grammar";
import { listeningLessons } from "./lesson-data/listening";
import { pronunciationLessons } from "./lesson-data/pronunciation";
import { speakingLessons } from "./lesson-data/speaking";
import { vocabularyLessons } from "./lesson-data/vocabulary";
import { writingLessons } from "./lesson-data/writing";

export type Localized<T = string> = Record<Locale, T>;

export const sectionSlugs = [
  "pronunciation",
  "writing",
  "listening",
  "speaking",
  "grammar",
  "vocabulary",
] as const;
export type SectionSlug = (typeof sectionSlugs)[number];

export type Section = {
  slug: SectionSlug;
  title: Localized;
  description: Localized;
};

export const sections: Section[] = [
  {
    slug: "pronunciation",
    title: { en: "Pronunciation", es: "Pronunciación" },
    description: {
      en: "Master English sounds, stress and rhythm.",
      es: "Domina los sonidos, el acento y el ritmo del inglés.",
    },
  },
  {
    slug: "writing",
    title: { en: "Writing", es: "Escritura" },
    description: {
      en: "From simple sentences to clear paragraphs.",
      es: "De oraciones simples a párrafos claros.",
    },
  },
  {
    slug: "listening",
    title: { en: "Listening", es: "Listening" },
    description: {
      en: "Understand real English at natural speed.",
      es: "Entiende el inglés real a velocidad natural.",
    },
  },
  {
    slug: "speaking",
    title: { en: "Speaking", es: "Speaking" },
    description: {
      en: "Build fluency and confidence in conversation.",
      es: "Gana fluidez y confianza al conversar.",
    },
  },
  {
    slug: "grammar",
    title: { en: "Grammar", es: "Gramática" },
    description: {
      en: "The rules you need, explained simply.",
      es: "Las reglas que necesitas, explicadas fácil.",
    },
  },
  {
    slug: "vocabulary",
    title: { en: "Vocabulary", es: "Vocabulario" },
    description: {
      en: "Useful words by topic: work, travel, shopping and more.",
      es: "Palabras útiles por tema: trabajo, viajes, compras y más.",
    },
  },
];

export type Level = "beginner" | "intermediate" | "advanced";

/** A word or phrase the student can listen to. `en` is spoken aloud. */
export type Word = {
  en: string;
  es: string;
};

export type Lesson = {
  section: SectionSlug;
  slug: string;
  level: Level;
  /** YouTube video id. Leave null until the video is published. */
  videoId: string | null;
  title: Localized;
  summary: Localized;
  body: Localized<string[]>;
  keyPoints: Localized<string[]>;
  practice: Localized<string[]>;
  /** Optional list of words with a play button to hear the pronunciation. */
  words?: Word[];
};

/** All lessons, in the order they appear on the site (section order, then file order). */
export const lessons: Lesson[] = [
  ...pronunciationLessons,
  ...writingLessons,
  ...listeningLessons,
  ...speakingLessons,
  ...grammarLessons,
  ...vocabularyLessons,
];

export const getSection = (slug: string) =>
  sections.find((section) => section.slug === slug);

export const getLessonsBySection = (slug: string) =>
  lessons.filter((lesson) => lesson.section === slug);

export const getLesson = (section: string, slug: string) =>
  lessons.find((lesson) => lesson.section === section && lesson.slug === slug);

/** Previous and next lesson across the whole course. */
export function getAdjacentLessons(lesson: Lesson) {
  const index = lessons.indexOf(lesson);
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}
