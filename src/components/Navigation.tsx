import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Heart, 
  Calendar, 
  Trophy, 
  User, 
  Bell, 
  Search,
  Menu
} from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
          <Users className="w-5 h-5" />
          <span className="text-xs">Tribes</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Causes</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Events</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
          <Trophy className="w-5 h-5" />
          <span className="text-xs">Recognition</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;