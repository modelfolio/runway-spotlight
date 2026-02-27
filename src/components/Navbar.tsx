import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/models", label: "Roster" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 md:px-12">

        {/* ── Zara-style logo: condensed, tight, confident ── */}
        <Link
          to="/"
          className="font-display font-medium uppercase text-foreground transition-opacity duration-200 hover:opacity-50 select-none"
          style={{
            fontSize: "1.55rem",
            letterSpacing: "0.06em",
          }}
        >
          ALLIANCE
        </Link>

        {/* ── Desktop nav: ultra-minimal uppercase links ── */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body font-normal uppercase text-xs tracking-[0.38em] transition-opacity duration-200 ${
                location.pathname === l.to
                  ? "text-foreground opacity-100"
                  : "text-foreground opacity-40 hover:opacity-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden text-foreground opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-5 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-body font-normal text-xs tracking-[0.38em] uppercase text-foreground/50 hover:text-foreground transition-opacity duration-150"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
