import { Moon, Sun } from 'lucide-react';

type Props = {
  isDark: boolean;
  onToggle: () => void;
};

// Kept for future use — accent/custom picker hidden but not removed
export function applyAccentToCss(_hex: string) {}
export function clearAccentOverride() {}

export function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none"
      style={{
        background: 'transparent',
        border: '1px solid var(--line-mid)',
        color: 'var(--stone)',
      }}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
