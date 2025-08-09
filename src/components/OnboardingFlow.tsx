import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, MapPin, Lightbulb, Users, Heart } from "lucide-react";

interface OnboardingProps {
  onComplete: (userData: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const interests = [
    "Environmental Protection", "Community Health", "Education", "Technology", 
    "Arts & Culture", "Social Justice", "Local Development", "Mental Health"
  ];

  const skills = [
    "Event Planning", "Social Media", "Fundraising", "Teaching", 
    "Design", "Photography", "Writing", "Leadership"
  ];

  const suggestedTribes = [
    {
      name: "EcoWarriors Seattle",
      description: "Fighting climate change through local action",
      members: 234,
      icon: "🌱",
      match: 95
    },
    {
      name: "Tech for Good",
      description: "Using technology to solve social problems",
      members: 187,
      icon: "💻",
      match: 87
    },
    {
      name: "Community Builders",
      description: "Strengthening neighborhood connections",
      members: 156,
      icon: "🏘️",
      match: 82
    }
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        interests: selectedInterests,
        skills: selectedSkills,
        location,
        suggestedTribe: suggestedTribes[0]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-glow flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-glow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            {step === 1 && <Heart className="w-8 h-8 text-white" />}
            {step === 2 && <Lightbulb className="w-8 h-8 text-white" />}
            {step === 3 && <MapPin className="w-8 h-8 text-white" />}
            {step === 4 && <Users className="w-8 h-8 text-white" />}
          </div>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            {step === 1 && "What Causes Do You Care About?"}
            {step === 2 && "What Skills Can You Contribute?"}
            {step === 3 && "Where Are You Located?"}
            {step === 4 && "Perfect Tribe Matches Found!"}
          </CardTitle>
          <Progress value={(step / 4) * 100} className="w-full mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                Select the causes that matter most to you. This helps us find your perfect tribe.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="p-3 cursor-pointer hover:shadow-card transition-all text-center justify-center"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                What skills can you bring to help your tribe succeed?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="p-3 cursor-pointer hover:shadow-card transition-all text-center justify-center"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                Help us connect you with local tribes and events.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your city or region"
                  className="w-full p-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button variant="glow" className="w-full" onClick={() => setLocation("Seattle, WA")}>
                  <MapPin className="w-4 h-4" />
                  Use My Current Location
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                Based on your interests and location, here are your perfect tribe matches:
              </p>
              <div className="space-y-3">
                {suggestedTribes.map((tribe, index) => (
                  <Card key={tribe.name} className={`cursor-pointer transition-all hover:shadow-card ${index === 0 ? 'ring-2 ring-primary shadow-glow' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{tribe.icon}</div>
                          <div>
                            <div className="font-semibold">{tribe.name}</div>
                            <div className="text-sm text-muted-foreground">{tribe.description}</div>
                            <div className="text-sm text-muted-foreground">{tribe.members} members</div>
                          </div>
                        </div>
                        <Badge variant="success">{tribe.match}% match</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              variant="hero" 
              onClick={handleNext}
              disabled={(step === 1 && selectedInterests.length === 0) || 
                       (step === 2 && selectedSkills.length === 0) ||
                       (step === 3 && !location)}
            >
              {step === 4 ? "Join EcoWarriors Seattle" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}