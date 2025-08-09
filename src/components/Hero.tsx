import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-ecosystem.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-glow"></div>
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Community ecosystem connecting people through tribes and causes"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
              Build Your Impact
              <br />
              <span className="text-accent">Together</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Join tribes, support causes, and create measurable impact through our AI-powered ecosystem that connects digital communities with real-world change.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glow" size="lg" className="text-lg px-8 py-6">
              Explore Causes
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-white">1,247</div>
              <div className="text-primary-glow">Active Members</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-8 h-8 text-impact" />
              </div>
              <div className="text-3xl font-bold text-white">$47K</div>
              <div className="text-primary-glow">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-white">156</div>
              <div className="text-primary-glow">Active Causes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}