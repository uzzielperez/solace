import { useState, useEffect } from 'react';

const STORAGE_KEY = 'solace-honor';

type HonorEntry = { id: string; name: string; note: string; createdAt: number };

function loadHonor(): HonorEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHonor(entries: HonorEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function Honor() {
  const [entries, setEntries] = useState<HonorEntry[]>([]);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setEntries(loadHonor());
  }, []);

  const save = () => {
    const trimmedName = name.trim();
    const trimmedNote = note.trim();
    if (!trimmedName && !trimmedNote) return;

    if (editingId) {
      const next = entries.map((e) =>
        e.id === editingId ? { ...e, name: trimmedName || e.name, note: trimmedNote || e.note } : e
      );
      setEntries(next);
      saveHonor(next);
      setEditingId(null);
    } else {
      const newEntry: HonorEntry = {
        id: crypto.randomUUID(),
        name: trimmedName,
        note: trimmedNote,
        createdAt: Date.now(),
      };
      const next = [newEntry, ...entries];
      setEntries(next);
      saveHonor(next);
    }
    setName('');
    setNote('');
  };

  const remove = (id: string) => {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    saveHonor(next);
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setNote('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
          Honor
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          A space to name and honor who or what you've lost. One word, a name, or a few lines—whatever keeps the bond visible. Stored only on this device.
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--color-gold-light)] bg-white/70 p-6">
        <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)] mb-4">Add or edit</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name or a word for who/what you're honoring"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-gold-light)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 mb-3"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="A line or two—what you want to remember, or a promise to carry them with you"
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-gold-light)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 resize-y"
        />
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={save}
            className="px-4 py-2 rounded-lg bg-[var(--color-gold)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName('');
                setNote('');
              }}
              className="px-4 py-2 rounded-lg border border-[var(--color-gold-light)] text-[var(--color-ink)] hover:bg-[var(--color-gold-light)]/20"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {entries.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)] mb-3">What you're carrying</h2>
          <ul className="space-y-3">
            {entries.map((e) => (
              <li
                key={e.id}
                className="rounded-xl border border-[var(--color-gold-light)]/50 bg-[var(--color-cream)] p-4"
              >
                {e.name && <p className="font-semibold text-[var(--color-ink)]">{e.name}</p>}
                {e.note && <p className="text-[var(--color-ink-soft)] mt-1 whitespace-pre-wrap">{e.note}</p>}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(e.id);
                      setName(e.name);
                      setNote(e.note);
                    }}
                    className="text-sm text-[var(--color-gold)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(e.id)}
                    className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
