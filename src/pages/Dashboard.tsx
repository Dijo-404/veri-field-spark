import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Database, 
  Wallet, 
  Clock, 
  CheckCircle,
  DollarSign,
  Eye,
  Download
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const userStats = {
    totalDatasets: 12,
    totalEarnings: "24.5",
    totalDownloads: 45320,
    pendingVerifications: 3
  };

  const myDatasets = [
    {
      id: "1",
      title: "Global Climate Data 2024",
      status: "verified",
      earnings: "12.3",
      downloads: 15420,
      uploaded: "2024-01-15"
    },
    {
      id: "2",
      title: "Financial Market Analysis",
      status: "pending",
      earnings: "0.0",
      downloads: 0,
      uploaded: "2024-01-20"
    },
    {
      id: "3",
      title: "Healthcare Demographics",
      status: "verified",
      earnings: "8.7",
      downloads: 8965,
      uploaded: "2024-01-10"
    }
  ];

  const recentActivity = [
    { action: "Purchase", dataset: "Climate Data 2024", amount: "0.5 ETH", time: "2 hours ago" },
    { action: "Upload", dataset: "Market Analysis", amount: "", time: "1 day ago" },
    { action: "Purchase", dataset: "Healthcare Demographics", amount: "0.3 ETH", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Creator Dashboard</h1>
          <p className="text-foreground-muted">Manage your datasets, track earnings, and monitor performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="verifield-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-muted text-sm">Total Datasets</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.totalDatasets}</p>
                </div>
                <Database className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="verifield-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-muted text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.totalEarnings} ETH</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="verifield-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-muted text-sm">Total Downloads</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.totalDownloads.toLocaleString()}</p>
                </div>
                <Download className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="verifield-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-muted text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.pendingVerifications}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="datasets">My Datasets</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="datasets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Your Datasets</h2>
              <Button variant="hero">
                <Database className="w-4 h-4 mr-2" />
                Upload New Dataset
              </Button>
            </div>

            <div className="grid gap-4">
              {myDatasets.map((dataset) => (
                <Card key={dataset.id} className="verifield-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{dataset.title}</h3>
                          {dataset.status === 'verified' ? (
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
                        <p className="text-foreground-muted text-sm">Uploaded on {dataset.uploaded}</p>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="text-foreground-muted">Earnings</p>
                          <p className="font-semibold text-primary">{dataset.earnings} ETH</p>
                        </div>
                        <div className="text-center">
                          <p className="text-foreground-muted">Downloads</p>
                          <p className="font-semibold text-foreground">{dataset.downloads.toLocaleString()}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Earnings Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-background-secondary rounded-xl">
                      <p className="text-foreground-muted text-sm mb-2">This Month</p>
                      <p className="text-3xl font-bold text-primary">5.2 ETH</p>
                      <p className="text-xs text-success">+23% from last month</p>
                    </div>
                    <div className="text-center p-6 bg-background-secondary rounded-xl">
                      <p className="text-foreground-muted text-sm mb-2">Last Month</p>
                      <p className="text-3xl font-bold text-foreground">4.1 ETH</p>
                    </div>
                    <div className="text-center p-6 bg-background-secondary rounded-xl">
                      <p className="text-foreground-muted text-sm mb-2">All Time</p>
                      <p className="text-3xl font-bold text-foreground">24.5 ETH</p>
                    </div>
                  </div>

                  <div className="h-64 bg-muted/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-foreground-muted mx-auto mb-2" />
                      <p className="text-foreground-muted">Earnings chart would go here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          {activity.action === 'Purchase' ? (
                            <Download className="w-4 h-4 text-primary" />
                          ) : (
                            <Database className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{activity.action}: {activity.dataset}</p>
                          <p className="text-sm text-foreground-muted">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount && (
                        <Badge variant="outline" className="text-primary border-primary/20">
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;