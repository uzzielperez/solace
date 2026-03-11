import { motion } from 'framer-motion';

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl"
    >
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
          Grief has no timeline
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Why we don't put an expiration date on loss.
        </p>
      </div>

      <section className="space-y-4 text-[var(--color-ink)] leading-relaxed">
        <p>
          The idea that grief follows neat stages or a set number of months comes from old models that don't match how most people actually heal. Your brain doesn't "finish" processing loss. It learns to live with it—and that can take a few months, a few years, or a lifetime of waves.
        </p>
        <p>
          <strong>Solace's 21-day program</strong> is a beginning: a way to stabilize and build habits when everything feels shattered. It's not "get over it in 21 days." It's "give yourself 21 days of structure so the new normal has a shape."
        </p>
        <p>
          <strong>Kintsugi (150 days)</strong> extends that. It's a frame for the first several months—gathering the pieces, choosing what holds you together, and living with the repair. Some people will need longer. Some will revisit phases for years. That's normal.
        </p>
        <p>
          Beyond 150 days, grief often becomes part of who you are: it shows up at anniversaries, in a song, in a place. It doesn't mean you failed. It means you loved. This site doesn't promise closure. It promises companionship: practices, science, and space to honor what was while you build what's next.
        </p>
      </section>

      <div className="rounded-2xl bg-[var(--color-gold-light)]/20 border border-[var(--color-gold)]/40 p-6">
        <p className="font-serif text-lg text-[var(--color-ink)]">
          You are not behind. You are not broken. You are in your own time.
        </p>
      </div>
    </motion.div>
  );
}
