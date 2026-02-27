import { Link } from "react-router-dom";
import type { ModelProfile } from "@/data/models";

interface ModelCardProps {
  model: ModelProfile;
  index: number;
}

const ModelCard = ({ model, index }: ModelCardProps) => {
  return (
    <Link
      to={`/models/${model.slug}`}
      className="group block opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
        <img
          src={model.image}
          alt={`${model.name} — ${model.category} model`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">
            {model.category}
          </p>
          <p className="font-body text-sm text-muted-foreground">
            {model.location} · {model.height}
          </p>
          {model.available && (
            <span className="mt-3 inline-block bg-primary text-primary-foreground text-xs px-3 py-1 tracking-widest uppercase">
              Available
            </span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {model.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1">{model.category}</p>
      </div>
    </Link>
  );
};

export default ModelCard;
