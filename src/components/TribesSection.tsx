import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchTribes, type Tribe } from "@/lib/api";

const TribesSection = () => {
  const { data: tribes, isLoading, error } = useQuery({ queryKey: ["tribes"], queryFn: fetchTribes });
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Discover Active Tribes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join communities of passionate changemakers working on causes that matter to you.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border p-6 space-y-4">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-6 w-2/3 bg-muted rounded" />
                <div className="h-16 w-full bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-9 w-full bg-muted rounded" />
                  <div className="h-9 w-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-center text-destructive">Failed to load tribes</p>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(tribes || []).map((tribe: Tribe) => (
            <Card key={tribe.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">Tribe</Badge>
                  <span className="text-xs text-muted-foreground">{tribe.location || "Unknown"}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tribe.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {tribe.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Members TBD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-success" />
                    <span>Challenges TBD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{tribe.location || "Unknown"}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button aria-label={`Join ${tribe.name}`}
                    variant="default" 
                    className="flex-1"
                    onClick={() => toast({ title: "Joined", description: `You joined ${tribe.name}` })}
                  >
                    Join Tribe
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigate("/tribes") }>
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