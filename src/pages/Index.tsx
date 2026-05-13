import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelShowcase from "@/components/ModelShowcase";
import ClientsSection from "@/components/ClientsSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import usePageMeta from "@/hooks/usePageMeta";

const Index = () => {
  usePageMeta({
    title: "Alliance Models — Modeling Agency India | Freshers & Professional Models",
    description: "Premier modeling agency in India representing editorial, commercial and runway talent from Delhi, Mumbai and Kolkata. Freshers welcome — we turn aspiring models into professionals. Join now from ₹99.",
  });
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ModelShowcase />
      <ClientsSection />
      <JoinSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
