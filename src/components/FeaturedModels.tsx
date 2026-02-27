import { models } from "@/data/models";
import ModelCard from "./ModelCard";
import { Link } from "react-router-dom";

const FeaturedModels = () => {
  const featured = models.slice(0, 3);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-3">
            Our Roster
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Featured Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/models"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Models
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
