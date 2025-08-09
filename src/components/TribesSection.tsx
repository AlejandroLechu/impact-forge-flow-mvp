import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Calendar, MapPin } from "lucide-react";

const tribes = [
  {
    id: 1,
    name: "Climate Action Coalition",
    description: "Fighting climate change through local action and global awareness campaigns.",
    members: 1847,
    activeChallenges: 5,
    location: "Global",
    category: "Environment",
    status: "Active",
    recentActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Tech for Good",
    description: "Building technology solutions that address social and environmental challenges.",
    members: 923,
    activeChallenges: 8,
    location: "San Francisco",
    category: "Technology",
    status: "Growing",
    recentActivity: "1 hour ago"
  },
  {
    id: 3,
    name: "Education Equity Network",
    description: "Ensuring quality education access for underserved communities worldwide.",
    members: 1456,
    activeChallenges: 3,
    location: "Multiple Cities",
    category: "Education",
    status: "Active",
    recentActivity: "30 minutes ago"
  }
];

const TribesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Discover Active Tribes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join communities of passionate changemakers working on causes that matter to you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tribes.map((tribe) => (
            <Card key={tribe.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={tribe.status === "Growing" ? "success" : "outline"}>
                    {tribe.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{tribe.recentActivity}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tribe.name}
                </CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {tribe.category}
                </Badge>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {tribe.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{tribe.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-success" />
                    <span>{tribe.activeChallenges} active challenges</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{tribe.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1"
                  >
                    Join Tribe
                  </Button>
                  <Button variant="outline" size="icon">
                    <Calendar className="w-4 h-4" />
                  </Button>
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
            Explore All Tribes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TribesSection;