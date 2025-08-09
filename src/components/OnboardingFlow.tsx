import { useState, useEffect, useRef } from "react";
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

import { useMutation } from "@tanstack/react-query";
import { suggestTribes, aiOnboardingChat } from "@/lib/api";

const suggestedTribesFallback = [
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
  const [messages, setMessages] = useState<{ role: 'system' | 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I’m your guide. Tell me about what causes you care about, your skills, and where you are. We’ll match you to the perfect tribe." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  interface SuggestedTribe {
    id?: number
    name: string
    description: string
    location?: string | null
    members?: number
    challenges?: number
  }

  const [suggested, setSuggested] = useState<SuggestedTribe[] | null>(null);

  const { mutateAsync: getSuggestions, isPending } = useMutation({
    mutationFn: (payload: { interests: string[]; skills: string[]; location: string[] }) => suggestTribes(payload),
  });

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

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const res = await getSuggestions({
          interests: selections.interests,
          skills: selections.skills,
          location: selections.location,
        });
        setSuggested(res);
      } catch (_) {
        setSuggested(null);
      }
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
            {(suggested && suggested.length > 0 ? suggested.slice(0, 2) : suggestedTribesFallback).map((tribe: SuggestedTribe, index: number) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{tribe.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Members TBD</Badge>
                    <Badge variant="outline">Challenges TBD</Badge>
                    <Badge variant="secondary">{tribe.location || "Unknown"}</Badge>
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
          <h2 className="text-3xl font-bold mb-4 text-primary">Let’s Chat</h2>
          <p className="text-muted-foreground mb-6">Natural conversation with AI. We’ll learn your interests, skills, and location.</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Conversational Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-auto mb-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${m.role === 'assistant' ? 'bg-muted/50' : 'bg-primary/10'} text-sm`}>{m.content}</div>
              ))}
              {isPending && <div className="p-3 rounded-lg bg-muted/50 text-sm animate-pulse">Thinking…</div>}
            </div>
            <div className="flex gap-2">
              <input ref={inputRef} className="flex-1 border rounded px-3 py-2 bg-background" placeholder="Type your message…" onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const text = (e.target as HTMLInputElement).value.trim();
                  if (!text) return;
                  (e.target as HTMLInputElement).value = '';
                  const next = [...messages, { role: 'user', content: text }];
                  setMessages(next);
                  try {
                    const ai = await aiOnboardingChat({ session_id: sessionId, messages: next });
                    setMessages([...next, { role: 'assistant', content: ai.reply }]);
                    // Apply profile delta heuristically to current selections for progress bar
                    const { interests = [], skills = [] } = ai.profile_delta || {};
                    interests.forEach((i: string) => handleSelection(i));
                    skills.forEach((s: string) => handleSelection(s));
                  } catch (_) {
                    setMessages([...next, { role: 'assistant', content: 'Thanks! Tell me more.' }]);
                  }
                }
              }} />
              <Button onClick={() => handleNext()} variant="hero">Continue</Button>
            </div>
            <div className="mt-3">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-1">We’ll suggest tribes after we learn enough.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OnboardingFlow;