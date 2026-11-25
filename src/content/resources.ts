import type { Localized } from "./lessons";

export type Resource = {
  title: string;
  url: string;
  description: Localized;
};

export const resources: Resource[] = [
  {
    title: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    description: {
      en: "Free lessons, videos and podcasts from the BBC.",
      es: "Lecciones, videos y podcasts gratuitos de la BBC.",
    },
  },
  {
    title: "Cambridge Dictionary",
    url: "https://dictionary.cambridge.org",
    description: {
      en: "Definitions, examples and audio pronunciation (UK and US).",
      es: "Definiciones, ejemplos y pronunciación en audio (UK y US).",
    },
  },
  {
    title: "Forvo",
    url: "https://forvo.com",
    description: {
      en: "Hear how native speakers pronounce any word.",
      es: "Escucha cómo pronuncian cualquier palabra los hablantes nativos.",
    },
  },
  {
    title: "TED Talks",
    url: "https://www.ted.com/talks",
    description: {
      en: "Great listening practice with English transcripts.",
      es: "Excelente práctica de listening con transcripciones en inglés.",
    },
  },
  {
    title: "Merriam-Webster Learner's Dictionary",
    url: "https://www.learnersdictionary.com",
    description: {
      en: "A dictionary written for English learners.",
      es: "Un diccionario hecho para estudiantes de inglés.",
    },
  },
];
