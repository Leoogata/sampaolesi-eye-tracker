import eyeHero from "@/assets/eye-hero.png";

const HeroSection = () => {
  return (
    <section className="bg-navy-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-overlay"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-medical-green">CALCULADORA</span><br />
              SAMPAOLESI
            </h1>
            <div className="w-16 h-1 bg-medical-green mb-6"></div>
            <p className="text-lg mb-8 leading-relaxed opacity-90">
              Uma calculadora do gráfico de Sampaolesi feita para a comunidade oftalmológica
            </p>
          </div>

          {/* Right Content - Eye Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={eyeHero} 
                alt="Eye examination - Sampaolesi Calculator" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-medical-green/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-light/30 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-16 max-w-4xl">
          <p className="text-primary-foreground/80 text-base leading-relaxed">
            A Calculadora de Sampaolesi é uma ferramenta desenvolvida pela Sociedade Brasileira de Glaucoma com o objetivo de apoiar a comunidade oftalmológica, facilitando a interpretação e a aplicação do Gráfico de Sampaolesi na prática clínica.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;