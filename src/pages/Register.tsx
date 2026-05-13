import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, Check, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { event as trackEvent } from "@/lib/analytics";
import usePageMeta from "@/hooks/usePageMeta";

const WHATSAPP_NUMBER = "918527978830";
const PHONEPE_UPI = "8527978830@ybl";
const PAYTM_UPI = "8527978830@paytm";

type Gender = "female" | "male" | "";

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  gender: Gender;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoeSize: string;
  eyeColor: string;
  hairColor: string;
  bio: string;
  transactionId: string;
}

const STEPS = ["Details", "Measurements", "Photo", "Payment", "Done"];

const toSlug = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const Register = () => {
  usePageMeta({
    title: "Register & Get Your Portfolio Link — Alliance Models India",
    description: "Join Alliance Models and get your own professional portfolio page. Open to freshers and experienced models. Female ₹99/yr · Male ₹299/yr.",
  });
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", city: "", gender: "",
    height: "", bust: "", waist: "", hips: "", shoeSize: "",
    eyeColor: "", hairColor: "", bio: "", transactionId: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const price = form.gender === "female" ? 99 : form.gender === "male" ? 299 : null;
  const slug = toSlug(form.name);
  const portfolioLink = `https://alliancemodels.in/models/${slug}`;

  const set = (k: keyof FormData, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const canNext = () => {
    if (step === 0) return form.name && form.phone && form.city && form.gender;
    if (step === 1) return form.height;
    if (step === 2) return !!photoFile;
    if (step === 3) return form.transactionId.trim().length > 4;
    return true;
  };

  const advanceStep = () => {
    trackEvent("register_step_complete", { step, gender: form.gender });
    setStep((s) => s + 1);
  };

  const submitToWhatsApp = () => {
    trackEvent("register_submit", { gender: form.gender, city: form.city });
    const msg = [
      `*New Portfolio Registration — Alliance Models*`,
      ``,
      `*Name:* ${form.name}`,
      `*Gender:* ${form.gender}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email}`,
      `*City:* ${form.city}`,
      ``,
      `*Measurements*`,
      `Height: ${form.height}`,
      `Bust/Chest: ${form.bust}`,
      `Waist: ${form.waist}`,
      `Hips: ${form.hips}`,
      `Shoe Size: ${form.shoeSize}`,
      `Eye Color: ${form.eyeColor}`,
      `Hair Color: ${form.hairColor}`,
      ``,
      `*Bio:* ${form.bio}`,
      ``,
      `*Payment*`,
      `Amount: ₹${price}`,
      `Transaction ID / UTR: ${form.transactionId}`,
      ``,
      `⚠️ Please reply to this message with your *payment screenshot* so we can verify and activate your portfolio.`,
      ``,
      `*Requested Portfolio Link:* ${portfolioLink}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setStep(4);
  };

  const inputCls =
    "w-full bg-transparent border-b border-border py-2.5 text-sm font-body text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors";
  const labelCls =
    "block font-body font-light text-[10px] tracking-[0.32em] uppercase text-foreground/50 mb-1.5";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors mb-8"
          >
            <ArrowLeft size={12} strokeWidth={1.5} /> Back
          </Link>
          <h1
            className="font-display font-medium uppercase text-foreground"
            style={{ fontSize: "2rem", letterSpacing: "0.04em" }}
          >
            Get Your Portfolio Link
          </h1>
          <p className="font-body font-light text-xs tracking-wide text-foreground/50 mt-2">
            Register with Alliance · Annual membership
          </p>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="flex items-center gap-0 mb-10">
            {STEPS.slice(0, 4).map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-[10px] font-body font-medium border transition-colors ${
                      i < step
                        ? "bg-foreground border-foreground text-background"
                        : i === step
                        ? "border-foreground text-foreground"
                        : "border-border text-foreground/30"
                    }`}
                  >
                    {i < step ? <Check size={10} strokeWidth={2} /> : i + 1}
                  </div>
                  <span
                    className={`font-body text-[9px] tracking-[0.25em] uppercase mt-1 ${
                      i === step ? "text-foreground" : "text-foreground/30"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={`h-px w-10 sm:w-16 mx-1 mb-3 transition-colors ${
                      i < step ? "bg-foreground" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Step 0: Personal Details ── */}
        {step === 0 && (
          <div className="space-y-7">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                className={inputCls}
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>

            {/* Gender + pricing */}
            <div>
              <label className={labelCls}>Gender *</label>
              <div className="flex gap-4 mt-1">
                {(["female", "male"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => set("gender", g)}
                    className={`flex-1 py-3 border font-body font-light text-xs tracking-[0.3em] uppercase transition-colors ${
                      form.gender === g
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground/50 border-border hover:border-foreground/50"
                    }`}
                  >
                    {g === "female" ? "Female — ₹99/yr" : "Male — ₹299/yr"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Phone Number *</label>
              <input
                className={inputCls}
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>Email</label>
              <input
                className={inputCls}
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>City *</label>
              <input
                className={inputCls}
                placeholder="Delhi, Mumbai, Kolkata…"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ── Step 1: Measurements ── */}
        {step === 1 && (
          <div className="space-y-7">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Height *</label>
                <input
                  className={inputCls}
                  placeholder="5'6&quot;"
                  value={form.height}
                  onChange={(e) => set("height", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Shoe Size</label>
                <input
                  className={inputCls}
                  placeholder="7 / 40"
                  value={form.shoeSize}
                  onChange={(e) => set("shoeSize", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Bust / Chest</label>
                <input
                  className={inputCls}
                  placeholder='34"'
                  value={form.bust}
                  onChange={(e) => set("bust", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Waist</label>
                <input
                  className={inputCls}
                  placeholder='26"'
                  value={form.waist}
                  onChange={(e) => set("waist", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Hips</label>
                <input
                  className={inputCls}
                  placeholder='35"'
                  value={form.hips}
                  onChange={(e) => set("hips", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Eye Color</label>
                <input
                  className={inputCls}
                  placeholder="Brown"
                  value={form.eyeColor}
                  onChange={(e) => set("eyeColor", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Hair Color</label>
              <input
                className={inputCls}
                placeholder="Black"
                value={form.hairColor}
                onChange={(e) => set("hairColor", e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>Short Bio</label>
              <textarea
                className={`${inputCls} resize-none min-h-[80px]`}
                placeholder="Tell brands a little about yourself…"
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ── Step 2: Photo Upload ── */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="font-body font-light text-xs tracking-wide text-foreground/50">
              Upload a clear, well-lit portrait photo. This will be your primary profile image.
            </p>

            <div
              onClick={() => fileRef.current?.click()}
              className="border border-dashed border-border hover:border-foreground/50 cursor-pointer transition-colors flex flex-col items-center justify-center gap-4 py-14"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-40 h-52 object-cover"
                />
              ) : (
                <>
                  <Upload size={22} strokeWidth={1} className="text-foreground/30" />
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                    Click to upload photo
                  </span>
                </>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />

            {photoFile && (
              <p className="font-body text-xs text-foreground/50">
                {photoFile.name}
              </p>
            )}

            <p className="font-body font-light text-[10px] tracking-wide text-foreground/35">
              Accepted: JPG, PNG · You can send more photos via WhatsApp after registration.
            </p>
          </div>
        )}

        {/* ── Step 3: Payment ── */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="border border-border p-6">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body font-light text-xs tracking-[0.3em] uppercase text-foreground/50">
                  Annual Membership
                </span>
                <span
                  className="font-display font-medium text-foreground"
                  style={{ fontSize: "1.6rem", letterSpacing: "0.04em" }}
                >
                  ₹{price}
                </span>
              </div>
              <p className="font-body font-light text-[10px] tracking-wide text-foreground/35">
                {form.gender === "female" ? "Female" : "Male"} · {form.name} · Valid 1 year
              </p>
            </div>

            <div>
              <p className="font-body font-light text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-4">
                Pay via UPI
              </p>

              <div className="space-y-3">
                {/* PhonePe */}
                <div className="flex items-center justify-between border border-border px-4 py-3">
                  <div>
                    <p className="font-body font-medium text-xs text-foreground tracking-wide">
                      PhonePe
                    </p>
                    <p className="font-body font-light text-xs text-foreground/50 mt-0.5">
                      {PHONEPE_UPI}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PHONEPE_UPI, "phonepe")}
                    className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {copied === "phonepe" ? (
                      <Check size={11} strokeWidth={2} />
                    ) : (
                      <Copy size={11} strokeWidth={1.5} />
                    )}
                    {copied === "phonepe" ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Paytm */}
                <div className="flex items-center justify-between border border-border px-4 py-3">
                  <div>
                    <p className="font-body font-medium text-xs text-foreground tracking-wide">
                      Paytm
                    </p>
                    <p className="font-body font-light text-xs text-foreground/50 mt-0.5">
                      {PAYTM_UPI}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PAYTM_UPI, "paytm")}
                    className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {copied === "paytm" ? (
                      <Check size={11} strokeWidth={2} />
                    ) : (
                      <Copy size={11} strokeWidth={1.5} />
                    )}
                    {copied === "paytm" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <p className="font-body font-light text-[10px] tracking-wide text-foreground/35 mt-3">
                Send ₹{price} and save your transaction ID / screenshot.
              </p>
            </div>

            <div>
              <label className={labelCls}>Transaction ID / UTR Number *</label>
              <input
                className={inputCls}
                placeholder="e.g. 425812349876"
                value={form.transactionId}
                onChange={(e) => set("transactionId", e.target.value)}
              />
              <p className="font-body font-light text-[10px] tracking-wide text-foreground/35 mt-1.5">
                Found in your payment app under transaction details.
              </p>
            </div>

            {/* Screenshot reminder */}
            <div className="border border-border bg-secondary/40 px-4 py-4">
              <p className="font-body font-medium text-xs text-foreground tracking-wide mb-1">
                Important — take a screenshot of your payment
              </p>
              <p className="font-body font-light text-[11px] text-foreground/55 leading-relaxed">
                After clicking Submit, WhatsApp will open with your details pre-filled.{" "}
                <span className="text-foreground/80 font-medium">Send your payment screenshot in the same chat.</span>{" "}
                Your portfolio will be activated only after payment is confirmed by our team.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 4: Done ── */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground flex items-center justify-center flex-shrink-0">
                <Check size={14} strokeWidth={2} className="text-background" />
              </div>
              <div>
                <p className="font-display font-medium uppercase text-foreground tracking-wide text-lg">
                  Registration Submitted
                </p>
                <p className="font-body font-light text-xs text-foreground/50 mt-0.5">
                  We'll review your details and activate your portfolio within 24 hrs.
                </p>
              </div>
            </div>

            <div className="border border-border p-5">
              <p className="font-body font-light text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-2">
                Your Portfolio Link
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-body text-sm text-foreground break-all">
                  {portfolioLink}
                </p>
                <button
                  onClick={() => copyToClipboard(portfolioLink, "link")}
                  className="flex-shrink-0 flex items-center gap-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground transition-colors"
                >
                  {copied === "link" ? (
                    <Check size={11} strokeWidth={2} />
                  ) : (
                    <Copy size={11} strokeWidth={1.5} />
                  )}
                  {copied === "link" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="font-body font-light text-[10px] tracking-wide text-foreground/35 mt-2">
                Link activates after admin approval. Save this for your records.
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full justify-center border border-foreground/20 hover:border-foreground py-3.5 font-body font-light text-xs tracking-[0.3em] uppercase text-foreground/70 hover:text-foreground transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            <Link
              to="/"
              className="block text-center font-body font-light text-[10px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 font-body font-light text-xs tracking-[0.3em] uppercase text-foreground/50 hover:text-foreground transition-colors"
              >
                <ArrowLeft size={12} strokeWidth={1.5} /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button
                disabled={!canNext()}
                onClick={advanceStep}
                className="flex items-center gap-2 font-body font-light text-xs tracking-[0.3em] uppercase text-foreground disabled:opacity-25 hover:opacity-60 transition-opacity"
              >
                Next <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            ) : (
              <button
                disabled={!canNext()}
                onClick={submitToWhatsApp}
                className="flex items-center gap-2 bg-foreground text-background px-6 py-3 font-body font-light text-xs tracking-[0.3em] uppercase disabled:opacity-30 hover:opacity-80 transition-opacity"
              >
                Submit via WhatsApp <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Register;
