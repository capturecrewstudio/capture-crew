import { useId } from 'react';

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
  distortionScale = 12,
  brightness = 1.05,
  opacity = 1.0,
  backgroundOpacity = 0.08,
  blur = 24,
  style = {}
}: GlassFilterProps) {
  const filterId = useId();

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Generates fine fractal noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
            />
            {/* Uses noise channel R & G to distort coordinates */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Blurs the displaced result slightly */}
            <feGaussianBlur in="displaced" stdDeviation={blur / 8} result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div
        className={className}
        style={{
          borderRadius,
          border: `${borderWidth} solid rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: `url(#${filterId}) blur(${blur}px) brightness(${brightness})`,
          opacity,
          ...style
        }}
      >
        {children}
      </div>
    </>
  );
}
