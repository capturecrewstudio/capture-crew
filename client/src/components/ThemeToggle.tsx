type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      className="relative shrink-0 focus:outline-none"
      style={{ width: 40, height: 22 }}
    >
      {/* Track */}
      <span
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{
          background: isDark ? 'rgba(200,169,107,0.2)' : 'rgba(184,150,42,0.15)',
          border: `1px solid ${isDark ? 'rgba(200,169,107,0.35)' : 'rgba(184,150,42,0.4)'}`,
        }}
      />
      {/* Thumb */}
      <span
        className="absolute top-[3px] rounded-full transition-all duration-300 flex items-center justify-center"
        style={{
          width: 16,
          height: 16,
          left: isDark ? 20 : 3,
          background: isDark ? '#C8A96B' : '#B8962A',
        }}
      >
        {isDark ? (
          /* Moon icon */
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0A0A0A' }}>
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
          </svg>
        ) : (
          /* Sun icon */
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FAF8F4' }}>
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        )}
      </span>
    </button>
  );
}
