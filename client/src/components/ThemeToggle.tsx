import { useState } from 'react';
import { Settings2 } from 'lucide-react';

type Accent = 'red' | 'gold' | 'blue';

type Props = {
  isDark: boolean;
  onToggle: () => void;
  accent: Accent;
  onAccentChange: (a: Accent) => void;
};

const ACCENTS: { id: Accent; color: string; label: string }[] = [
  { id: 'red',  color: '#E8192C', label: 'Red'  },
  { id: 'gold', color: '#C8A96B', label: 'Gold' },
  { id: 'blue', color: '#4D9EFF', label: 'Blue' },
];

export function ThemeToggle({ isDark, onToggle, accent, onAccentChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      {/* Trigger */}
      <button
        type="button"
        aria-label="Theme settings"
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none"
        style={{
          background: open ? 'var(--accent-dim)' : 'transparent',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--line-mid)'}`,
          color: 'var(--stone)',
        }}
      >
        <Settings2 size={14} />
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />

          <div
            className="absolute right-0 top-10 z-[999] rounded-xl p-4 w-[190px] flex flex-col gap-4 shadow-2xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-mid)',
            }}
          >
            {/* Mode row */}
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'DM Mono', monospace", color: 'var(--stone)' }}>
                Mode
              </p>
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--line-mid)' }}>
                {(['dark', 'light'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => { if ((mode === 'dark') !== isDark) onToggle(); }}
                    className="flex-1 py-1.5 text-[0.65rem] uppercase tracking-wider font-medium transition-all duration-200"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      background: (mode === 'dark') === isDark ? 'var(--accent)' : 'transparent',
                      color: (mode === 'dark') === isDark ? 'var(--ink)' : 'var(--stone)',
                    }}
                  >
                    {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent row */}
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'DM Mono', monospace", color: 'var(--stone)' }}>
                Accent
              </p>
              <div className="flex gap-2">
                {ACCENTS.map(({ id, color, label }) => (
                  <button
                    key={id}
                    type="button"
                    aria-label={`${label} accent`}
                    onClick={() => onAccentChange(id)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg transition-all duration-200"
                    style={{
                      background: accent === id ? 'var(--accent-dim)' : 'transparent',
                      border: `1px solid ${accent === id ? 'var(--accent)' : 'var(--line)'}`,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full block"
                      style={{
                        background: color,
                        boxShadow: accent === id ? `0 0 8px ${color}80` : 'none',
                        transform: accent === id ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                    />
                    <span
                      className="text-[0.55rem] uppercase tracking-wider"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: accent === id ? 'var(--accent)' : 'var(--stone)',
                      }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
