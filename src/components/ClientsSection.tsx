import { useEffect, useRef, useState } from "react";

interface Brand {
  name: string;
  domain: string;
}

const brands: Brand[] = [
  { name: "Myntra", domain: "myntra.com" },
  { name: "Mango", domain: "mango.com" },
  { name: "FabIndia", domain: "fabindia.com" },
  { name: "Vero Moda", domain: "veromoda.com" },
  { name: "Biba", domain: "biba.in" },
  { name: "AND", domain: "andindia.com" },
  { name: "Lakme", domain: "lakme.com" },
  { name: "Sanarée", domain: "sanaree.in" },
  { name: "W for Woman", domain: "wforwoman.com" },
  { name: "Global Desi", domain: "global-desi.com" },
  { name: "MTV India", domain: "mtv.com" },
  { name: "Colors TV", domain: "colorstv.com" },
  { name: "Twenty Dresses", domain: "twentydresses.com" },
  { name: "Okhai", domain: "okhai.com" },
  { name: "Bunaai", domain: "bunaai.com" },
];

/**
 * Tries logo sources in order:
 * 1. Apple Touch Icon from brand's own site (180×180, high quality)
 * 2. Apple Touch Icon precomposed variant
 * 3. Google Favicon V2 service (always returns something)
 * 4. Styled text fallback
 */
const getSources = (domain: string) => [
  `https://${domain}/apple-touch-icon.png`,
  `https://${domain}/apple-touch-icon-precomposed.png`,
  `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
];

const BrandLogoItem = ({ brand }: { brand: Brand }) => {
  const sources = getSources(brand.domain);
  const [srcIdx, setSrcIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (srcIdx < sources.length - 1) {
      setSrcIdx((i) => i + 1);
    } else {
      setAllFailed(true);
    }
  };

  return (
    <span className="inline-flex flex-shrink-0 items-center gap-3 mx-8 opacity-50 hover:opacity-100 transition-all duration-400 cursor-default group">
      {!allFailed ? (
        <img
          src={sources[srcIdx]}
          alt={brand.name}
          title={brand.name}
          className="h-8 w-auto max-w-[110px] object-contain grayscale group-hover:grayscale-0 transition-all duration-400"
          onError={handleError}
          loading="lazy"
          crossOrigin="anonymous"
        />
      ) : (
        <span
          className="font-display text-xl font-light text-foreground/55 group-hover:text-foreground transition-colors duration-300"
          style={{ letterSpacing: "0.08em" }}
        >
          {brand.name}
        </span>
      )}
      <span className="w-px h-5 bg-border flex-shrink-0" />
    </span>
  );
};

const productions = [
  {
    title: "MTV Splitsvilla",
    seasons: "Seasons 13 & 14",
    network: "MTV India",
    desc: "Multiple Alliance talents selected for India's most-watched dating reality show — earning national visibility across a young, fashion-forward audience of 30M+ viewers.",
  },
  {
    title: "Bigg Boss",
    seasons: "Seasons 16 & 17",
    network: "Colors TV",
    desc: "Our models and artists participated in and styled for India's biggest reality format, reaching 50M+ viewers per episode across broadcast and digital platforms.",
  },
];

const stats = [
  { value: "2019", label: "Established" },
  { value: "50+", label: "Talent on Roster" },
  { value: "100+", label: "Campaigns Delivered" },
  { value: "15+", label: "Brand Partners" },
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate for seamless marquee loop
  const marqueeItems = [...brands, ...brands];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ── Stats strip ── */}
      <div className="border-y border-border bg-card">
        <div className="container mx-auto px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(28px)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <p
                className="font-display font-light text-primary text-3d"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", letterSpacing: "0.04em" }}
              >
                {s.value}
              </p>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trusted By — brand logo marquee ── */}
      <div className="py-20 overflow-hidden bg-background">
        <div
          className="text-center mb-14 transition-all duration-800"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.25s",
          }}
        >
          <p className="font-body text-xs tracking-[0.55em] uppercase text-primary mb-3">
            Trusted By
          </p>
          <h2
            className="font-display font-light text-foreground text-3d"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "0.07em" }}
          >
            Our Brand Partners
          </h2>
          <div
            className="mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent transition-all duration-1000"
            style={{ width: isVisible ? "9rem" : "0", transitionDelay: "0.55s" }}
          />
        </div>

        {/* Marquee row 1 — left to right */}
        <div className="relative overflow-hidden py-5">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap">
            {marqueeItems.map((brand, i) => (
              <BrandLogoItem key={i} brand={brand} />
            ))}
          </div>
        </div>

        {/* Marquee row 2 — right to left, slower */}
        <div className="relative overflow-hidden py-5 mt-2">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 50s linear infinite reverse" }}
          >
            {[...marqueeItems].reverse().map((brand, i) => (
              <BrandLogoItem key={i} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Productions ── */}
      <div className="border-t border-border bg-card py-20 px-8">
        <div className="container mx-auto">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0.15s",
            }}
          >
            <p className="font-body text-xs tracking-[0.55em] uppercase text-primary mb-3">
              In The Spotlight
            </p>
            <h2
              className="font-display font-light text-foreground text-3d"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "0.07em" }}
            >
              Featured Productions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {productions.map((prod, i) => (
              <div
                key={prod.title}
                className="relative border border-border p-9 group hover:border-primary/35 transition-all duration-600 overflow-hidden"
                style={{
                  perspective: "800px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(40px) rotateX(6deg)",
                  transitionDelay: `${i * 0.15 + 0.3}s`,
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Hover background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                {/* Corner accents */}
                <div className="absolute top-0 right-0">
                  <div
                    className="h-px bg-primary/40 transition-all duration-500"
                    style={{ width: "3rem" }}
                  />
                  <div
                    className="w-px bg-primary/40 ml-auto transition-all duration-500"
                    style={{ height: "3rem" }}
                  />
                </div>

                <div className="relative z-10">
                  <p className="font-body text-xs tracking-[0.45em] uppercase text-primary mb-2">
                    {prod.network}
                  </p>
                  <h3
                    className="font-display font-light text-foreground mb-1.5"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "0.05em" }}
                  >
                    {prod.title}
                  </h3>
                  <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
                    {prod.seasons}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed font-light">
                    {prod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
