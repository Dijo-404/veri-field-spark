import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DatasetCard from "@/components/DatasetCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Mock data
  const mockDatasets = [
    {
      id: "1",
      title: "Global Climate Data 2024",
      description: "Comprehensive climate measurements from weather stations worldwide, including temperature, humidity, and atmospheric pressure data.",
      cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      sha256: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      tags: ["climate", "weather", "temperature", "research"],
      verified: true,
      domain: "Environmental Science",
      price: "0.5",
      downloads: 15420,
      creator: "0x742d35Cc6334C4532BB4a01C0F33CB13b6E32f4c",
      license: "CC BY 4.0"
    },
    {
      id: "2", 
      title: "E-commerce User Behavior Dataset",
      description: "Anonymized user interaction data from multiple e-commerce platforms, including click patterns, purchase history, and session analytics.",
      cid: "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
      sha256: "b3a8e0e1f9ab2c3d4e5f6789012345678901234567890123456789abcdef12",
      tags: ["ecommerce", "analytics", "user-behavior", "marketing"],
      verified: false,
      domain: "Business Analytics",
      price: "1.2",
      downloads: 8765,
      creator: "0x8ba1f109551bD432803012645Hac136c38C",
      license: "Custom"
    },
    {
      id: "3",
      title: "Medical Imaging Dataset - X-Ray Scans", 
      description: "De-identified chest X-ray images with corresponding diagnostic labels for machine learning research in medical imaging.",
      cid: "QmPK1s3pNYLi1EPDQhZhXP5L9L1L2L3L4L5L6L7L8L9L0",
      sha256: "c4ca4238a0b923820dcc509a6f75849b0d4e5f7a8f9d0e1f2a3b4c5d6e7f8g9h",
      tags: ["medical", "imaging", "xray", "healthcare", "ml"],
      verified: true,
      domain: "Healthcare",
      price: "2.8",
      downloads: 3210,
      creator: "0x742d35Cc6334C4532BB4a01C0F33CB13b6E32f4c",
      license: "Research Use Only"
    },
    {
      id: "4",
      title: "Financial Market Data - Crypto Prices",
      description: "High-frequency cryptocurrency price data across major exchanges, including order book snapshots and trade history.",
      cid: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
      sha256: "d4ca4238a0b923820dcc509a6f75849b0d4e5f7a8f9d0e1f2a3b4c5d6e7f8g9i",
      tags: ["finance", "crypto", "trading", "prices", "market-data"],
      verified: true,
      domain: "Finance",
      price: "0.8",
      downloads: 12890,
      creator: "0x9ba1f109551bD432803012645Hac136c38D",
      license: "Commercial"
    }
  ];

  const allTags = ["climate", "weather", "ecommerce", "analytics", "medical", "finance", "crypto", "ml", "healthcare"];
  const domains = ["Environmental Science", "Business Analytics", "Healthcare", "Finance"];

  const filteredDatasets = mockDatasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => dataset.tags.includes(tag));
    
    const matchesVerified = !verifiedOnly || dataset.verified;

    return matchesSearch && matchesTags && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dataset Marketplace</h1>
          <p className="text-foreground-muted">Discover and trade verified datasets from the global Web3 community</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="verifield-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search Datasets
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted w-4 h-4" />
                    <Input
                      placeholder="Search datasets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Verification Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified-only"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
                    />
                    <label htmlFor="verified-only" className="text-sm text-foreground-muted">
                      Verified datasets only
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "secondary"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => {
                          setSelectedTags(prev =>
                            prev.includes(tag)
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Domains */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Domains
                  </label>
                  <div className="space-y-2">
                    {domains.map((domain) => (
                      <div key={domain} className="flex items-center space-x-2">
                        <Checkbox id={domain} />
                        <label htmlFor={domain} className="text-sm text-foreground-muted">
                          {domain}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTags([]);
                    setVerifiedOnly(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-foreground-muted">
                  Showing {filteredDatasets.length} of {mockDatasets.length} datasets
                </p>
              </div>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>

            {/* Dataset Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>

            {/* No Results */}
            {filteredDatasets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No datasets found</h3>
                <p className="text-foreground-muted">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;