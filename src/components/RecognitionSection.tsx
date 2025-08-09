import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Crown, Users, Target, Award } from "lucide-react";

const leaderboards = [
  {
    title: "Impact Champions",
    description: "Top contributors across all causes",
    leaders: [
      { name: "Sarah Chen", score: 2847, badge: "Crown", achievement: "Climate Action Leader" },
      { name: "Marcus Johnson", score: 2156, badge: "Trophy", achievement: "Community Builder" },
      { name: "Elena Rodriguez", score: 1923, badge: "Medal", achievement: "Education Advocate" }
    ]
  },
  {
    title: "Rising Stars",
    description: "Newcomers making waves",
    leaders: [
      { name: "Alex Kim", score: 1456, badge: "Star", achievement: "Tech Innovator" },
      { name: "Jordan Smith", score: 1342, badge: "Star", achievement: "Volunteer Coordinator" },
      { name: "Taylor Brown", score: 1189, badge: "Star", achievement: "Fundraising Hero" }
    ]
  }
];

const badges = [
  { name: "First Challenge", icon: Star, earned: true, rarity: "Common" },
  { name: "Team Builder", icon: Users, earned: true, rarity: "Uncommon" },
  { name: "Goal Crusher", icon: Target, earned: false, rarity: "Rare" },
  { name: "Legend", icon: Crown, earned: false, rarity: "Legendary" },
];

const masteryTracks = [
  {
    name: "Community Leadership",
    progress: 75,
    level: "Advanced",
    nextMilestone: "Lead 5 successful events",
    skills: ["Event Planning", "Team Management", "Public Speaking"]
  },
  {
    name: "Environmental Impact",
    progress: 40,
    level: "Intermediate",
    nextMilestone: "Complete carbon footprint analysis",
    skills: ["Sustainability", "Data Analysis", "Project Management"]
  }
];

const RecognitionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-muted/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Recognition & Growth</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your impact, earn recognition, and develop skills that matter.
          </p>
        </div>

        {/* Leaderboards */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {leaderboards.map((board, index) => (
            <Card key={index} className="border-2 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {board.title}
                </CardTitle>
                <p className="text-muted-foreground">{board.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {board.leaders.map((leader, leaderIndex) => (
                    <div key={leaderIndex} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <span className="text-sm font-bold text-primary">
                            {leaderIndex + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{leader.name}</p>
                          <Badge variant="success" className="text-xs">
                            {leader.achievement}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{leader.score}</span>
                        {leader.badge === "Crown" && <Crown className="w-5 h-5 text-yellow-500" />}
                        {leader.badge === "Trophy" && <Trophy className="w-5 h-5 text-yellow-600" />}
                        {leader.badge === "Medal" && <Medal className="w-5 h-5 text-yellow-700" />}
                        {leader.badge === "Star" && <Star className="w-5 h-5 text-blue-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges Section */}
        <Card className="mb-16 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Achievement Badges
            </CardTitle>
            <p className="text-muted-foreground">Unlock badges as you complete challenges and make impact</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                    badge.earned 
                      ? 'border-success bg-success/10 hover:border-success/50' 
                      : 'border-dashed border-muted-foreground/30 bg-muted/20'
                  }`}
                >
                  <badge.icon 
                    className={`w-8 h-8 mx-auto mb-2 ${
                      badge.earned ? 'text-success' : 'text-muted-foreground'
                    }`} 
                  />
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <Badge 
                    variant={badge.earned ? "success" : "secondary"} 
                    className="text-xs"
                  >
                    {badge.rarity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mastery Tracks */}
        <div className="grid gap-8 lg:grid-cols-2">
          {masteryTracks.map((track, index) => (
            <Card key={index} className="border-2 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{track.name}</span>
                  <Badge variant="outline">{track.level}</Badge>
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{track.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-500"
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Next Milestone:</h5>
                    <p className="text-muted-foreground text-sm">{track.nextMilestone}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Skills:</h5>
                    <div className="flex flex-wrap gap-1">
                      {track.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
            View My Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;