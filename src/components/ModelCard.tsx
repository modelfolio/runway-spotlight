import { Link } from "react-router-dom";
import type { ModelProfile } from "@/data/models";
import { useState, useCallback, useRef } from "react";

interface ModelCardProps {
  model: ModelProfile;
  index: number;
  /** Skip the built-in fade-up entrance (use when parent controls entrance animation) */
  noEntrance?: boolean;
}

const ModelCard = ({ model, index, noEntrance }: ModelCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -22,
      y: (px - 0.5) * 22,
    });
    setShine({ x: px * 100, y: py * 100 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  const entranceClass = noEntrance ? "" : "opacity-0 animate-fade-up";

  return (
    <Link
      ref={cardRef}
      to={`/models/${model.slug}`}
      className={`group block ${entranceClass}`}
      style={{
        animationDelay: noEntrance ? undefined : `${index * 0.12}s`,
        perspective: "1100px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "scale(1.03)" : "scale(1)"}`,
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.3s ease-out"
            : "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `${tilt.y * -0.8}px ${tilt.x * 0.8}px 40px hsl(43 80% 40% / 0.12), 0 24px 60px -10px hsl(40 20% 15% / 0.18)`
            : "0 4px 24px -6px hsl(40 20% 15% / 0.1)",
          borderRadius: "2px",
          willChange: "transform",
        }}
      >
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
          <img
            src={model.image}
            alt={`${model.name} — ${model.category} model`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
            loading="lazy"
            style={{
              transform: isHovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.7s ease-out",
            }}
          />

          {/* Dynamic shine / gloss highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,248,230,0.22) 0%, transparent 55%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease-out",
            }}
          />

          {/* Shimmer sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.2s" }}
          >
            <div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-[-15deg]"
              style={{
                transform: isHovered ? "translateX(400%)" : "translateX(-100%)",
                transition: isHovered ? "transform 0.85s ease-out" : "none",
              }}
            />
          </div>

          {/* Hover overlay — Zara: stark black, white type */}
          <div className="absolute inset-0 bg-black/78 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center">
            <p className="font-display font-normal text-sm tracking-[0.38em] uppercase text-white/55 mb-2">
              {model.category}
            </p>
            <p className="font-body font-light text-sm text-white/45">
              {model.location} · {model.height}
            </p>
            {model.available && (
              <span className="mt-4 inline-block border border-white/35 text-white/75 font-body text-xs px-4 py-1.5 tracking-[0.32em] uppercase">
                Available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card label — subtle parallax shift with tilt */}
      <div
        className="mt-4"
        style={{
          transform: `translateX(${tilt.y * 0.4}px)`,
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {model.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1">{model.category}</p>
      </div>
    </Link>
  );
};

export default ModelCard;
