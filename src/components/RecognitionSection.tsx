import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Crown, Medal, Target } from "lucide-react";

const leaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    tribe: "EcoWarriors Seattle",
    points: 2847,
    level: "Impact Champion",
    achievements: ["Tree Planter", "Community Leader", "Fundraising Star"],
    avatar: "👩‍💼"
  },
  {
    rank: 2,
    name: "Marcus Johnson",
    tribe: "Tech for Good",
    points: 2654,
    level: "Code Crusader",
    achievements: ["Bug Hunter", "Mentor", "Problem Solver"],
    avatar: "👨‍💻"
  },
  {
    rank: 3,
    name: "Elena Rodriguez",
    tribe: "Community Builders",
    points: 2498,
    level: "Neighborhood Hero",
    achievements: ["Event Master", "Connection Catalyst", "Local Legend"],
    avatar: "👩‍🎨"
  }
];

const userStats = {
  currentLevel: "Rising Star",
  points: 1247,
  nextLevelPoints: 1500,
  achievements: 12,
  rank: 47,
  weeklyGoal: 150,
  weeklyProgress: 89
};

const masteryTracks = [
  {
    title: "Community Leadership",
    progress: 75,
    currentStep: "Lead 3 Events",
    nextStep: "Mentor New Members",
    icon: Crown,
    color: "primary"
  },
  {
    title: "Environmental Impact",
    progress: 60,
    currentStep: "Plant 50 Trees",
    nextStep: "Organize Cleanup",
    icon: Zap,
    color: "accent"
  },
  {
    title: "Fundraising Mastery",
    progress: 40,
    currentStep: "Raise $1000",
    nextStep: "Launch Campaign",
    icon: Target,
    color: "secondary"
  }
];

export default function RecognitionSection() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-orange-500" />;
      default: return <Trophy className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Recognition & Mastery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your impact, unlock achievements, and climb the leaderboards as you build skills and create change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Progress Card */}
          <Card className="shadow-glow bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-primary" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level Progress */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{userStats.currentLevel}</div>
                <div className="text-sm text-muted-foreground">Level 4 • Rank #{userStats.rank}</div>
              </div>

              {/* Points Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Points to Next Level</span>
                  <span>{userStats.points}/{userStats.nextLevelPoints}</span>
                </div>
                <Progress 
                  value={(userStats.points / userStats.nextLevelPoints) * 100} 
                  className="h-2"
                />
              </div>

              {/* Weekly Goal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span>{userStats.weeklyProgress}/{userStats.weeklyGoal} pts</span>
                </div>
                <Progress 
                  value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} 
                  className="h-2"
                />
              </div>

              <div className="text-center">
                <Badge variant="success" className="text-sm px-4 py-2">
                  {userStats.achievements} Achievements Unlocked
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-impact" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(user.rank)}
                    <span className="text-2xl">{user.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.tribe}</div>
                    <div className="text-sm text-primary font-medium">{user.points} points</div>
                  </div>
                  <Badge variant="outline">{user.level}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </CardContent>
          </Card>

          {/* Mastery Tracks */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-secondary" />
                <span>Mastery Tracks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {masteryTracks.map((track) => (
                <div key={track.title} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <track.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{track.title}</span>
                  </div>
                  
                  <Progress value={track.progress} className="h-2" />
                  
                  <div className="text-xs space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">Current: {track.currentStep}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 border border-muted-foreground rounded-full"></div>
                      <span className="text-muted-foreground">Next: {track.nextStep}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="hero" className="w-full">
                View All Tracks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}