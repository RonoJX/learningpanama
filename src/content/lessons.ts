import type { Locale } from "@/lib/i18n";

export type Localized<T = string> = Record<Locale, T>;

export const sectionSlugs = [
  "pronunciation",
  "writing",
  "listening",
  "speaking",
  "grammar",
] as const;
export type SectionSlug = (typeof sectionSlugs)[number];

export type Section = {
  slug: SectionSlug;
  emoji: string;
  title: Localized;
  description: Localized;
};

export const sections: Section[] = [
  {
    slug: "pronunciation",
    emoji: "🗣️",
    title: { en: "Pronunciation", es: "Pronunciación" },
    description: {
      en: "Master English sounds, stress and rhythm.",
      es: "Domina los sonidos, el acento y el ritmo del inglés.",
    },
  },
  {
    slug: "writing",
    emoji: "✍️",
    title: { en: "Writing", es: "Escritura" },
    description: {
      en: "From simple sentences to clear paragraphs.",
      es: "De oraciones simples a párrafos claros.",
    },
  },
  {
    slug: "listening",
    emoji: "🎧",
    title: { en: "Listening", es: "Listening" },
    description: {
      en: "Understand real English at natural speed.",
      es: "Entiende el inglés real a velocidad natural.",
    },
  },
  {
    slug: "speaking",
    emoji: "💬",
    title: { en: "Speaking", es: "Speaking" },
    description: {
      en: "Build fluency and confidence in conversation.",
      es: "Gana fluidez y confianza al conversar.",
    },
  },
  {
    slug: "grammar",
    emoji: "📘",
    title: { en: "Grammar", es: "Gramática" },
    description: {
      en: "The rules you need, explained simply.",
      es: "Las reglas que necesitas, explicadas fácil.",
    },
  },
];

export type Level = "beginner" | "intermediate" | "advanced";

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
};

