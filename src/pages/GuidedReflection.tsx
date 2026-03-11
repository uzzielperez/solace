import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { guidedReflectionSteps, bodyOptions } from '../data/guidedReflectionSteps';

export default function GuidedReflection() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [bodyChoice, setBodyChoice] = useState<string | null>(null);

  const step = guidedReflectionSteps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === guidedReflectionSteps.length - 1;
  const isBodyStep = step?.variant === 'body';

  const goNext = () => {
    if (isLast) return;
    setStepIndex((i) => Math.min(i + 1, guidedReflectionSteps.length - 1));
  };

  const goBack = () => {
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-cream)] overflow-auto">
      {/* Minimal top bar: exit only */}
      <div className="flex-shrink-0 flex justify-between items-center px-4 py-3 border-b border-[var(--color-gold-light)]/20">
        <Link
          to="/"
          className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
        >
          Exit
        </Link>
        <span className="text-xs text-[var(--color-ink-soft)]">
          {stepIndex + 1} of {guidedReflectionSteps.length}
        </span>
      </div>

      {/* Step content: full-screen, centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full text-center"
            >
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-ink)] leading-tight">
                {step.title}
              </h1>
              <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
                {step.body}
              </p>

              {isBodyStep && (
                <ul className="mt-8 space-y-4 text-left">
                  {bodyOptions.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setBodyChoice(opt.id)}
                        className={`w-full px-4 py-3 rounded-xl border-2 text-left transition-colors ${
                          bodyChoice === opt.id
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold-light)]/20 text-[var(--color-ink)]'
                            : 'border-[var(--color-gold-light)]/50 bg-white/60 text-[var(--color-ink)] hover:border-[var(--color-gold-light)]'
                        }`}
                      >
                        <span className="font-medium block">{opt.label}</span>
                        <span className="text-sm text-[var(--color-ink-soft)] mt-0.5 block">
                          {opt.detail}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
                {!isFirst && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="order-2 sm:order-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={isLast ? () => navigate('/') : goNext}
                  className="order-1 sm:order-2 px-6 py-3 rounded-xl bg-[var(--color-gold)] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  {step.cta}
                </button>
                {step.secondaryCta && !isLast && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="order-3 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {step.secondaryCta}
                  </button>
                )}
              </div>

              {isLast && (
                <p className="mt-6 text-sm text-[var(--color-ink-soft)]">
                  <Link to="/journal" className="text-[var(--color-gold)] hover:underline">
                    Journal
                  </Link>
                  {' · '}
                  <Link to="/program" className="text-[var(--color-gold)] hover:underline">
                    21-Day Program
                  </Link>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Soft progress dots */}
      <div className="flex-shrink-0 flex justify-center gap-2 pb-6">
        {guidedReflectionSteps.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full transition-colors ${
              i === stepIndex ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-gold-light)]/50'
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
