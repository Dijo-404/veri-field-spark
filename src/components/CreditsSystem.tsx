import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  Minus
} from "lucide-react";

interface Transaction {
  id: string;
  type: "earn" | "spend";
  amount: number;
  description: string;
  timestamp: Date;
  datasetTitle?: string;
}

interface CreditsSystemProps {
  currentCredits: number;
  onCreditsChange?: (newCredits: number) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "earn",
    amount: 25,
    description: "Dataset purchase",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    datasetTitle: "Climate Data 2024"
  },
  {
    id: "2",
    type: "earn",
    amount: 15,
    description: "Research paper download",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    datasetTitle: "ML in Finance"
  },
  {
    id: "3",
    type: "spend",
    amount: 10,
    description: "Platform fee",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "4",
    type: "earn",
    amount: 40,
    description: "Dataset purchase",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    datasetTitle: "Healthcare Demographics"
  }
];

const CreditsSystem = ({ currentCredits, onCreditsChange }: CreditsSystemProps) => {
  const [credits, setCredits] = useState(currentCredits);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCredits(currentCredits);
  }, [currentCredits]);

  const handleWithdraw = async () => {
    if (credits < 100) {
      toast({
        title: "Insufficient Credits",
        description: "Minimum withdrawal amount is 100 credits.",
        variant: "destructive"
      });
      return;
    }

    setIsWithdrawing(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      const withdrawAmount = Math.floor(credits * 0.8); // 20% platform fee
      const newCredits = credits - withdrawAmount;
      
      setCredits(newCredits);
      onCreditsChange?.(newCredits);
      
      // Add withdrawal transaction
      const withdrawalTransaction: Transaction = {
        id: Date.now().toString(),
        type: "spend",
        amount: withdrawAmount,
        description: "Withdrawal to wallet",
        timestamp: new Date()
      };
      
      setTransactions(prev => [withdrawalTransaction, ...prev]);
      setIsWithdrawing(false);
      
      toast({
        title: "Withdrawal Successful",
        description: `${withdrawAmount} credits transferred to your wallet.`,
        className: "border-success/20 bg-success/10 text-success"
      });
    }, 2000);
  };

  const addCredits = (amount: number, description: string, datasetTitle?: string) => {
    const newCredits = credits + amount;
    setCredits(newCredits);
    onCreditsChange?.(newCredits);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "earn",
      amount,
      description,
      timestamp: new Date(),
      datasetTitle
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Show animated toast
    toast({
      title: "Credits Earned! 🎉",
      description: `+${amount} credits added to your account`,
      className: "border-primary/20 bg-primary/10 text-primary hero-glow"
    });
  };

  const AnimatedCounter = () => (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2 transition-all duration-500">
        {credits.toLocaleString()}
      </div>
      <p className="text-foreground-muted">Available Credits</p>
    </div>
  );

  const thisMonth = transactions.filter(t => {
    const now = new Date();
    const transactionDate = new Date(t.timestamp);
    return transactionDate.getMonth() === now.getMonth() && 
           transactionDate.getFullYear() === now.getFullYear();
  });

  const monthlyEarnings = thisMonth
    .filter(t => t.type === "earn")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Credits Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="verifield-card col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <AnimatedCounter />
                <div className="flex items-center space-x-4 mt-4">
                  <Button 
                    onClick={handleWithdraw}
                    disabled={credits < 100 || isWithdrawing}
                    className="flex items-center"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isWithdrawing ? "Processing..." : "Withdraw"}
                  </Button>
                  
                  {/* Demo buttons for testing */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addCredits(25, "Dataset purchase", "Demo Dataset")}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Demo +25
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <DollarSign className="w-12 h-12 text-primary" />
                </div>
                <p className="text-sm text-foreground-muted">
                  Min. withdrawal: 100 credits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="verifield-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="w-5 h-5 mr-2 text-success" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-2">
                +{monthlyEarnings}
              </div>
              <p className="text-sm text-foreground-muted">Credits Earned</p>
              <Badge variant="outline" className="mt-2 text-success border-success/20">
                +23% from last month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="verifield-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === "earn" 
                      ? "bg-success/10 text-success" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {transaction.type === "earn" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.description}
                    </p>
                    {transaction.datasetTitle && (
                      <p className="text-sm text-foreground-muted">
                        {transaction.datasetTitle}
                      </p>
                    )}
                    <p className="text-xs text-foreground-muted">
                      {transaction.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className={`text-right font-semibold ${
                  transaction.type === "earn" ? "text-success" : "text-destructive"
                }`}>
                  {transaction.type === "earn" ? "+" : "-"}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsSystem;