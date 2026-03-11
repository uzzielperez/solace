export type ReflectionStep = {
  id: string;
  title: string;
  body: string;
  cta?: string;
  secondaryCta?: string;
  variant?: 'intro' | 'prompt' | 'body' | 'close';
};

export const guidedReflectionSteps: ReflectionStep[] = [
  {
    id: 'ground',
    variant: 'intro',
    title: 'Take a breath',
    body: "You're safe here. This is a few minutes just for you—no one else needs to see or know. You can move at your own pace, or leave anytime.",
    cta: 'Begin',
  },
  {
    id: 'check-in',
    variant: 'prompt',
    title: 'How does your body feel right now?',
    body: "No need to change anything. Just notice: tightness, heaviness, restlessness, numbness—all of it is allowed. There's no right answer.",
    cta: 'Continue',
  },
  {
    id: 'reflection',
    variant: 'prompt',
    title: "What's one thing you're carrying today?",
    body: "It might be a feeling, a memory, or a worry. You don't have to fix it or name it perfectly. Just acknowledge it, here, for a moment.",
    cta: 'Continue',
  },
  {
    id: 'body',
    variant: 'body',
    title: 'Choose one way to be in your body',
    body: "Pick only one. A few minutes is enough.",
    cta: 'Continue',
    secondaryCta: "I'll skip for now",
  },
  {
    id: 'close',
    variant: 'close',
    title: "You don't have to hold it all at once",
    body: "Take what helps; leave the rest. You can come back to this anytime. There's no timeline.",
    cta: 'Finish',
  },
];

export const bodyOptions = [
  {
    id: 'tapping',
    label: 'Tapping',
    detail: '2–3 min. Light taps under collarbone, under arm, top of head. Breathe.',
  },
  {
    id: 'massage',
    label: 'Self massage',
    detail: '3–5 min. Shoulders, neck, or hands. Slow pressure where you hold tension.',
  },
  {
    id: 'walk',
    label: 'Walk',
    detail: '5–10 min. Step outside or pace indoors. No goal.',
  },
];
