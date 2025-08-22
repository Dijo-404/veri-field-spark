import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, Clock, Download, Eye, Tag } from "lucide-react";

interface DatasetCardProps {
  dataset: {
    id: string;
    title: string;
    description: string;
    cid: string;
    sha256: string;
    tags: string[];
    verified: boolean;
    domain: string;
    price: string;
    downloads: number;
    creator: string;
    license: string;
  };
}

const DatasetCard = ({ dataset }: DatasetCardProps) => {
  return (
    <Card className="verifield-card group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {dataset.title}
            </h3>
            <p className="text-sm text-foreground-muted line-clamp-2">
              {dataset.description}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {dataset.verified ? (
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
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">CID:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
              {dataset.cid.slice(0, 12)}...
            </code>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Domain:</span>
            <span className="text-foreground">{dataset.domain}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Downloads:</span>
            <span className="text-foreground">{dataset.downloads.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {dataset.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{dataset.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">{dataset.price}</span>
            <span className="text-sm text-foreground-muted ml-1">ETH</span>
          </div>
          <div className="text-sm text-foreground-muted">
            by {dataset.creator.slice(0, 6)}...{dataset.creator.slice(-4)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button variant="hero" size="sm" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;