export const lessons: Lesson[] = [
  {
    section: "pronunciation",
    slug: "th-sounds",
    level: "beginner",
    videoId: null,
    title: {
      en: "The TH sounds: think vs. this",
      es: "Los sonidos TH: think vs. this",
    },
    summary: {
      en: "Two sounds Spanish doesn't have, and how to make them.",
      es: "Dos sonidos que el español no tiene y cómo producirlos.",
    },
    body: {
      en: [
        "English has two TH sounds. The voiceless /θ/ appears in words like think, three and bath. The voiced /ð/ appears in this, that and mother.",
        "To make both sounds, place the tip of your tongue lightly between your teeth and let the air flow. For /θ/ only air comes out. For /ð/ your vocal cords vibrate, like a soft buzz.",
        "A common mistake is replacing TH with /s/, /t/ or /d/ (saying 'sink' for think, or 'dis' for this). Slow down and make sure you can feel the tongue touching your teeth.",
      ],
      es: [
        "El inglés tiene dos sonidos TH. El sordo /θ/ aparece en palabras como think, three y bath. El sonoro /ð/ aparece en this, that y mother.",
        "Para ambos sonidos, coloca la punta de la lengua suavemente entre los dientes y deja salir el aire. En /θ/ solo sale aire. En /ð/ vibran las cuerdas vocales, como un zumbido suave.",
        "Un error común es cambiar TH por /s/, /t/ o /d/ (decir 'sink' en vez de think, o 'dis' en vez de this). Ve despacio y asegúrate de sentir la lengua tocando los dientes.",
      ],
    },
    keyPoints: {
      en: [
        "/θ/ (think) is voiceless: air only.",
        "/ð/ (this) is voiced: feel the vibration.",
        "Tongue tip between the teeth, never behind them.",
      ],
      es: [
        "/θ/ (think) es sordo: solo aire.",
        "/ð/ (this) es sonoro: siente la vibración.",
        "La punta de la lengua entre los dientes, nunca detrás.",
      ],
    },
    practice: {
      en: [
        "Repeat: think, three, thank, thirty, bath.",
        "Repeat: this, that, the, mother, brother.",
        "Say: 'Three thin thieves thought this through.'",
      ],
      es: [
        "Repite: think, three, thank, thirty, bath.",
        "Repite: this, that, the, mother, brother.",
        "Di: 'Three thin thieves thought this through.'",
      ],
    },
  },
  {
    section: "pronunciation",
    slug: "word-stress",
    level: "intermediate",
    videoId: null,
    title: {
      en: "Word stress: which syllable is strong?",
      es: "Acento de palabra: ¿qué sílaba es fuerte?",
    },
    summary: {
      en: "Stress changes meaning and makes you easier to understand.",
      es: "El acento cambia el significado y hace que te entiendan mejor.",
    },
    body: {
      en: [
        "In English, every word with two or more syllables has one strong syllable. The strong syllable is longer, louder and higher in pitch.",
        "Stress can change the meaning: a REcord (noun) vs. to reCORD (verb); a PREsent (gift) vs. to preSENT.",
        "Unlike Spanish, English has no written accent marks, so the best habit is to check the stress every time you learn a new word in a dictionary.",
      ],
      es: [
        "En inglés, toda palabra de dos o más sílabas tiene una sílaba fuerte. Esa sílaba es más larga, más fuerte y más aguda.",
        "El acento puede cambiar el significado: un REcord (sustantivo) vs. to reCORD (verbo); un PREsent (regalo) vs. to preSENT.",
        "A diferencia del español, el inglés no tiene tildes escritas, así que el mejor hábito es revisar el acento en el diccionario cada vez que aprendas una palabra nueva.",
      ],
    },
    keyPoints: {
      en: [
        "One strong syllable per word.",
        "Strong = longer + louder + higher.",
        "Check stress in the dictionary for every new word.",
      ],
      es: [
        "Una sílaba fuerte por palabra.",
        "Fuerte = más larga + más fuerte + más aguda.",
        "Revisa el acento en el diccionario con cada palabra nueva.",
      ],
    },
    practice: {
      en: [
        "Clap on the strong syllable: PHOto, phoTOgraphy, photoGRAPHic.",
        "Compare: REcord / reCORD, PREsent / preSENT.",
      ],
      es: [
        "Aplaude en la sílaba fuerte: PHOto, phoTOgraphy, photoGRAPHic.",
        "Compara: REcord / reCORD, PREsent / preSENT.",
      ],
    },
  },
  {
    section: "writing",
    slug: "simple-sentences",
    level: "beginner",
    videoId: null,
    title: {
      en: "Writing clear simple sentences",
      es: "Cómo escribir oraciones simples y claras",
    },
    summary: {
      en: "Subject + verb + object: the base of all good writing.",
      es: "Sujeto + verbo + objeto: la base de toda buena escritura.",
    },
    body: {
      en: [
        "The basic English sentence order is Subject + Verb + Object: 'Maria reads books.' Unlike Spanish, you almost always need to say the subject: 'She works here', not 'Works here'.",
        "Start with short sentences. Once they are correct, join them with and, but or because to build longer ideas.",
        "Always begin a sentence with a capital letter and end it with punctuation. Read your sentence out loud: if it sounds incomplete, it probably is.",
      ],
      es: [
        "El orden básico de la oración en inglés es Sujeto + Verbo + Objeto: 'Maria reads books.' A diferencia del español, casi siempre debes decir el sujeto: 'She works here', no 'Works here'.",
        "Empieza con oraciones cortas. Cuando sean correctas, únelas con and, but o because para construir ideas más largas.",
        "Empieza siempre con mayúscula y termina con puntuación. Lee tu oración en voz alta: si suena incompleta, probablemente lo esté.",
      ],
    },
    keyPoints: {
      en: [
        "Order: Subject + Verb + Object.",
        "Don't drop the subject (it, he, she, they…).",
        "Connect ideas with and / but / because.",
      ],
      es: [
        "Orden: Sujeto + Verbo + Objeto.",
        "No omitas el sujeto (it, he, she, they…).",
        "Conecta ideas con and / but / because.",
      ],
    },
    practice: {
      en: [
        "Write 5 sentences about your day using I, he and she.",
        "Join two of them with 'because'.",
      ],
      es: [
        "Escribe 5 oraciones sobre tu día usando I, he y she.",
        "Une dos de ellas con 'because'.",
      ],
    },
  },
  {
    section: "writing",
    slug: "paragraph-structure",
    level: "intermediate",
    videoId: null,
    title: {
      en: "How to structure a paragraph",
      es: "Cómo estructurar un párrafo",
    },
    summary: {
      en: "Topic sentence, support and conclusion.",
      es: "Oración principal, apoyo y conclusión.",
    },
    body: {
      en: [
        "A good paragraph has one main idea. Start with a topic sentence that states it, add two or three supporting sentences with details or examples, and finish with a concluding sentence.",
        "Use linking words to guide the reader: first, also, for example, however, in conclusion.",
        "After writing, remove any sentence that doesn't support the main idea.",
      ],
      es: [
        "Un buen párrafo tiene una sola idea principal. Empieza con una oración principal que la exprese, agrega dos o tres oraciones de apoyo con detalles o ejemplos, y termina con una conclusión.",
        "Usa conectores para guiar al lector: first, also, for example, however, in conclusion.",
        "Al terminar, elimina cualquier oración que no apoye la idea principal.",
      ],
    },
    keyPoints: {
      en: [
        "One paragraph = one main idea.",
        "Topic sentence → support → conclusion.",
        "Use linking words.",
      ],
      es: [
        "Un párrafo = una idea principal.",
        "Oración principal → apoyo → conclusión.",
        "Usa conectores.",
      ],
    },
    practice: {
      en: [
        "Write a 5-sentence paragraph about your favorite place in Panama.",
        "Underline your topic sentence and your linking words.",
      ],
      es: [
        "Escribe un párrafo de 5 oraciones sobre tu lugar favorito en Panamá.",
        "Subraya tu oración principal y tus conectores.",
      ],
    },
  },
  {
    section: "listening",
    slug: "listening-strategies",
    level: "beginner",
    videoId: null,
    title: {
      en: "5 strategies to understand spoken English",
      es: "5 estrategias para entender el inglés hablado",
    },
    summary: {
      en: "You don't need to understand every word.",
      es: "No necesitas entender cada palabra.",
    },
    body: {
      en: [
        "Native speakers link words together and reduce small words, so 'want to' becomes 'wanna'. Your ears need training, not just your vocabulary.",
        "Listen first for the general idea, then listen again for details. Use subtitles in English (not Spanish) once you are ready, and finish by listening again without them.",
        "Short, daily listening beats long, occasional sessions. Ten focused minutes a day is enough to see progress.",
      ],
      es: [
        "Los hablantes nativos unen palabras y reducen las palabras pequeñas, así 'want to' se vuelve 'wanna'. Tus oídos necesitan entrenamiento, no solo vocabulario.",
        "Escucha primero para captar la idea general y luego otra vez para los detalles. Usa subtítulos en inglés (no en español) cuando estés listo y termina escuchando sin ellos.",
        "Escuchar poco cada día es mejor que sesiones largas de vez en cuando. Diez minutos enfocados al día bastan para progresar.",
      ],
    },
    keyPoints: {
      en: [
        "Listen for the main idea first.",
        "Use English subtitles, then remove them.",
        "Ten focused minutes every day.",
      ],
      es: [
        "Escucha primero la idea general.",
        "Usa subtítulos en inglés y luego quítalos.",
        "Diez minutos enfocados cada día.",
      ],
    },
    practice: {
      en: [
        "Pick a 2-minute clip and listen three times: idea, details, no subtitles.",
        "Write down 5 phrases you heard and repeat them out loud.",
      ],
      es: [
        "Elige un clip de 2 minutos y escúchalo tres veces: idea, detalles, sin subtítulos.",
        "Anota 5 frases que escuchaste y repítelas en voz alta.",
      ],
    },
  },
  {
    section: "speaking",
    slug: "daily-conversation-starters",
    level: "beginner",
    videoId: null,
    title: {
      en: "Everyday conversation starters",
      es: "Frases para iniciar conversaciones del día a día",
    },
    summary: {
      en: "Simple phrases to start and keep a conversation going.",
      es: "Frases simples para empezar y mantener una conversación.",
    },
    body: {
      en: [
        "Starting a conversation is easier with a few ready-made phrases: 'How's it going?', 'What do you do?', 'Have you been here before?'",
        "Keep it going by asking follow-up questions: 'Really? Tell me more', 'Why?', 'How long have you…?'",
        "Don't worry about being perfect. Speaking regularly, even with mistakes, builds fluency faster than waiting until you feel ready.",
      ],
      es: [
        "Empezar una conversación es más fácil con unas cuantas frases listas: 'How's it going?', 'What do you do?', 'Have you been here before?'",
        "Mantenla viva con preguntas de seguimiento: 'Really? Tell me more', 'Why?', 'How long have you…?'",
        "No te preocupes por ser perfecto. Hablar con regularidad, aunque cometas errores, desarrolla fluidez más rápido que esperar a sentirte listo.",
      ],
    },
    keyPoints: {
      en: [
        "Learn 5 opening phrases by heart.",
        "Ask follow-up questions.",
        "Mistakes are part of learning.",
      ],
      es: [
        "Aprende 5 frases de apertura de memoria.",
        "Haz preguntas de seguimiento.",
        "Los errores son parte del aprendizaje.",
      ],
    },
    practice: {
      en: [
        "Record yourself answering: 'What do you do on weekends?'",
        "Use at least two follow-up questions in your next conversation.",
      ],
      es: [
        "Grábate respondiendo: 'What do you do on weekends?'",
        "Usa al menos dos preguntas de seguimiento en tu próxima conversación.",
      ],
    },
  },
  {
    section: "grammar",
    slug: "present-simple",
    level: "beginner",
    videoId: null,
    title: {
      en: "Present simple: habits and facts",
      es: "Presente simple: hábitos y hechos",
    },
    summary: {
      en: "When to use it, and the famous -s for he/she/it.",
      es: "Cuándo usarlo y la famosa -s de he/she/it.",
    },
    body: {
      en: [
        "Use the present simple for habits, routines and facts: 'I drink coffee every morning', 'The sun rises in the east.'",
        "With he, she and it, add -s to the verb: 'She works', 'He plays'. Verbs ending in -s, -sh, -ch, -x or -o add -es: 'He watches TV'.",
        "For questions and negatives use do / does + the base verb: 'Does she work here?', 'I don't like tea.' Notice the -s moves to does: 'Does she work', not 'Does she works'.",
      ],
      es: [
        "Usa el presente simple para hábitos, rutinas y hechos: 'I drink coffee every morning', 'The sun rises in the east.'",
        "Con he, she e it, agrega -s al verbo: 'She works', 'He plays'. Los verbos que terminan en -s, -sh, -ch, -x u -o agregan -es: 'He watches TV'.",
        "Para preguntas y negaciones usa do / does + el verbo base: 'Does she work here?', 'I don't like tea.' Fíjate en que la -s pasa a does: 'Does she work', no 'Does she works'.",
      ],
    },
    keyPoints: {
      en: [
        "Habits, routines and facts.",
        "he / she / it + verb-s.",
        "Questions and negatives: do / does + base verb.",
      ],
      es: [
        "Hábitos, rutinas y hechos.",
        "he / she / it + verbo-s.",
        "Preguntas y negaciones: do / does + verbo base.",
      ],
    },
    practice: {
      en: [
        "Write 5 sentences about your daily routine.",
        "Turn each one into a question and a negative sentence.",
      ],
      es: [
        "Escribe 5 oraciones sobre tu rutina diaria.",
        "Conviértelas en pregunta y en negación.",
      ],
    },
  },
];

export const getSection = (slug: string) =>
  sections.find((section) => section.slug === slug);

export const getLessonsBySection = (slug: string) =>
  lessons.filter((lesson) => lesson.section === slug);

export const getLesson = (section: string, slug: string) =>
  lessons.find((lesson) => lesson.section === section && lesson.slug === slug);
