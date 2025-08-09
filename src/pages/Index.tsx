import Hero from "@/components/Hero";
import OnboardingFlow from "@/components/OnboardingFlow";
import TribesSection from "@/components/TribesSection";
import CausesSection from "@/components/CausesSection";
import RecognitionSection from "@/components/RecognitionSection";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <OnboardingFlow />
      <TribesSection />
      <CausesSection />
      <RecognitionSection />
      <Navigation />
    </div>
  );
};

export default Index;
