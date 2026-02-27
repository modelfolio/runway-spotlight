import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

const YT_ID = "Sm6ClOHMY0w";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

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

  const onMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* ══════════════════════════════
          VIDEO — YouTube embed centred, oversized to cover
      ══════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
          title="Alliance"
          allow="autoplay; encrypted-media"
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "300vw", height: "300vw",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            border: "none",
            opacity: 0.65,
          }}
        />
      </div>

      {/* ══════════════════════════════
          OVERLAYS — Zara: dark vignette, clean white bottom
      ══════════════════════════════ */}
      {/* Dark wash over the video — editorial depth */}
      <div className="absolute inset-0 bg-black/40" />
      {/* White fade from very bottom — text sits here cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      {/* Side vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* ══════════════════════════════
          GIANT WATERMARK — Zara uses brand name as visual texture
      ══════════════════════════════ */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <p
          className="font-display font-medium select-none whitespace-nowrap leading-none"
          style={{
            fontSize: "20vw",
            letterSpacing: "0.08em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.07)",
            transform: `translateX(${mouse.x * -18}px)`,
            transition: "transform 1.3s ease-out",
          }}
        >
          ALLIANCE
        </p>
      </div>

      {/* ══════════════════════════════
          3-D GEOMETRY — Zara-tone: stark black/white lines
      ══════════════════════════════ */}

      {/* Orbiting ring system — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-8%",
          width: "480px", height: "480px",
          transform: `translate(${mouse.x * -18}px, ${mouse.y * -12}px) translateY(${scrollY * 0.07}px)`,
          transition: "transform 0.7s ease-out",
        }}
      >
        <div className="w-full h-full rounded-full border border-white/12 animate-orbit" />
        <div className="absolute inset-10 rounded-full border border-white/18 animate-orbit" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
        <div className="absolute inset-20 rounded-full border border-white/22 animate-spin-slow" />
      </div>

      {/* Orbiting ring system — left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "38%", left: "-12%",
          width: "360px", height: "360px",
          transform: `translate(${mouse.x * 14}px, ${mouse.y * 10}px) translateY(${scrollY * 0.1}px)`,
          transition: "transform 0.85s ease-out",
        }}
      >
        <div className="w-full h-full rounded-full border border-white/10 animate-orbit-reverse" />
        <div className="absolute inset-8 rounded-full border border-white/15" style={{ animation: "orbit 22s linear infinite" }} />
      </div>

      {/* 3-D portrait frame — upper right */}
      <div
        className="absolute border border-white/25 animate-float"
        style={{
          top: "20%", right: "16%",
          width: "88px", height: "120px",
          transform: `translate(${mouse.x * 22}px, ${mouse.y * 16}px) rotateX(${mouse.y * 12}deg) rotateY(${mouse.x * -12}deg) translateY(${scrollY * 0.12}px)`,
          transition: "transform 0.45s ease-out",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Smaller frame — left */}
      <div
        className="absolute border border-white/20 animate-float-alt"
        style={{
          top: "34%", left: "10%",
          width: "60px", height: "82px",
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -14}px) rotateX(${mouse.y * -10}deg) rotateY(${mouse.x * 10}deg)`,
          transition: "transform 0.5s ease-out",
        }}
      />
      {/* Tilted square */}
      <div
        className="absolute border border-white/22 animate-float"
        style={{
          top: "54%", left: "20%",
          width: "40px", height: "40px",
          transform: `translate(${mouse.x * 28}px, ${mouse.y * 20}px) rotate(45deg)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      {/* Far-right diamond */}
      <div
        className="absolute border border-white/18 animate-float-alt"
        style={{
          top: "60%", right: "10%",
          width: "28px", height: "28px",
          transform: `translate(${mouse.x * -16}px, ${mouse.y * -12}px) rotate(45deg)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* Vertical accent lines */}
      <div
        className="absolute top-16 left-[22%] w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
        style={{ height: "80px", transform: `translateX(${mouse.x * 12}px) translateY(${scrollY * 0.15}px)`, transition: "transform 0.5s ease-out" }}
      />
      <div
        className="absolute top-28 right-[24%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{ height: "55px", transform: `translateX(${mouse.x * -9}px) translateY(${scrollY * 0.12}px)`, transition: "transform 0.55s ease-out" }}
      />

      {/* Dot grids */}
      <div
        className="absolute top-[20%] left-[30%] grid grid-cols-5 gap-3 opacity-20"
        style={{ transform: `translate(${mouse.x * 14}px, ${mouse.y * 10}px) translateY(${scrollY * 0.09}px)`, transition: "transform 0.7s ease-out" }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
        ))}
      </div>
      <div
        className="absolute bottom-[32%] right-[18%] grid grid-cols-3 gap-3 opacity-15"
        style={{ transform: `translate(${mouse.x * -10}px, ${mouse.y * -7}px)`, transition: "transform 0.8s ease-out" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
        ))}
      </div>

      {/* ══════════════════════════════
          HERO TEXT — Zara: large, condensed, confident, minimal
      ══════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col items-start justify-end h-full pb-16 px-8 md:px-14"
        style={{
          transform: `translate(${mouse.x * -3}px, ${mouse.y * -2}px) translateY(${scrollY * -0.05}px)`,
          transition: "transform 1.1s ease-out",
        }}
      >
        {/* Eyebrow — tiny, tracking */}
        <p
          className="font-body font-light text-foreground/60 text-xs uppercase tracking-[0.55em] mb-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Model & Artist Management · Est. 2019
        </p>

        {/* Main headline — Zara: massive condensed, no decoration */}
        <h1
          className="font-display font-medium text-foreground leading-[0.9] opacity-0 animate-text-reveal-3d text-3d"
          style={{
            fontSize: "clamp(4.5rem, 13vw, 13rem)",
            letterSpacing: "0.04em",
            animationDelay: "0.3s",
            transform: `perspective(1000px) rotateX(${mouse.y * 2.5}deg) rotateY(${mouse.x * -2.5}deg)`,
            transition: "transform 0.9s ease-out",
          }}
        >
          WHERE
          <br />
          <span className="italic font-light" style={{ letterSpacing: "0.06em" }}>TALENT</span>
          <br />
          MEETS.
        </h1>

        {/* Divider line */}
        <div
          className="w-14 h-px bg-foreground/40 my-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        />

        {/* Description */}
        <p
          className="font-body font-light text-foreground/55 text-sm max-w-sm leading-relaxed mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.65s", letterSpacing: "0.02em" }}
        >
          India's premier model & artist management agency. Talent seen on{" "}
          <span className="text-foreground font-normal">MTV Splitsvilla</span>,{" "}
          <span className="text-foreground font-normal">Bigg Boss</span>,
          Myntra, Mango and Sanarée.
        </p>

        {/* CTA — Zara: understated, just text + line */}
        <Link
          to="/models"
          className="opacity-0 animate-fade-up inline-flex items-center gap-4 font-body font-normal text-xs tracking-[0.45em] uppercase text-foreground transition-all duration-300 group"
          style={{ animationDelay: "0.8s" }}
        >
          Explore Roster
          <span className="w-8 h-px bg-foreground inline-block transition-all duration-400 group-hover:w-14" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 right-12 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent animate-float" />
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-foreground/35 writing-mode-vertical" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
