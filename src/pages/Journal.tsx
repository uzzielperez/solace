import { useState, useEffect } from 'react';

const STORAGE_KEY = 'solace-journal';

type Entry = { id: string; date: string; body: string; createdAt: number };

function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveEntries(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [body, setBody] = useState('');

  const selectedEntry = entries.find((e) => e.date === selectedDate);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  useEffect(() => {
    setBody(selectedEntry?.body ?? '');
  }, [selectedDate, selectedEntry?.id]);

  const save = () => {
    const trimmed = body.trim();
    const id = selectedEntry?.id ?? crypto.randomUUID();
    const newEntry: Entry = {
      id,
      date: selectedDate,
      body: trimmed,
      createdAt: selectedEntry?.createdAt ?? Date.now(),
    };
    const next = entries.filter((e) => e.date !== selectedDate);
    next.push(newEntry);
    next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setEntries(next);
    saveEntries(next);
  };

  const handleBlur = () => {
    save();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
          Journal
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Private to this device. Write as little or as much as you need. No judgment, no timeline.
        </p>
      </div>

      <section>
        <label className="block text-sm font-medium text-[var(--color-ink-soft)] mb-2">Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full max-w-xs px-3 py-2 rounded-lg border border-[var(--color-gold-light)] bg-white text-[var(--color-ink)]"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={handleBlur}
          placeholder="What's true today? A sentence, a paragraph, or a page—all valid."
          rows={8}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-[var(--color-gold-light)] bg-white/80 text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 resize-y"
        />
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          Entries are saved automatically on this device. They are not sent anywhere.
        </p>
      </section>

      {entries.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)] mb-3">Past entries</h2>
          <ul className="space-y-2">
            {entries.slice(0, 20).map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSelectedDate(e.date)}
                  className="text-left w-full px-3 py-2 rounded-lg hover:bg-[var(--color-gold-light)]/20 text-[var(--color-ink)]"
                >
                  <span className="text-sm text-[var(--color-ink-soft)]">{e.date}</span>
                  <span className="block truncate text-sm mt-0.5">{e.body || '(empty)'}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
