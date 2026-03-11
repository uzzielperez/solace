import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Wind } from 'lucide-react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      <section className="text-center space-y-6 pt-4">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--color-ink)]">
          Solace
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-xl mx-auto leading-relaxed">
          A neuroscience- and art-based companion for grief. Not to get over it—to move through it, honor what was, and find your way to a new normal.
        </p>
        <p className="text-[var(--color-ink-soft)] max-w-lg mx-auto">
          Whether you're facing a breakup, the death of someone you love, or any loss that has cracked your world: you belong here. Grief has no timeline. We offer structure so you can go at your own pace.
        </p>
        <Link
          to="/reflect"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[var(--color-gold-light)]/30 text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-light)]/50 transition-colors no-underline"
        >
          <Wind size={18} />
          Guided reflection (a few minutes)
        </Link>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Link
          to="/program"
          className="block p-6 rounded-2xl border-2 border-[var(--color-gold-light)] bg-white/60 hover:bg-[var(--color-gold-light)]/10 transition-colors no-underline text-[var(--color-ink)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-lg bg-[var(--color-gold)]/20">
              <Calendar className="text-[var(--color-gold)]" size={24} />
            </span>
            <h2 className="font-serif text-xl font-semibold">21-Day Program</h2>
          </div>
          <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed">
            The beginning. Science-backed daily practices (body, emotion, meaning) and simple art prompts to stabilize, feel, and start to integrate. Your first step into the new normal.
          </p>
          <span className="inline-block mt-3 text-[var(--color-gold)] font-medium text-sm">Start here →</span>
        </Link>

        <Link
          to="/kintsugi"
          className="block p-6 rounded-2xl border-2 border-[var(--color-gold)]/60 bg-white/60 hover:bg-[var(--color-gold)]/10 transition-colors no-underline text-[var(--color-ink)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-lg bg-[var(--color-gold)]/30">
              <Sparkles className="text-[var(--color-gold)]" size={24} />
            </span>
            <h2 className="font-serif text-xl font-semibold">Kintsugi</h2>
          </div>
          <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed">
            150 days. Like the Japanese art of repairing broken pottery with gold: the crack stays visible, but it becomes part of the story. Five phases to gather the pieces, choose your gold, and live with the repair.
          </p>
          <span className="inline-block mt-3 text-[var(--color-gold)] font-medium text-sm">Explore Kintsugi →</span>
        </Link>
      </section>

      <section className="rounded-2xl bg-[var(--color-sage)]/15 p-6 md:p-8 border border-[var(--color-sage)]/30">
        <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-3">No timeline</h2>
        <p className="text-[var(--color-ink-soft)] leading-relaxed">
          Some people need months; some need years. The 21-day program is a beginning. Kintsugi extends to 150 days—and your relationship with this loss may last a lifetime. That's normal. Solace is here for the first weeks and for the long path. You can return to any day or phase whenever you need.
        </p>
        <Link to="/timeline" className="inline-block mt-4 text-[var(--color-sage)] font-medium text-sm hover:underline">
          Read more about grief and time →
        </Link>
      </section>
    </motion.div>
  );
}
