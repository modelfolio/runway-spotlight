import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, UserPlus, Send } from "lucide-react";
import { event as trackEvent } from "@/lib/analytics";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const DropNumberForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    trackEvent("drop_number_submit", { has_name: !!name });
    const msg = `Hi, I want to connect with Alliance Models.\n\n*Name:* ${name || "Not provided"}\n*WhatsApp:* ${phone}`;
    window.open(`https://wa.me/918527978830?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="mt-12 border-t border-white/10 pt-10">
      <p className="font-body font-light text-[10px] tracking-[0.42em] uppercase text-white/30 mb-3">
        Quick Connect
      </p>
      <h3
        className="font-display font-medium uppercase text-white mb-1"
        style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", letterSpacing: "0.04em" }}
      >
        Drop Your WhatsApp Number
      </h3>
      <p className="font-body font-light text-xs text-white/40 mb-6">
        We'll reach out to you directly on WhatsApp.
      </p>

      {sent ? (
        <div className="flex items-center gap-3 border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-4">
          <WaIcon />
          <p className="font-body font-light text-sm text-white/80">
            WhatsApp opened — we'll connect with you shortly!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-white/5 border border-white/15 focus:border-white/50 px-4 py-3 font-body font-light text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
          />
          <input
            type="tel"
            placeholder="+91 WhatsApp number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="flex-1 bg-white/5 border border-white/15 focus:border-white/50 px-4 py-3 font-body font-light text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fcf60] text-white px-6 py-3 font-body font-light text-xs tracking-[0.3em] uppercase transition-colors duration-200 flex-shrink-0"
          >
            <Send size={13} strokeWidth={1.5} />
            Connect
          </button>
        </form>
      )}
    </div>
  );
};

const JoinSection = () => (
  <section className="bg-[#0a0a0a] py-20 px-6 md:px-14">
    <div className="max-w-4xl mx-auto">

      {/* Top label */}
      <p className="font-body font-light text-[10px] tracking-[0.42em] uppercase text-white/30 mb-4">
        Join Alliance
      </p>

      {/* Headline */}
      <h2
        className="font-display font-medium uppercase text-white leading-none mb-5"
        style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "0.03em" }}
      >
        Get Your<br />Portfolio Link
      </h2>

      {/* Fresher-welcome statement */}
      <p className="font-body font-light text-base text-white/70 mb-4 max-w-xl leading-relaxed">
        No experience? <span className="text-white font-medium">No problem.</span> We turn freshers into professional models — all you need is the right attitude.
      </p>

      {/* Three proof points */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
        {[
          "Freshers welcome",
          "Professional training & guidance",
          "Experienced models — fast-tracked",
        ].map((pt) => (
          <span key={pt} className="flex items-center gap-2 font-body font-light text-[11px] tracking-wide text-white/50">
            <span className="w-1 h-1 bg-[#25D366] inline-block flex-shrink-0" />
            {pt}
          </span>
        ))}
      </div>

      {/* WhatsApp — main CTA, glowing */}
      <a
        href="https://wa.me/918527978830?text=Hi%2C%20I%20want%20to%20join%20the%20Alliance%20modelling%20group."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "join_section" })}
        className="join-glow w-full flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#1fcf60] text-white py-5 mb-4 transition-colors duration-200"
      >
        <WaIcon />
        <span className="font-display font-medium uppercase tracking-[0.12em] text-white"
          style={{ fontSize: "1.25rem" }}>
          Join Modelling Group on WhatsApp
        </span>
      </a>

      {/* Sub-line under WA button */}
      <p className="font-body font-light text-[11px] tracking-wide text-white/35 mb-12 text-center">
        Tap to open WhatsApp · Free to join · Freshers &amp; professionals both welcome
      </p>

      {/* Divider with pricing */}
      <div className="flex items-center gap-5 mb-8">
        <div className="flex-1 h-px bg-white/10" />
        <div className="flex gap-3">
          <span className="border border-white/20 px-3 py-1.5 font-body font-light text-[10px] tracking-[0.3em] uppercase text-white/50">
            Female — ₹99 / yr
          </span>
          <span className="border border-white/20 px-3 py-1.5 font-body font-light text-[10px] tracking-[0.3em] uppercase text-white/50">
            Male — ₹299 / yr
          </span>
        </div>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Two register cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/register"
          onClick={() => trackEvent("cta_click", { button: "upload_photo" })}
          className="group flex flex-col gap-5 border border-white/15 hover:border-white/50 bg-white/5 hover:bg-white/10 p-7 transition-all duration-200"
        >
          <Upload size={22} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors" />
          <div>
            <p className="font-display font-medium uppercase text-white tracking-wide text-base">
              Upload Your Photo
            </p>
            <p className="font-body font-light text-xs text-white/40 mt-1 leading-relaxed">
              Add a portrait and let your image speak first.
            </p>
          </div>
          <span className="font-body font-light text-[10px] tracking-[0.35em] uppercase text-white/30 group-hover:text-white transition-colors mt-auto">
            Start here →
          </span>
        </Link>

        <Link
          to="/register"
          onClick={() => trackEvent("cta_click", { button: "add_details" })}
          className="group flex flex-col gap-5 border border-white/15 hover:border-white/50 bg-white/5 hover:bg-white/10 p-7 transition-all duration-200"
        >
          <UserPlus size={22} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors" />
          <div>
            <p className="font-display font-medium uppercase text-white tracking-wide text-base">
              Add Your Details
            </p>
            <p className="font-body font-light text-xs text-white/40 mt-1 leading-relaxed">
              Fill in your measurements, experience and contact info.
            </p>
          </div>
          <span className="font-body font-light text-[10px] tracking-[0.35em] uppercase text-white/30 group-hover:text-white transition-colors mt-auto">
            Register now →
          </span>
        </Link>
      </div>

      <DropNumberForm />

    </div>
  </section>
);

export default JoinSection;
