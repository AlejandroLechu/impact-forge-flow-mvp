import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface OnboardingStep {
  id: number;
  question: string;
  type: 'interests' | 'skills' | 'location';
  options?: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    question: "What causes are you passionate about?",
    type: 'interests',
    options: ['Environment', 'Education', 'Health', 'Social Justice', 'Technology', 'Arts & Culture']
  },
  {
    id: 2,
    question: "What skills can you contribute?",
    type: 'skills',
    options: ['Leadership', 'Design', 'Programming', 'Marketing', 'Writing', 'Event Planning']
  },
  {
    id: 3,
    question: "Where are you located?",
    type: 'location',
    options: ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Remote']
  }
];

const suggestedTribes = [
  {
    name: "Green Tech Innovators",
    description: "Building sustainable technology solutions for environmental challenges",
    members: 1247,
    challenges: 8,
    location: "San Francisco"
  },
  {
    name: "Digital Education Alliance",
    description: "Creating accessible learning opportunities through technology",
    members: 892,
    challenges: 12,
    location: "Global"
  }
];

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    interests: [],
    skills: [],
    location: []
  });
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleSelection = (option: string) => {
    const step = onboardingSteps[currentStep];
    const stepType = step.type;
    
    setSelections(prev => ({
      ...prev,
      [stepType]: prev[stepType].includes(option) 
        ? prev[stepType].filter(item => item !== option)
        : [...prev[stepType], option]
    }));
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults) {
    return (
      <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">Perfect Matches Found!</h2>
            <p className="text-xl text-muted-foreground">Based on your interests, we've found tribes where you'll make the biggest impact.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {suggestedTribes.map((tribe, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{tribe.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{tribe.members} members</Badge>
                    <Badge variant="outline">{tribe.challenges} active challenges</Badge>
                    <Badge variant="secondary">{tribe.location}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tribe.description}</p>
                  <div className="flex gap-2">
                    <Button variant="default" className="flex-1">Join Tribe</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              Complete Onboarding
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const currentStepData = onboardingSteps[currentStep];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">Let's Find Your Perfect Tribe</h2>
          <p className="text-muted-foreground mb-6">Answer a few questions and we'll connect you with like-minded changemakers.</p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Step {currentStep + 1} of {onboardingSteps.length}</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">{currentStepData.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentStepData.options?.map((option) => (
                <Button
                  key={option}
                  variant={selections[currentStepData.type].includes(option) ? "glow" : "outline"}
                  className="justify-start p-4 h-auto text-left"
                  onClick={() => handleSelection(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={selections[currentStepData.type].length === 0}
                variant="hero"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Find My Tribes' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OnboardingFlow;