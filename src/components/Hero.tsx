import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ecosystem.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/50 to-accent/30">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-hero to-glow bg-clip-text text-transparent leading-tight">
          Build Your Impact Ecosystem
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Connect tribes, causes, and communities. Transform passion into measurable impact through AI-powered collaboration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="hero"
            className="px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="glow"
            className="px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Discover Causes
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="text-2xl font-bold text-primary mb-2">10K+</h3>
            <p className="text-muted-foreground">Active Members</p>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="text-2xl font-bold text-success mb-2">$2M+</h3>
            <p className="text-muted-foreground">Funds Raised</p>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="text-2xl font-bold text-glow mb-2">500+</h3>
            <p className="text-muted-foreground">Causes Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;