import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { program21, phaseLabels } from '../data/program21';
import type { DayEntry } from '../data/program21';
import { Check } from 'lucide-react';

const transition = { duration: 0.4, ease: 'easeOut' as const };

const PROGRESS_KEY = 'solace-21day-progress';

type ProgramProgress = { currentDay: number; completedDays: number[] };

function loadProgress(): ProgramProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { currentDay: 1, completedDays: [] };
    const parsed = JSON.parse(raw) as ProgramProgress;
    if (typeof parsed.currentDay !== 'number' || !Array.isArray(parsed.completedDays)) {
      return { currentDay: 1, completedDays: [] };
    }
    return { currentDay: parsed.currentDay, completedDays: parsed.completedDays };
  } catch {
    return { currentDay: 1, completedDays: [] };
  }
}

function saveProgress(progress: ProgramProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

type DayCardStep =
  | { type: 'intro'; day: DayEntry }
  | { type: 'tagline'; day: DayEntry }
  | { type: 'science'; day: DayEntry }
  | { type: 'practice'; day: DayEntry }
  | { type: 'body'; day: DayEntry }
  | { type: 'reflection'; day: DayEntry }
  | { type: 'affirmation'; day: DayEntry };

function getDaySteps(day: DayEntry): DayCardStep[] {
  return [
    { type: 'intro', day },
    { type: 'tagline', day },
    { type: 'science', day },
    { type: 'practice', day },
    { type: 'body', day },
    { type: 'reflection', day },
    { type: 'affirmation', day },
  ];
}

function DayCardContent({ step }: { step: DayCardStep }) {
  const { day } = step;
  switch (step.type) {
    case 'intro':
      return (
        <>
          <p className="text-sm text-[var(--color-ink-soft)] mb-1">
            Day {day.day} · {phaseLabels[day.phase]}
          </p>
          <p className="text-sm text-[var(--color-ink-soft)] mb-4">{day.duration}</p>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-ink)] leading-tight">
            {day.title}
          </h1>
        </>
      );
    case 'tagline':
      return (
        <p className="font-serif text-xl md:text-2xl text-[var(--color-ink)] leading-relaxed">
          {day.tagline}
        </p>
      );
    case 'science':
      return (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
            The science
          </h2>
          <div className="mb-5 flex justify-center">
            <svg
              viewBox="0 0 120 80"
              className="w-full max-w-[200px] h-auto"
              aria-hidden
            >
              <defs>
                <linearGradient id="scienceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a227" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e8d5a3" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Abstract head / mind shape */}
              <ellipse cx="60" cy="42" rx="32" ry="36" fill="none" stroke="url(#scienceGrad)" strokeWidth="1.5" opacity="0.8" />
              {/* Soft inner warmth */}
              <ellipse cx="60" cy="42" rx="22" ry="24" fill="none" stroke="#e8d5a3" strokeWidth="1" opacity="0.5" />
              {/* Gentle “light up” nodes (suggesting brain regions) */}
              <circle cx="45" cy="38" r="3" fill="#c9a227" opacity="0.7" />
              <circle cx="75" cy="38" r="3" fill="#c9a227" opacity="0.7" />
              <circle cx="60" cy="32" r="2.5" fill="#e8d5a3" opacity="0.8" />
            </svg>
          </div>
          <p className="text-[var(--color-ink)] leading-relaxed">{day.science}</p>
        </>
      );
    case 'practice':
      return (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
            Practice
          </h2>
          <p className="text-[var(--color-ink)] leading-relaxed">{day.practice}</p>
        </>
      );
    case 'body':
      return (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
            Body
          </h2>
          <p className="text-[var(--color-ink)] leading-relaxed mb-4">Choose one to do today:</p>
          <ul className="space-y-3 text-[var(--color-ink)]">
            <li className="pl-4 border-l-2 border-[var(--color-gold-light)]/60 text-[var(--color-ink-soft)] leading-relaxed">
              <strong className="text-[var(--color-ink)]">Tapping</strong> (2–3 min) — Lightly tap with your fingertips: under the collarbone, under the arm, top of the head. One side at a time. Breathe.
            </li>
            <li className="pl-4 border-l-2 border-[var(--color-gold-light)]/60 text-[var(--color-ink-soft)] leading-relaxed">
              <strong className="text-[var(--color-ink)]">Self massage</strong> (3–5 min) — Shoulders, neck, or hands. Use slow, firm pressure. Where do you hold tension? Spend a minute there.
            </li>
            <li className="pl-4 border-l-2 border-[var(--color-gold-light)]/60 text-[var(--color-ink-soft)] leading-relaxed">
              <strong className="text-[var(--color-ink)]">Walk</strong> (5–10 min) — Step outside or pace indoors. No goal. Let your body move and your mind rest.
            </li>
          </ul>
        </>
      );
    case 'reflection':
      return (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
            Reflection prompt
          </h2>
          <p className="text-[var(--color-ink)] italic leading-relaxed">{day.prompt}</p>
        </>
      );
    case 'affirmation':
      return (
        <p className="font-serif text-xl md:text-2xl text-[var(--color-ink)] leading-relaxed">
          "{day.affirmation}"
        </p>
      );
    default:
      return null;
  }
}

