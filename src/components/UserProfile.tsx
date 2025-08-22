import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Edit3, 
  Database, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Star, 
  Download,
  DollarSign,
  CheckCircle,
  Clock,
  Github
} from "lucide-react";

interface UserData {
  name: string;
  bio: string;
  avatar: string;
  totalDatasets: number;
  totalPapers: number;
  totalBuyers: number;
  totalCredits: number;
  joinDate: string;
}

interface RepositoryItem {
  id: string;
  type: "dataset" | "paper";
  title: string;
  description: string;
  tags: string[];
  lastUpdate: string;
  status: "verified" | "pending";
  downloads: number;
  revenue: number;
  rating: number;
}

const mockUser: UserData = {
  name: "Dr. Sarah Chen",
  bio: "Data scientist specializing in climate research and machine learning applications for environmental analysis.",
  avatar: "/placeholder.svg",
  totalDatasets: 12,
  totalPapers: 8,
  totalBuyers: 156,
  totalCredits: 2847,
  joinDate: "2023-06-15"
};

const mockRepositories: RepositoryItem[] = [
  {
    id: "1",
    type: "dataset",
    title: "Global Climate Patterns 2024",
    description: "Comprehensive dataset of global temperature and precipitation patterns",
    tags: ["climate", "temperature", "precipitation"],
    lastUpdate: "2024-01-15",
    status: "verified",
    downloads: 1543,
    revenue: 890,
    rating: 4.8
  },
  {
    id: "2",
    type: "paper",
    title: "ML Applications in Climate Modeling",
    description: "Research paper on machine learning techniques for climate prediction",
    tags: ["ml", "climate", "modeling"],
    lastUpdate: "2024-01-10",
    status: "verified",
    downloads: 892,
    revenue: 445,
    rating: 4.6
  },
  {
    id: "3",
    type: "dataset",
    title: "Ocean Temperature Sensors",
    description: "Real-time ocean temperature data from global sensor network",
    tags: ["ocean", "sensors", "temperature"],
    lastUpdate: "2024-01-08",
    status: "pending",
    downloads: 234,
    revenue: 67,
    rating: 4.2
  }
];

const UserProfile = () => {
  const [sortBy, setSortBy] = useState<"popularity" | "date" | "revenue">("popularity");
  const [isEditing, setIsEditing] = useState(false);

  const sortedRepositories = [...mockRepositories].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.downloads - a.downloads;
      case "date":
        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
      case "revenue":
        return b.revenue - a.revenue;
      default:
        return 0;
    }
  });

  const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => (
    <span className="font-bold text-2xl text-primary">
      {value.toLocaleString()}{suffix}
    </span>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="verifield-card">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">{mockUser.name}</h1>
                  <p className="text-foreground-muted flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(mockUser.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <p className="text-foreground-muted mb-4 max-w-2xl">{mockUser.bio}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background-secondary rounded-xl">
                  <Database className="w-6 h-6 text-primary mx-auto mb-2" />
                  <AnimatedCounter value={mockUser.totalDatasets} />
                  <p className="text-sm text-foreground-muted">Datasets</p>
                </div>
                
                <div className="text-center p-4 bg-background-secondary rounded-xl">
                  <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                  <AnimatedCounter value={mockUser.totalPapers} />
                  <p className="text-sm text-foreground-muted">Papers</p>
                </div>
                
                <div className="text-center p-4 bg-background-secondary rounded-xl">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <AnimatedCounter value={mockUser.totalBuyers} />
                  <p className="text-sm text-foreground-muted">Buyers</p>
                </div>
                
                <div className="text-center p-4 bg-background-secondary rounded-xl">
                  <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                  <AnimatedCounter value={mockUser.totalCredits} />
                  <p className="text-sm text-foreground-muted">Credits</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository List */}
      <Card className="verifield-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Github className="w-5 h-5 mr-2 text-primary" />
              Repositories ({mockRepositories.length})
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground-muted">Sort by:</span>
              <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)} className="w-auto">
                <TabsList className="h-auto p-1">
                  <TabsTrigger value="popularity" className="text-xs px-2 py-1">Popular</TabsTrigger>
                  <TabsTrigger value="date" className="text-xs px-2 py-1">Recent</TabsTrigger>
                  <TabsTrigger value="revenue" className="text-xs px-2 py-1">Revenue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {sortedRepositories.map((repo) => (
            <div key={repo.id} className="border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {repo.type === "dataset" ? (
                      <Database className="w-5 h-5 text-primary" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-primary" />
                    )}
                    <h3 className="text-lg font-semibold text-foreground">{repo.title}</h3>
                    {repo.status === 'verified' ? (
                      <Badge variant="outline" className="status-verified">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="status-pending">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-foreground-muted mb-3">{repo.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-foreground-muted">
                    <span>Updated {new Date(repo.lastUpdate).toLocaleDateString()}</span>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {repo.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {repo.revenue} credits
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                      {repo.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;