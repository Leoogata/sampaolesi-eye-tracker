import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SampaolesiChart from "@/components/SampaolesiChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Main Calculator Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Gráfico Interativo
            </h2>
            <div className="w-24 h-1 bg-medical-green mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Para tornar sua aplicação mais prática, rápida e acessível, a Sociedade Brasileira de Glaucoma desenvolveu esta versão digital e interativa, que facilita a interpretação dos dados biométricos na prática clínica.
            </p>
          </div>

          {/* Calculator Component */}
          <div className="max-w-6xl mx-auto">
            <SampaolesiChart />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
