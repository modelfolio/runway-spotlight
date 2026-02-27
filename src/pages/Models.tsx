import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ModelCard from "@/components/ModelCard";
import Footer from "@/components/Footer";
import { models, categories } from "@/data/models";

const Models = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? models
      : models.filter((m) => m.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset visibility on category change to re-trigger animations
  const handleCategory = (cat: string) => {
    setIsVisible(false);
    setActiveCategory(cat);
    setTimeout(() => setIsVisible(true), 50);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-up">
            <p className="font-body text-xs tracking-[0.5em] uppercase text-primary mb-3">
              Our Talent
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-foreground" style={{ letterSpacing: "0.06em" }}>
              The Roster
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-4 font-light max-w-md mx-auto leading-relaxed">
              Representing India's most sought-after models and artists since 2019
            </p>
            <div className="mx-auto mt-5 h-px w-36 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }} />
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`font-body text-sm tracking-widest uppercase px-5 py-2 border transition-all duration-300 hover:scale-105 ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Model Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((model, i) => (
              <div
                key={model.id}
                className="transition-all duration-600"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <ModelCard model={model} index={i} noEntrance />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body mt-12">
              No models found in this category.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Models;
