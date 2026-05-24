import { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
};

export function BlurImage({ src, alt, className = '', wrapperClassName = '', style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`} style={style}>
      {/* Blurred low-quality placeholder — same src, tiny and blurred */}
      <img
        src={src}
        alt=""
        aria-hidden
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
      />
      {/* Real image */}
      <img
        {...rest}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`relative w-full h-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
}
