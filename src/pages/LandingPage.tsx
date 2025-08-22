import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Database, Shield, TrendingUp, Users, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroNetwork from "@/assets/hero-network.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Data",
      description: "All datasets are cryptographically verified and secured on IPFS with immutable proof of authenticity."
    },
    {
      icon: Database,
      title: "Decentralized Storage",
      description: "Your data is stored on IPFS, ensuring permanent availability and resistance to censorship."
    },
    {
      icon: TrendingUp,
      title: "Smart Royalties",
      description: "Earn ongoing revenue from your datasets with automatic royalty distribution via smart contracts."
    },
    {
      icon: Users,
      title: "Global Marketplace",
      description: "Access datasets from researchers, companies, and data scientists worldwide in one unified platform."
    }
  ];

  const stats = [
    { label: "Datasets", value: "10,000+" },
    { label: "Verified Creators", value: "2,500+" },
    { label: "Total Downloads", value: "150M+" },
    { label: "Revenue Distributed", value: "$5.2M+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 network-mesh opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroNetwork})` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Verify, Own, and Trade
              <span className="block gradient-text">Datasets with Trust</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground-muted mb-8 max-w-3xl mx-auto">
              The premier Web3 marketplace for decentralized data verification and trading. 
              Powered by blockchain technology and IPFS storage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/upload">
                  <Database className="w-5 h-5 mr-2" />
                  Upload Your Dataset
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/marketplace">
                  Explore Marketplace
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose VeriField?
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Built for the future of data ownership and verification in the Web3 ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="verifield-card text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-muted">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Simple, secure, and transparent data trading in just a few steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload & Verify",
                description: "Upload your dataset, generate cryptographic hashes, and mint an NFT certificate of authenticity."
              },
              {
                step: "02", 
                title: "List & Price",
                description: "Set your price, add metadata, and list your verified dataset on the global marketplace."
              },
              {
                step: "03",
                title: "Earn & Trade",
                description: "Receive payments in crypto and earn ongoing royalties from your dataset's usage and trading."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-foreground-muted text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-foreground-muted mb-8">
            Join thousands of data creators and researchers already using VeriField.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/upload">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/marketplace">
                Browse Datasets
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;