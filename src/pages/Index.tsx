import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelShowcase from "@/components/ModelShowcase";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ModelShowcase />
      <ClientsSection />
      <Footer />
    </main>
  );
};

export default Index;
