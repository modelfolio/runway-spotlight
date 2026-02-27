import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { models } from "@/data/models";

const ModelDetail = () => {
  const { slug } = useParams();
  const model = models.find((m) => m.slug === slug);

  if (!model) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-display text-3xl text-foreground">Model not found</h1>
          <Link to="/models" className="text-primary font-body text-sm mt-4 inline-block">
            ← Back to models
          </Link>
        </div>
      </main>
    );
  }

  const stats = [
    { label: "Height", value: model.height },
    { label: "Bust", value: model.bust },
    { label: "Waist", value: model.waist },
    { label: "Hips", value: model.hips },
    { label: "Shoe", value: model.shoeSize },
    { label: "Eyes", value: model.eyeColor },
    { label: "Hair", value: model.hairColor },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-24 px-6">
        <div className="container mx-auto">
          <Link
            to="/models"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-12 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to models
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image */}
            <div className="opacity-0 animate-fade-up">
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={model.image}
                  alt={`${model.name} portfolio photo`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary">
                  {model.category}
                </span>
                {model.available ? (
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 font-body tracking-widest uppercase">
                    Available
                  </span>
                ) : (
                  <span className="bg-secondary text-muted-foreground text-xs px-3 py-1 font-body tracking-widest uppercase">
                    Booked
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {model.name}
              </h1>
              <p className="font-body text-muted-foreground mb-8">{model.location}</p>

              <p className="font-body text-foreground/80 leading-relaxed mb-10">{model.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="border border-border p-3">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="font-body text-foreground font-medium mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="mb-10">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Experience
                </h3>
                <div className="flex flex-wrap gap-2">
                  {model.experience.map((exp) => (
                    <span
                      key={exp}
                      className="bg-secondary text-secondary-foreground font-body text-sm px-4 py-2"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {model.available && (
                <button className="bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                  Select This Model
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ModelDetail;
