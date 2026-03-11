import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Sparkles, Clock, BookOpen, Heart, Wind } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const nav = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/reflect', label: 'Reflect', icon: Wind },
    { path: '/program', label: '21 Days', icon: Calendar },
    { path: '/kintsugi', label: 'Kintsugi', icon: Sparkles },
    { path: '/timeline', label: 'No Timeline', icon: Clock },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/honor', label: 'Honor', icon: Heart },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-[var(--color-cream)]/95 backdrop-blur border-b border-[var(--color-gold-light)]/30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-semibold text-[var(--color-ink)] no-underline">
            Solace
          </Link>
          <nav className="flex flex-wrap gap-2 justify-end">
            {nav.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                  location.pathname === path
                    ? 'bg-[var(--color-gold-light)]/40 text-[var(--color-ink)] font-medium'
                    : 'text-[var(--color-ink-soft)] hover:bg-[var(--color-gold-light)]/20'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 box-border flex flex-col min-h-0">
        {children}
      </main>
      <footer className="border-t border-[var(--color-gold-light)]/30 py-4 text-center text-sm text-[var(--color-ink-soft)]">
        Solace — Grief has no timeline. Move at your own pace. Honor what was.
      </footer>
    </div>
  );
}
