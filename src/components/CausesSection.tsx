import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Target, DollarSign, Users, Briefcase } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createDonationCheckoutSession, fetchCauses, type Cause } from "@/lib/api";

const CausesSection = () => {
  const { data: causes, isLoading, error } = useQuery({ queryKey: ["causes"], queryFn: fetchCauses });
  const [volunteerFor, setVolunteerFor] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [hours, setHours] = useState<number>(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleDonate(cause: Cause) {
    const amount = prompt(`Enter donation amount for ${cause.name} (USD)`, "25");
    if (!amount) return;
    const num = Number(amount);
    if (Number.isNaN(num) || num <= 0) return alert("Invalid amount");
    const session = await createDonationCheckoutSession(cause.id, num);
    window.location.href = session.url;
  }

  async function submitVolunteer() {
    if (!volunteerFor) return;
    await createProBonoOffer({ cause_id: volunteerFor, name, email, skills, hours });
    setVolunteerFor(null);
    setName("");
    setEmail("");
    setSkills("");
    setHours(1);
    toast({ title: "Thanks!", description: "Your pro bono offer was submitted." });
  }
  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Support Meaningful Causes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make a direct impact through donations, pro bono work, or by spreading awareness.
          </p>
        </div>

        {isLoading && <p className="text-center text-muted-foreground">Loading causes…</p>}
        {error && <p className="text-center text-destructive">Failed to load causes</p>}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {(causes || []).map((cause: Cause) => (
            <Card key={cause.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={cause.urgency === "High" ? "destructive" : "secondary"}>
                    {cause.urgency || "Medium"} Priority
                  </Badge>
                  <Badge variant="outline">{cause.category || "General"}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {cause.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {cause.mission}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Funding Progress</span>
                      <span className="text-sm text-muted-foreground">
                        ${cause.funds_raised.toLocaleString()} / ${cause.funding_goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(cause.funds_raised / Math.max(cause.funding_goal, 1)) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{cause.supporters_count} supporters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>{cause.location || "Unknown"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="default" className="w-full" onClick={() => handleDonate(cause)}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => navigate(`/causes/${cause.id}`)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Dialog open={volunteerFor === cause.id} onOpenChange={(o) => setVolunteerFor(o ? cause.id : null)}>
                      <DialogTrigger asChild>
                        <Button variant="hero" className="flex-1" onClick={() => setVolunteerFor(cause.id)}>
                          <Briefcase className="w-4 h-4 mr-2" />
                          Volunteer
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Pro Bono Offer for {cause.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                          <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          <Textarea placeholder="Skills you can offer" value={skills} onChange={(e) => setSkills(e.target.value)} />
                          <Input placeholder="Hours" type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setVolunteerFor(null)}>Cancel</Button>
                            <Button onClick={submitVolunteer}>Submit</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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