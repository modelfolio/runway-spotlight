import { useState } from "react";
import Navbar from "@/components/Navbar";
import ModelCard from "@/components/ModelCard";
import Footer from "@/components/Footer";
import { models, categories } from "@/data/models";

const Models = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? models
      : models.filter((m) => m.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-3">
              Directory
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Our Models
            </h1>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm tracking-widest uppercase px-5 py-2 border transition-colors ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} />
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
