import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
  /** Pass "eager" for above-the-fold images that should not be deferred */
  loading?: "lazy" | "eager";
}

/**
 * Drop-in <img> replacement that shows an animated shimmer skeleton while the
 * image is fetching and fades the image in once it's ready.  The parent
 * element must have `position: relative` (or absolute/fixed) so the skeleton
 * overlay fills it correctly.
 */
const LazyImage = ({
  src,
  alt,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  loading = "lazy",
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the browser already has the image cached it fires `load` before React
  // attaches the handler — check synchronously on mount.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {/* Shimmer skeleton — hidden once image is ready */}
      {!loaded && (
        <div
          className="absolute inset-0 bg-secondary overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              animation: "shimmer 1.6s infinite",
            }}
          />
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: loaded
            ? "opacity 0.45s ease-out, transform 0.7s ease-out, filter 0.7s ease-out"
            : "none",
        }}
        onLoad={() => setLoaded(true)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};

export default LazyImage;
