import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, Trophy } from "lucide-react";

const tribes = [
  {
    id: 1,
    name: "EcoWarriors Seattle",
    description: "Fighting climate change through local action and community engagement",
    members: 234,
    location: "Seattle, WA",
    category: "Environment",
    icon: "🌱",
    nextEvent: "Tree Planting Drive",
    eventDate: "March 15",
    achievements: ["Carbon Neutral", "1000+ Trees Planted"],
    isJoined: true
  },
  {
    id: 2,
    name: "Tech for Good",
    description: "Using technology to solve social problems and bridge digital divides",
    members: 187,
    location: "San Francisco, CA",
    category: "Technology",
    icon: "💻",
    nextEvent: "Code for Community",
    eventDate: "March 18",
    achievements: ["5 Apps Built", "500+ Hours Donated"],
    isJoined: false
  },
  {
    id: 3,
    name: "Community Builders",
    description: "Strengthening neighborhood connections and local business support",
    members: 156,
    location: "Portland, OR",
    category: "Community",
    icon: "🏘️",
    nextEvent: "Local Business Fair",
    eventDate: "March 20",
    achievements: ["50+ Events", "Community Champion"],
    isJoined: false
  },
  {
    id: 4,
    name: "Youth Mentors",
    description: "Empowering the next generation through education and guidance",
    members: 203,
    location: "Austin, TX",
    category: "Education",
    icon: "📚",
    nextEvent: "Scholarship Workshop",
    eventDate: "March 22",
    achievements: ["100+ Students", "Education Excellence"],
    isJoined: false
  }
];

export default function TribesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Discover Your Tribe
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join communities of passionate people working together to create meaningful impact in areas you care about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tribes.map((tribe) => (
            <Card key={tribe.id} className="shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{tribe.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{tribe.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tribe.members}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tribe.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={tribe.isJoined ? "success" : "outline"}>
                    {tribe.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{tribe.description}</p>

                {/* Next Event */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="font-medium">{tribe.nextEvent}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{tribe.eventDate}</span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-impact" />
                    <span className="text-sm font-medium">Recent Achievements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tribe.achievements.map((achievement) => (
                      <Badge key={achievement} variant="outline" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant={tribe.isJoined ? "success" : "default"} 
                  className="w-full"
                  disabled={tribe.isJoined}
                >
                  {tribe.isJoined ? "Joined ✓" : "Join Tribe"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Explore All Tribes
          </Button>
        </div>
      </div>
    </section>
  );
}