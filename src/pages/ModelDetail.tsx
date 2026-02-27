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
          <h1 className="font-display text-3xl font-light text-foreground">Talent profile not found</h1>
          <Link to="/models" className="text-primary font-body text-sm mt-4 inline-block">
            ← Back to roster
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

  const extraPhotos = model.portfolio.filter((p) => p !== model.image);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <Link
            to="/models"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors duration-200 group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Roster
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Hero image — B&W, hover reveals colour */}
            <div className="opacity-0 animate-fade-up">
              <div
                className="aspect-[3/4] overflow-hidden bg-secondary group"
                style={{ position: "relative" }}
              >
                <img
                  src={model.image}
                  alt={`${model.name} portfolio photo`}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: "grayscale(100%) contrast(1.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.06)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.18)" }} />
              </div>
            </div>

            {/* Info */}
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-xs tracking-[0.38em] uppercase text-foreground/45">
                  {model.category}
                </span>
                {model.available ? (
                  <span className="border border-foreground/25 text-foreground/70 text-xs px-3 py-1 font-body tracking-[0.28em] uppercase">
                    Available
                  </span>
                ) : (
                  <span className="border border-border text-muted-foreground text-xs px-3 py-1 font-body tracking-[0.28em] uppercase">
                    Booked
                  </span>
                )}
              </div>

              <h1
                className="font-display font-light text-foreground mb-2"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "0.04em", lineHeight: 1 }}
              >
                {model.name}
              </h1>
              <p className="font-body text-xs text-foreground/35 tracking-[0.38em] uppercase mb-8">
                {model.location}
              </p>

              <div className="w-10 h-px bg-foreground/20 mb-8" />

              <p className="font-body text-sm text-foreground/65 leading-relaxed mb-10 font-light">
                {model.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-px bg-border border border-border mb-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-background p-3 text-center">
                    <p className="font-body text-[9px] text-foreground/35 uppercase tracking-[0.3em] mb-1">
                      {stat.label}
                    </p>
                    <p className="font-display text-base font-light text-foreground" style={{ letterSpacing: "0.04em" }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="mb-10">
                <p className="font-body text-[9px] tracking-[0.45em] uppercase text-foreground/35 mb-4">
                  Experience
                </p>
                <div className="flex flex-wrap gap-2">
                  {model.experience.map((exp) => (
                    <span
                      key={exp}
                      className="border border-border text-foreground/60 font-body text-xs px-4 py-2 tracking-wide"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {model.available && (
                <button className="inline-flex items-center gap-4 font-body text-xs tracking-[0.45em] uppercase text-foreground transition-all duration-300 group mt-2">
                  Book This Talent
                  <span className="w-8 h-px bg-foreground inline-block transition-all duration-400 group-hover:w-14" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio gallery — only if extra photos exist */}
      {extraPhotos.length > 0 && (
        <section className="px-6 pb-24">
          <div className="container mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-6 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
              <div className="w-8 h-px bg-foreground/25" />
              <p className="font-body text-[10px] tracking-[0.55em] uppercase text-foreground/35">
                Portfolio
              </p>
              <div className="flex-1 h-px bg-border" />
              <p className="font-body text-[10px] tracking-[0.3em] text-foreground/25">
                {extraPhotos.length + 1} photos
              </p>
            </div>

            {/* Gallery grid */}
            <div
              className="grid gap-px bg-border opacity-0 animate-fade-up"
              style={{
                gridTemplateColumns: extraPhotos.length === 1
                  ? "repeat(2, 1fr)"
                  : extraPhotos.length === 2
                  ? "repeat(3, 1fr)"
                  : "repeat(2, 1fr)",
                animationDelay: "0.45s",
              }}
            >
              {/* Primary image thumbnail */}
              <div className="group overflow-hidden bg-secondary relative" style={{ aspectRatio: "3/4" }}>
                <img
                  src={model.image}
                  alt={`${model.name} — 1`}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ filter: "grayscale(100%) contrast(1.06)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.06)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.14)" }} />
                <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.3em] text-white/40 uppercase">01</span>
              </div>

              {/* Extra photos */}
              {extraPhotos.map((photo, i) => (
                <div key={i} className="group overflow-hidden bg-secondary relative" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={photo}
                    alt={`${model.name} — ${i + 2}`}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{ filter: "grayscale(100%) contrast(1.06)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.06)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.14)" }} />
                  <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.3em] text-white/40 uppercase">
                    0{i + 2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ModelDetail;
