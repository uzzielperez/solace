export type KintsugiPhase = {
  phase: number;
  title: string;
  days: string;
  tagline: string;
  focus: string[];
  practice: string;
  scienceNote: string;
};

/** Kintsugi: 150-day program. Repair with gold. */
export const kintsugiPhases: KintsugiPhase[] = [
  {
    phase: 1,
    title: "The Break",
    days: "1–21",
    tagline: "Acknowledge the fracture.",
    focus: [
      "Honoring the reality of the loss",
      "Body and nervous system regulation",
      "Minimum viable days",
      "Safe harbors and memory space",
    ],
    practice: "Use the Solace 21-Day Program as your foundation. Treat these days as the first crack—visible, real, and the starting point for repair.",
    scienceNote: "The brain is in acute stress; your job is not to fix but to stabilize. Naming, grounding, and small rituals support the prefrontal cortex and vagal tone.",
  },
  {
    phase: 2,
    title: "Gathering the Pieces",
    days: "22–50",
    tagline: "Collect what still belongs.",
    focus: [
      "Identifying what you want to carry forward",
      "Stories, values, and continuing bonds",
      "Anger, guilt, and unsent letters",
      "Connection and community",
    ],
    practice: "Weekly check-ins: one letter (unsent or to yourself), one conversation with someone who gets it, one moment of movement or art. No need to tie it up neatly—gather.",
    scienceNote: "Dual-process theory: you'll oscillate between loss-oriented and restoration-oriented coping. Both are necessary. Let the waves come; notice what helps you return to center.",
  },
  {
    phase: 3,
    title: "The Gold",
    days: "51–90",
    tagline: "What will hold the pieces together?",
    focus: [
      "Meaning-making and post-traumatic growth",
      "New rituals and habits",
      "Identity: who am I now?",
      "Future self and hope",
    ],
    practice: "Choose one 'gold'—a value, a ritual, a commitment—that you want to run through the crack. Write it down. Practice it at least once a week. This is the adhesive that makes the repair visible.",
    scienceNote: "Neuroplasticity is at work. New routines and narratives build new pathways. The brain doesn't erase the loss; it learns to live alongside it.",
  },
  {
    phase: 4,
    title: "Firing the Vessel",
    days: "91–120",
    tagline: "Heat and time set the repair.",
    focus: [
      "Annuaries and seasonal triggers",
      "Bad days and resilience",
      "Integrating the old and new self",
      "Forgiveness (of self and others)",
    ],
    practice: "When a wave hits—anniversary, song, place—pause. Name it: 'This is a wave.' Use one grounding practice (breath, safe harbor, one sentence in a journal). You are not undoing the repair; you are living in a vessel that was broken and repaired.",
    scienceNote: "Emotional flooding can still occur; the difference is that you now have more regulation tools. The hippocampus and amygdala remain sensitive to triggers; practice builds tolerance.",
  },
  {
    phase: 5,
    title: "Kintsugi",
    days: "121–150",
    tagline: "The crack is part of the story.",
    focus: [
      "Seeing the whole vessel",
      "Gratitude for what was and what grew",
      "Sharing your story (if and when you choose)",
      "Living with grief as part of love",
    ],
    practice: "Write or create one piece that tells the story of your 150 days: the break, the pieces, the gold, the firing. It doesn't need to be for anyone else. This is your kintsugi—the repair that honors the break.",
    scienceNote: "Integration is not closure. The brain can hold loss and meaning, absence and love. You are building a life where the crack is visible—and so is the gold.",
  },
];

export const kintsugiIntro =
  "Kintsugi is the Japanese art of repairing broken pottery with gold. The crack is not hidden; it is made visible and beautiful. This 150-day program is your kintsugi: not to erase the break, but to repair with intention, time, and the gold of meaning, ritual, and love.";
