import { Link } from "react-router-dom";
import { models } from "@/data/models";
import { useEffect, useRef, useState, useCallback } from "react";

type Vec2 = { x: number; y: number };

// 3D entrance angle each card enters from
const ENTRANCE_TRANSFORMS = [
  "rotateY(28deg) translateX(-50px) translateZ(-60px)",
  "rotateX(20deg) translateY(60px) translateZ(-40px)",
  "rotateY(-28deg) translateX(50px) translateZ(-60px)",
  "rotateY(20deg) translateX(-40px) translateZ(-30px)",
  "rotateX(-18deg) translateY(50px) translateZ(-30px)",
  "rotateY(-20deg) translateX(40px) translateZ(-30px)",
  "rotateX(16deg) translateY(-40px) translateZ(-35px)",
];

const ModelCard = ({
  model,
  index,
  isLarge,
  isVisible,
}: {
  model: (typeof models)[0];
  index: number;
  isLarge: boolean;
  isVisible: boolean;
}) => {
  const [tilt, setTilt] = useState<Vec2>({ x: 0, y: 0 });
  const [shine, setShine] = useState<Vec2>({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
    });
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const entered = isVisible;
  const delay = index * 0.13 + 0.1;

  return (
    <div style={{ perspective: "1400px" }}>
      <Link
        to={`/models/${model.slug}`}
        className="block relative overflow-hidden w-full group"
        style={{
          height: isLarge ? "72vh" : "46vh",
          transform: entered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.025 : 1})`
            : ENTRANCE_TRANSFORMS[index],
          opacity: entered ? 1 : 0,
          transition: hovered
            ? "transform 0.1s ease-out, box-shadow 0.25s ease-out"
            : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out, box-shadow 0.5s ease-out",
          transitionDelay: entered ? `${delay}s` : "0s",
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? `${tilt.y * -1.2}px ${tilt.x * 0.8}px 70px rgba(0,0,0,0.08), 0 40px 100px -20px rgba(0,0,0,0.18)`
            : "0 8px 48px -16px rgba(0,0,0,0.1)",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Image layer — inner parallax ── */}
        <img
          src={model.image}
          alt={`${model.name} — Alliance talent`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{
            transform: `scale(1.14) translateX(${tilt.y * -0.45}px) translateY(${tilt.x * -0.45}px)`,
            transition: hovered ? "transform 0.1s ease-out" : "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* ── Directional light (follows cursor) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease-out",
          }}
        />

        {/* ── Shimmer sweep ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12"
            style={{
              transform: hovered ? "translateX(500%)" : "translateX(-200%)",
              transition: hovered ? "transform 1s ease-out" : "none",
            }}
          />
        </div>

        {/* ── Always-on bottom gradient ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

        {/* ── Corner accent brackets ── */}
        {[
          "top-5 left-5",
          "top-5 right-5",
          "bottom-5 left-5",
          "bottom-5 right-5",
        ].map((pos, ci) => (
          <div
            key={ci}
            className={`absolute ${pos} pointer-events-none`}
            style={{ opacity: hovered ? 0.8 : 0, transition: "opacity 0.35s ease-out" }}
          >
            <div
              className={`bg-primary/70 ${ci % 2 === 0 ? "w-5 h-px" : "w-5 h-px ml-auto"}`}
              style={{ transition: "width 0.4s ease-out", width: hovered ? "1.25rem" : "0.5rem" }}
            />
            <div
              className={`bg-primary/70 w-px ${ci < 2 ? "mt-0.5" : "-mt-0.5 -translate-y-full"}`}
              style={{ height: hovered ? "1.25rem" : "0.5rem", transition: "height 0.4s ease-out", marginLeft: ci % 2 !== 0 ? "auto" : undefined }}
            />
          </div>
        ))}

        {/* ── Text content ── */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="font-body text-xs tracking-[0.45em] uppercase text-primary/90">
              {model.category}
            </span>
            {model.available && (
              <span
                className="font-body text-xs tracking-widest uppercase border border-white/25 text-white/65 px-2 py-0.5"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.45s ease-out",
                }}
              >
                Available
              </span>
            )}
          </div>

          <h3
            className="font-display text-white font-light leading-none"
            style={{
              fontSize: isLarge ? "clamp(1.9rem, 3vw, 3rem)" : "clamp(1.4rem, 2.4vw, 2.1rem)",
              letterSpacing: "0.04em",
              transform: `translateY(${hovered ? 0 : 8}px)`,
              transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {model.name}
          </h3>

          <div
            className="flex items-center gap-3 mt-2"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.45s ease-out 0.05s",
            }}
          >
            <span className="font-body text-white/50 text-xs tracking-[0.25em] uppercase">
              {model.location}
            </span>
            <span className="w-px h-3 bg-white/30 inline-block" />
            <span className="font-body text-primary/80 text-xs tracking-widest uppercase">
              View Profile →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ModelShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top border line */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Giant background ROSTER text ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      >
        <p
          className="font-display font-bold select-none leading-none"
          style={{
            fontSize: "28vw",
            letterSpacing: "0.1em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.04)",
          }}
        >
          ROSTER
        </p>
      </div>

      {/* ── Floating 3D decorative background elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Orbiting rings */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-primary/8 animate-spin-slow opacity-40"
          style={{ animationDuration: "40s" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full border border-primary/10 animate-spin-slow opacity-30"
          style={{ animationDuration: "32s", animationDirection: "reverse" }}
        />
        {/* 3D portrait frames */}
        <div
          className="absolute top-1/4 left-4 border border-primary/18 animate-float"
          style={{ width: "55px", height: "76px", transform: "rotateX(15deg) rotateY(10deg)" }}
        />
        <div
          className="absolute bottom-1/4 right-6 border border-primary/14 animate-float-alt"
          style={{ width: "42px", height: "58px", transform: "rotateX(-12deg) rotateY(-8deg)" }}
        />
        {/* Accent dots */}
        <div className="absolute top-1/3 left-6 w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-2/3 right-8 w-1 h-1 rounded-full bg-primary/25 animate-float-alt" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "2s" }} />
        {/* Vertical lines */}
        <div className="absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent animate-float" />
        <div className="absolute top-1/4 right-1/4 w-px h-16 bg-gradient-to-b from-transparent via-primary/12 to-transparent animate-float-alt" />
      </div>

      {/* Row 1 — 3 large panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {models.slice(0, 3).map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} isLarge isVisible={isVisible} />
        ))}
      </div>

      {/* Row 2 — 4 smaller panels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
        {models.slice(3, 7).map((model, i) => (
          <ModelCard key={model.id} model={model} index={i + 3} isLarge={false} isVisible={isVisible} />
        ))}
      </div>

      {/* CTA strip */}
      <div className="bg-card border-t border-border py-8 text-center relative z-20">
        <Link
          to="/models"
          className="inline-flex items-center gap-4 font-body text-xs tracking-[0.45em] uppercase text-primary hover:text-foreground transition-colors duration-400 group"
        >
          View Complete Roster
          <span className="w-8 h-px bg-current inline-block transition-all duration-300 group-hover:w-12" />
        </Link>
      </div>
    </section>
  );
};

export default ModelShowcase;
