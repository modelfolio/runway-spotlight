import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { models } from "@/data/models";
import LazyImage from "@/components/LazyImage";

const ModelDetail = () => {
  const { slug } = useParams();
  const model = models.find((m) => m.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const allPhotos = model
    ? [model.image, ...model.portfolio.filter((p) => p !== model.image)]
    : [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null)),
    [allPhotos.length]
  );

  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null)),
    [allPhotos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

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

  const gridColsClass =
    extraPhotos.length === 1
      ? "grid-cols-1 sm:grid-cols-2"
      : extraPhotos.length === 2
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

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
            {/* Hero image */}
            <div className="opacity-0 animate-fade-up">
              <div
                className="aspect-[3/4] overflow-hidden bg-secondary group cursor-pointer relative"
                onClick={() => setLightboxIndex(0)}
              >
                <LazyImage
                  src={model.image}
                  alt={`${model.name} portfolio photo`}
                  className="w-full h-full object-cover transition-all duration-500"
                  loading="eager"
                  style={{ filter: "grayscale(100%) contrast(1.06)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.06)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.18)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent md:hidden">
                  <span className="font-body text-[9px] tracking-[0.4em] text-white/60 uppercase">Tap to view</span>
                </div>
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

              <div className="mb-10">
                <p className="font-body text-[9px] tracking-[0.45em] uppercase text-foreground/35 mb-4">
                  Experience
                </p>
                <div className="flex flex-wrap gap-2">
                  {model.experience.map((exp) => (
                    <span key={exp} className="border border-border text-foreground/60 font-body text-xs px-4 py-2 tracking-wide">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

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

      {/* Portfolio gallery */}
      {extraPhotos.length > 0 && (
        <section className="px-6 pb-24">
          <div className="container mx-auto">
            <div className="flex items-center gap-6 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
              <div className="w-8 h-px bg-foreground/25" />
              <p className="font-body text-[10px] tracking-[0.55em] uppercase text-foreground/35">Portfolio</p>
              <div className="flex-1 h-px bg-border" />
              <p className="font-body text-[10px] tracking-[0.3em] text-foreground/25">
                {extraPhotos.length + 1} photos
              </p>
            </div>

            <div className={`grid gap-3 opacity-0 animate-fade-up ${gridColsClass}`} style={{ animationDelay: "0.45s" }}>
              {/* Primary photo */}
              <div
                className="group overflow-hidden bg-secondary relative cursor-pointer"
                style={{ aspectRatio: "3/4" }}
                onClick={() => setLightboxIndex(0)}
              >
                <LazyImage
                  src={model.image}
                  alt={`${model.name} — 1`}
                  className="w-full h-full object-cover transition-all duration-500"
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
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.14)" }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 font-body text-[10px] tracking-[0.4em] uppercase text-white transition-opacity duration-300">View</span>
                </div>
                <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.3em] text-white/40 uppercase">01</span>
              </div>

              {/* Extra photos */}
              {extraPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="group overflow-hidden bg-secondary relative cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => setLightboxIndex(i + 1)}
                >
                  <LazyImage
                    src={photo}
                    alt={`${model.name} — ${i + 2}`}
                    className="w-full h-full object-cover transition-all duration-500"
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
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.14)" }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 font-body text-[10px] tracking-[0.4em] uppercase text-white transition-opacity duration-300">View</span>
                  </div>
                  <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.3em] text-white/40 uppercase">
                    0{i + 2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Beautiful Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 animate-lightbox-enter"
          onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].screenX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 45) diff > 0 ? nextPhoto() : prevPhoto();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/97 backdrop-blur-md" onClick={closeLightbox} />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-5 pb-8 bg-gradient-to-b from-black/80 to-transparent">
            <span
              className="font-display font-light text-white/80 tracking-[0.08em] uppercase"
              style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)" }}
            >
              {model.name}
            </span>
            <span className="font-body text-[10px] tracking-[0.45em] uppercase text-white/35">
              {lightboxIndex + 1}&nbsp;/&nbsp;{allPhotos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Prev arrow — hidden on mobile (swipe instead) */}
          {allPhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200 bg-black/20 hover:bg-black/40"
              aria-label="Previous"
            >
              <ChevronLeft size={22} strokeWidth={1.2} />
            </button>
          )}

          {/* Main image */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-16 pt-16 pb-28 pointer-events-none">
            <img
              key={lightboxIndex}
              src={allPhotos[lightboxIndex]}
              alt={`${model.name} — ${lightboxIndex + 1}`}
              className="max-h-full max-w-full object-contain animate-lightbox-img pointer-events-auto"
              style={{ userSelect: "none", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>

          {/* Next arrow — hidden on mobile */}
          {allPhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200 bg-black/20 hover:bg-black/40"
              aria-label="Next"
            >
              <ChevronRight size={22} strokeWidth={1.2} />
            </button>
          )}

          {/* Bottom — thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 pt-10 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-center gap-2 px-4">
              {allPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className="relative overflow-hidden shrink-0 transition-all duration-300"
                  style={{
                    width: i === lightboxIndex ? "52px" : "40px",
                    height: i === lightboxIndex ? "68px" : "52px",
                    opacity: i === lightboxIndex ? 1 : 0.4,
                    outline: i === lightboxIndex ? "1px solid rgba(255,255,255,0.7)" : "1px solid transparent",
                    outlineOffset: "2px",
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>

            {/* Swipe hint — mobile only */}
            <p className="sm:hidden text-center font-body text-[9px] tracking-[0.4em] uppercase text-white/20 mt-4">
              Swipe to navigate
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default ModelDetail;