export default function Program21() {
  const [progress, setProgress] = useState<ProgramProgress>(loadProgress);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [cardStep, setCardStep] = useState(0);
  const day = selectedDay !== null ? program21.find((d) => d.day === selectedDay) : null;

  const steps = useMemo(() => (day ? getDaySteps(day) : []), [day]);
  const currentStep = steps[cardStep];
  const isLastCard = cardStep === steps.length - 1;
  const isFirstCard = cardStep === 0;

  const goNext = () => {
    if (!selectedDay) return;
    if (cardStep < steps.length - 1) {
      setCardStep((s) => s + 1);
    } else {
      if (selectedDay < 21) {
        const nextProgress: ProgramProgress = {
          currentDay: selectedDay + 1,
          completedDays: progress.completedDays.includes(selectedDay)
            ? progress.completedDays
            : [...progress.completedDays, selectedDay].sort((a, b) => a - b),
        };
        setProgress(nextProgress);
        saveProgress(nextProgress);
        setSelectedDay(selectedDay + 1);
        setCardStep(0);
      } else {
        const nextProgress: ProgramProgress = {
          currentDay: 22,
          completedDays: progress.completedDays.includes(21)
            ? progress.completedDays
            : [...progress.completedDays, 21].sort((a, b) => a - b),
        };
        setProgress(nextProgress);
        saveProgress(nextProgress);
        setSelectedDay(null);
        setCardStep(0);
      }
    }
  };

  const exitDayView = () => {
    setSelectedDay(null);
    setCardStep(0);
  };

  // Full-screen paced card view
  if (day && steps.length > 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-cream)] overflow-auto">
        <div className="flex-shrink-0 flex justify-between items-center px-4 py-3 border-b border-[var(--color-gold-light)]/20">
          <button
            type="button"
            onClick={isFirstCard ? exitDayView : () => setCardStep((s) => s - 1)}
            className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            {isFirstCard ? 'Back to program' : 'Back'}
          </button>
          <span className="text-xs text-[var(--color-ink-soft)]">
            {cardStep + 1} of {steps.length}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-xl mx-auto w-full min-h-0">
          <AnimatePresence mode="wait">
            {currentStep && (
              <motion.div
                key={`${day.day}-${currentStep.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={transition}
                className="w-full"
              >
                <div className="min-h-[12rem] flex flex-col justify-center">
                  <DayCardContent step={currentStep} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-shrink-0 px-6 pb-8 pt-4 max-w-xl mx-auto w-full">
          <button
            type="button"
            onClick={goNext}
            className="w-full py-3.5 rounded-xl bg-[var(--color-gold)] text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
          >
            {isLastCard
              ? selectedDay === 21
                ? 'Finish'
                : 'Next day'
              : 'Continue'}
          </button>
        </div>

        <div className="flex-shrink-0 flex justify-center gap-1.5 pb-6 flex-wrap max-w-xl mx-auto px-4">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-colors ${
                i === cardStep ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-gold-light)]/40'
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>
    );
  }

  // Program overview: calm grid filling the screen
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
    >
      <div className="flex-shrink-0">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
          21-Day Program
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)] max-w-xl leading-relaxed text-sm md:text-base">
          Neuroscience and art, day by day. Choose a day and take your time.
        </p>
      </div>

      {progress.currentDay <= 21 && (
        <div className="flex-shrink-0 mt-3 rounded-xl bg-[var(--color-gold-light)]/20 border border-[var(--color-gold-light)]/50 px-4 py-2.5 flex flex-wrap items-center gap-3">
          <span className="text-[var(--color-ink)] text-sm">
            {progress.completedDays.length === 0
              ? "You're on day 1"
              : progress.currentDay === 22
                ? "You've completed all 21 days"
                : `Continue from day ${progress.currentDay}`}
          </span>
          {progress.currentDay <= 21 && progress.currentDay >= 1 && (
            <button
              type="button"
              onClick={() => {
                setSelectedDay(progress.currentDay);
                setCardStep(0);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-gold)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Open day {progress.currentDay}
            </button>
          )}
        </div>
      )}

      <div className="flex-1 min-h-0 mt-4 flex flex-col">
        <div className="grid grid-cols-7 grid-rows-3 gap-3 flex-1 min-h-0 w-full max-w-4xl mx-auto">
          {program21.map((d) => {
            const isCompleted = progress.completedDays.includes(d.day);
            const isCurrent = progress.currentDay === d.day;
            return (
              <motion.button
                key={d.day}
                onClick={() => {
                  setSelectedDay(d.day);
                  setCardStep(0);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-xl flex flex-col items-center justify-center min-h-0 w-full h-full text-2xl md:text-3xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/40 relative ${
                  isCompleted
                    ? 'bg-[var(--color-sage)]/20 text-[var(--color-ink-soft)]'
                    : isCurrent
                      ? 'bg-[var(--color-gold-light)]/45 text-[var(--color-ink)] ring-2 ring-[var(--color-gold)]/60'
                      : 'bg-[var(--color-gold-light)]/25 text-[var(--color-ink)] hover:bg-[var(--color-gold-light)]/45'
                }`}
              >
                {isCompleted && (
                  <span className="absolute top-2 right-2 text-[var(--color-sage)]" aria-hidden>
                    <Check size={18} strokeWidth={2.5} />
                  </span>
                )}
                {d.day}
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="flex-shrink-0 mt-3 text-sm text-[var(--color-ink-soft)]">
        Click a day to open the practice. One step at a time.
      </p>
    </motion.div>
  );
}
