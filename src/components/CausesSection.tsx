import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Target, DollarSign, Users, Briefcase } from "lucide-react";

const causes = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Providing sustainable water solutions to underserved rural areas through innovative filtration systems.",
    raised: 75000,
    goal: 100000,
    supporters: 342,
    category: "Water & Sanitation",
    urgency: "High",
    location: "East Africa",
    proBonoNeeded: ["Engineering", "Project Management", "Marketing"]
  },
  {
    id: 2,
    title: "Digital Literacy Program",
    description: "Teaching essential digital skills to seniors and underserved communities to bridge the digital divide.",
    raised: 45000,
    goal: 80000,
    supporters: 189,
    category: "Education",
    urgency: "Medium",
    location: "Multiple Cities",
    proBonoNeeded: ["Teaching", "Curriculum Design", "Technical Support"]
  },
  {
    id: 3,
    title: "Urban Forest Initiative",
    description: "Planting native trees in urban areas to combat air pollution and create green community spaces.",
    raised: 32000,
    goal: 60000,
    supporters: 267,
    category: "Environment",
    urgency: "High",
    location: "Los Angeles",
    proBonoNeeded: ["Environmental Science", "Community Outreach", "Data Analysis"]
  }
];

const CausesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Support Meaningful Causes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make a direct impact through donations, pro bono work, or by spreading awareness.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {causes.map((cause) => (
            <Card key={cause.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={cause.urgency === "High" ? "destructive" : "secondary"}>
                    {cause.urgency} Priority
                  </Badge>
                  <Badge variant="outline">{cause.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {cause.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {cause.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Funding Progress</span>
                      <span className="text-sm text-muted-foreground">
                        ${cause.raised.toLocaleString()} / ${cause.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(cause.raised / cause.goal) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{cause.supporters} supporters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>{cause.location}</span>
                    </div>
                  </div>

                  {cause.proBonoNeeded.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Briefcase className="w-4 h-4 text-success" />
                        <span>Pro Bono Skills Needed:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cause.proBonoNeeded.map((skill) => (
                          <Badge key={skill} variant="success" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="default" className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Button 
                      variant="hero"
                      className="flex-1"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Volunteer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            Discover More Causes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CausesSection;