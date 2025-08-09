import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Target, Users, DollarSign } from "lucide-react";

const causes = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Providing access to clean drinking water for underserved rural areas through sustainable infrastructure projects.",
    category: "Water & Sanitation",
    goal: 50000,
    raised: 34500,
    backers: 287,
    daysLeft: 23,
    image: "🚰",
    urgency: "high",
    impact: "500+ families will have clean water access"
  },
  {
    id: 2,
    title: "Youth Coding Bootcamp",
    description: "Free coding education for underrepresented youth to build careers in technology and close the digital divide.",
    category: "Education",
    goal: 25000,
    raised: 18750,
    backers: 156,
    daysLeft: 31,
    image: "💻",
    urgency: "medium",
    impact: "50 students trained per cohort"
  },
  {
    id: 3,
    title: "Urban Forest Restoration",
    description: "Planting native trees and creating green spaces to combat urban heat islands and improve air quality.",
    category: "Environment",
    goal: 15000,
    raised: 12300,
    backers: 203,
    daysLeft: 45,
    image: "🌳",
    urgency: "medium",
    impact: "1000 trees planted across 5 neighborhoods"
  },
  {
    id: 4,
    title: "Mental Health Support Network",
    description: "Building peer support groups and providing mental health resources for young adults facing challenges.",
    category: "Health",
    goal: 35000,
    raised: 8750,
    backers: 89,
    daysLeft: 67,
    image: "🧠",
    urgency: "low",
    impact: "24/7 support for 200+ individuals"
  }
];

export default function CausesSection() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'impact';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Support Meaningful Causes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make a direct impact by supporting causes that align with your values. Every contribution creates measurable change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {causes.map((cause) => (
            <Card key={cause.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{cause.image}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{cause.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{cause.category}</Badge>
                        <Badge variant={getUrgencyColor(cause.urgency) as any}>
                          {cause.urgency} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{cause.description}</p>

                {/* Impact Statement */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Expected Impact:</span>
                  </div>
                  <p className="text-sm text-accent/80 mt-1">{cause.impact}</p>
                </div>

                {/* Funding Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Funding Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {getProgressPercentage(cause.raised, cause.goal).toFixed(0)}% funded
                    </span>
                  </div>
                  
                  <Progress 
                    value={getProgressPercentage(cause.raised, cause.goal)} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{formatCurrency(cause.raised)}</span>
                    <span className="text-muted-foreground">of {formatCurrency(cause.goal)}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-3">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{cause.backers} backers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{cause.daysLeft} days left</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="success" className="flex-1">
                    <Heart className="w-4 h-4" />
                    Donate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            <DollarSign className="w-5 h-5" />
            Explore All Causes
          </Button>
        </div>
      </div>
    </section>
  );
}