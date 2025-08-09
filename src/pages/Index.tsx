import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OnboardingFlow from "@/components/OnboardingFlow";
import TribesSection from "@/components/TribesSection";
import CausesSection from "@/components/CausesSection";
import RecognitionSection from "@/components/RecognitionSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Target, Sparkles } from "lucide-react";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
        
        {/* CTA Section */}
        <div className="relative -mt-20 z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card/90 backdrop-blur-lg rounded-2xl shadow-glow p-8 text-center border border-border/50">
              <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of changemakers building a better world through community action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={handleStartOnboarding}>
                  <Sparkles className="w-5 h-5" />
                  Start AI Onboarding
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="w-5 h-5" />
                  Browse Tribes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform connects you with like-minded people and meaningful causes in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our AI learns your interests and skills to match you with the perfect tribe and causes.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Join Your Tribe</h3>
              <p className="text-muted-foreground">
                Connect with passionate people in your area working on causes you care about.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Create Impact</h3>
              <p className="text-muted-foreground">
                Participate in challenges, support causes, and track your measurable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tribes Section */}
      <section id="tribes">
        <TribesSection />
      </section>

      {/* Causes Section */}
      <section id="causes">
        <CausesSection />
      </section>

      {/* Recognition Section */}
      <section id="recognition">
        <RecognitionSection />
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your Impact?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our growing community of changemakers and start creating measurable impact today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={handleStartOnboarding}>
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </Button>
            <Button variant="glow" size="lg">
              <Heart className="w-5 h-5" />
              Support a Cause
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold">Ecosystem</span>
              </div>
              <p className="text-background/70">
                Building communities that create lasting impact through technology and human connection.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Tribes</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Causes</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Recognition</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Community</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Newsletter</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">About</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 Ecosystem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
