import Hero from "@/components/Hero";
import OnboardingFlow from "@/components/OnboardingFlow";
import TribesSection from "@/components/TribesSection";
import CausesSection from "@/components/CausesSection";
import RecognitionSection from "@/components/RecognitionSection";
import Navigation from "@/components/Navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast({ title: "Thank you!", description: "Your donation was successful." });
    } else if (payment === "cancel") {
      toast({ title: "Payment canceled", description: "You can try again anytime." });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div id="onboarding"><OnboardingFlow /></div>
      <div id="tribes"><TribesSection /></div>
      <div id="causes"><CausesSection /></div>
      <RecognitionSection />
      <Navigation />
    </div>
  );
};

export default Index;
