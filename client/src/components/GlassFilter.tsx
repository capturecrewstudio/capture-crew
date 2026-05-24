type GlassFilterProps = {
  children?: React.ReactNode;
  className?: string;
  borderRadius?: string;
  borderWidth?: string;
  distortionScale?: number;
  brightness?: number;
  opacity?: number;
  backgroundOpacity?: number;
  blur?: number;
  style?: React.CSSProperties;
};

export function GlassFilter({
  children,
  className = '',
  borderRadius = '999px',
  borderWidth = '1px',
  distortionScale: _distortionScale = 12,
  brightness = 1.05,
  opacity = 1.0,
  backgroundOpacity = 0.08,
  blur = 24,
  style = {}
}: GlassFilterProps) {
  return (
    <>
      <div
        className={className}
        style={{
          borderRadius,
          border: `${borderWidth} solid rgba(255, 255, 255, ${backgroundOpacity})`,
          position: 'relative',
          opacity,
          ...style
        }}
      >
        {/* Blur layer — absolutely fills the pill, never intercepts clicks */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius,
            backdropFilter: `blur(${blur}px) brightness(${brightness}) saturate(1.4)`,
            WebkitBackdropFilter: `blur(${blur}px) brightness(${brightness}) saturate(1.4)`,
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Content sits above the blur layer */}
        <div style={{ position: 'relative', zIndex: 1, display: 'contents' }}>
          {children}
        </div>
      </div>
    </>
  );
}
