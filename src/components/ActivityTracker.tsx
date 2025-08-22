import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Upload, Users } from "lucide-react";

interface ActivityData {
  date: string;
  active: boolean;
  uploads: number;
  buyers: number;
}

// Generate mock activity data for the last 30 days
const generateActivityData = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const active = Math.random() > 0.3; // 70% chance of being active
    data.push({
      date: date.toISOString().split('T')[0],
      active,
      uploads: active ? Math.floor(Math.random() * 3) : 0,
      buyers: active ? Math.floor(Math.random() * 5) : 0
    });
  }
  
  return data;
};

const ActivityTracker = () => {
  const activityData = generateActivityData();
  const activeDays = activityData.filter(day => day.active).length;
  const totalUploads = activityData.reduce((sum, day) => sum + day.uploads, 0);
  const totalBuyers = activityData.reduce((sum, day) => sum + day.buyers, 0);
  
  // Calculate current streak
  let currentStreak = 0;
  for (let i = activityData.length - 1; i >= 0; i--) {
    if (activityData[i].active) {
      currentStreak++;
    } else {
      break;
    }
  }

  const getIntensityClass = (day: ActivityData) => {
    if (!day.active) return "bg-muted";
    const intensity = day.uploads + day.buyers;
    if (intensity >= 4) return "bg-primary";
    if (intensity >= 2) return "bg-primary/70";
    return "bg-primary/40";
  };

  return (
    <Card className="verifield-card">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Activity Tracker
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-background-secondary rounded-xl">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-primary mr-1" />
              <span className="text-sm text-foreground-muted">Streak</span>
            </div>
            <p className="text-xl font-bold text-primary">{currentStreak}</p>
            <p className="text-xs text-foreground-muted">days</p>
          </div>
          
          <div className="text-center p-3 bg-background-secondary rounded-xl">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-success mr-1" />
              <span className="text-sm text-foreground-muted">Active</span>
            </div>
            <p className="text-xl font-bold text-success">{activeDays}</p>
            <p className="text-xs text-foreground-muted">of 30 days</p>
          </div>
        </div>

        {/* Activity Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Last 30 days</span>
            <div className="flex items-center space-x-1 text-xs text-foreground-muted">
              <div className="w-2 h-2 bg-muted rounded-sm"></div>
              <span>Less</span>
              <div className="w-2 h-2 bg-primary/40 rounded-sm"></div>
              <div className="w-2 h-2 bg-primary/70 rounded-sm"></div>
              <div className="w-2 h-2 bg-primary rounded-sm"></div>
              <span>More</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {activityData.map((day, index) => (
              <div
                key={day.date}
                className={`w-4 h-4 rounded-sm ${getIntensityClass(day)} transition-colors cursor-pointer`}
                title={`${day.date}: ${day.active ? `${day.uploads} uploads, ${day.buyers} buyers` : 'No activity'}`}
              />
            ))}
          </div>
        </div>

        {/* Monthly Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{totalUploads}</p>
              <p className="text-xs text-foreground-muted">Total uploads</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{totalBuyers}</p>
              <p className="text-xs text-foreground-muted">Total buyers</p>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        {currentStreak >= 7 && (
          <div className="flex justify-center pt-2">
            <Badge variant="outline" className="status-verified">
              🔥 {currentStreak} Day Streak!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;