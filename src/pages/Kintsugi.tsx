import { motion } from 'framer-motion';
import { kintsugiPhases, kintsugiIntro } from '../data/kintsugi';
import { Link } from 'react-router-dom';

export default function Kintsugi() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
          Kintsugi
        </h1>
        <p className="mt-2 text-[var(--color-gold)] font-medium">150 days · Repair with gold</p>
        <p className="mt-4 text-[var(--color-ink-soft)] max-w-2xl leading-relaxed">
          {kintsugiIntro}
        </p>
      </div>

      <div className="space-y-6">
        {kintsugiPhases.map((phase, i) => (
          <motion.section
            key={phase.phase}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--color-gold-light)] bg-white/70 p-6 md:p-8 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline gap-2 mb-3">
              <span className="text-sm font-semibold text-[var(--color-gold)]">Phase {phase.phase}</span>
              <span className="text-sm text-[var(--color-ink-soft)]">Days {phase.days}</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">{phase.title}</h2>
            <p className="text-[var(--color-ink-soft)] italic mt-1">{phase.tagline}</p>
            <ul className="mt-4 list-disc list-inside text-[var(--color-ink)] space-y-1">
              {phase.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-[var(--color-cream)] border border-[var(--color-gold-light)]/50">
              <p className="text-[var(--color-ink)] leading-relaxed"><strong>Practice:</strong> {phase.practice}</p>
            </div>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              <strong>Science note:</strong> {phase.scienceNote}
            </p>
          </motion.section>
        ))}
      </div>

      <p className="text-center text-[var(--color-ink-soft)]">
        After the 21-day program, use these phases as a map. You can revisit the{' '}
        <Link to="/program" className="text-[var(--color-gold)] hover:underline">21-Day Program</Link>
        {' '}any time, and your <Link to="/journal" className="text-[var(--color-gold)] hover:underline">Journal</Link> and{' '}
        <Link to="/honor" className="text-[var(--color-gold)] hover:underline">Honor</Link> pages are here for the long path.
      </p>
    </div>
  );
}
