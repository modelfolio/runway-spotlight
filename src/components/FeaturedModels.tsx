import { models } from "@/data/models";
import ModelCard from "./ModelCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const FeaturedModels = () => {
  const featured = models.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Parallax background blobs */}
      <div
        className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-3xl animate-glow-pulse"
        style={{ transform: `translateY(${scrollY * 0.06}px)` }}
      />
      <div
        className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-glow-pulse"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
          animationDelay: "2s",
        }}
      />

      {/* Floating decoratives */}
      <div
        className="absolute top-16 left-[8%] w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-float"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />
      <div
        className="absolute top-24 right-[10%] w-8 h-8 border border-primary/25 rotate-45 animate-float-alt"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute bottom-24 right-[15%] w-px h-28 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-[12%] grid grid-cols-3 gap-2.5 opacity-30 animate-drift-x"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-primary" />
        ))}
      </div>

      {/* Section header */}
      <div className="container mx-auto relative z-10">
        <div
          className="text-center mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <p className="font-body text-xs tracking-[0.5em] uppercase text-primary mb-3">
            Our Roster
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground" style={{ letterSpacing: "0.06em" }}>
            Featured Talent
          </h2>
          {/* Animated underline */}
          <div
            className="mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000"
            style={{
              width: isVisible ? "12rem" : "0",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "0.35s",
            }}
          />
        </div>

        {/* Model cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((model, i) => (
            <div
              key={model.id}
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                transitionDelay: `${i * 0.15 + 0.25}s`,
              }}
            >
              <ModelCard model={model} index={i} noEntrance />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.75s",
          }}
        >
          <Link
            to="/models"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 font-body text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:scale-105"
          >
            View All Talent
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
