import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion model on a dramatic runway with golden lighting"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-24 px-6 text-center">
        <p
          className="font-body text-sm tracking-[0.4em] uppercase text-primary mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Fashion Portfolio
        </p>
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Discover <br />
          <span className="text-primary text-gold-glow italic">Extraordinary</span>
          <br /> Talent
        </h1>
        <p
          className="font-body text-muted-foreground text-lg md:text-xl max-w-lg mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          A curated roster of world-class models ready for your next vision.
        </p>
        <Link
          to="/models"
          className="opacity-0 animate-fade-up inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          style={{ animationDelay: "0.8s" }}
        >
          Explore Models
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
