import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary-foreground rounded-full opacity-90"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold">SOCIEDADE</h1>
              <h2 className="text-sm font-medium opacity-90">BRASILEIRA DE GLAUCOMA</h2>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                INSTITUCIONAL
              </button>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                CIENTÍFICO
              </button>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                EVENTOS
              </button>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                FELLOWSHIP
              </button>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                NOTÍCIAS
              </button>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-medical-green transition-colors">
                SBGZINHA
              </button>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-medical-green hover:bg-medical-green-hover text-primary-foreground border-0"
            >
              Seja um associado
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white text-black border-none hover:bg-white hover:text-black"
            >
              Área do associado
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-primary-foreground mb-1"></div>
            <div className="w-6 h-0.5 bg-primary-foreground mb-1"></div>
            <div className="w-6 h-0.5 bg-primary-foreground"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;