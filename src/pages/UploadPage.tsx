import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Hash, 
  Coins, 
  CheckCircle, 
  ArrowRight,
  Info,
  Shield,
  Database
} from "lucide-react";

const UploadPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    { number: 1, title: "Upload Dataset", icon: Upload },
    { number: 2, title: "Generate Hash", icon: Hash },
    { number: 3, title: "Add Metadata", icon: FileText },
    { number: 4, title: "Mint NFT", icon: Coins }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep(2), 500);
        }
      }, 200);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Upload Your Dataset</h1>
          <p className="text-foreground-muted text-lg">
            Transform your data into a verified, tradeable digital asset
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-foreground-muted'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-foreground-muted'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-foreground' : 'text-foreground-muted'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Upload Dataset */}
          {currentStep === 1 && (
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Your Dataset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`upload-zone p-8 text-center ${isDragging ? 'border-primary/50 bg-primary/5' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Database className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Drag and drop your dataset file
                  </h3>
                  <p className="text-foreground-muted mb-4">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".csv,.json,.xlsx,.parquet"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Select File
                    </Button>
                  </label>
                  <p className="text-xs text-foreground-muted mt-4">
                    Supported formats: CSV, JSON, XLSX, Parquet (Max 500MB)
                  </p>
                </div>

                {selectedFile && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {selectedFile.name}
                      </span>
                      <span className="text-sm text-foreground-muted">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="mb-4" />
                    <div className="flex items-center text-sm text-foreground-muted">
                      <Info className="w-4 h-4 mr-2" />
                      Your file will be stored on IPFS for permanent decentralized access
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Generate Hash */}
          {currentStep === 2 && (
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="w-5 h-5 mr-2" />
                  Generate Cryptographic Hash
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">File: {selectedFile?.name}</p>
                      <p className="text-sm text-foreground-muted">Generating SHA-256 hash...</p>
                    </div>
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">
                        SHA-256 Hash
                      </label>
                      <code className="block p-3 bg-muted rounded-lg text-sm font-mono text-foreground">
                        a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
                      </code>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">
                        IPFS CID
                      </label>
                      <code className="block p-3 bg-muted rounded-lg text-sm font-mono text-foreground">
                        QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
                      </code>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-foreground-muted">
                    <CheckCircle className="w-4 h-4 mr-2 text-success" />
                    Hash generated successfully. Your dataset is now verifiable.
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="w-full"
                    variant="hero"
                  >
                    Continue to Metadata
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Add Metadata */}
          {currentStep === 3 && (
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Dataset Metadata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Dataset Title *
                    </label>
                    <Input placeholder="Enter a descriptive title for your dataset" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Description *
                    </label>
                    <Textarea 
                      placeholder="Describe your dataset, its contents, collection methodology, and potential use cases"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Domain/Category
                      </label>
                      <Input placeholder="e.g., Healthcare, Finance, Climate" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        License
                      </label>
                      <Input placeholder="e.g., CC BY 4.0, Custom, Research Only" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Tags
                    </label>
                    <Input placeholder="Enter tags separated by commas (e.g., healthcare, ml, research)" />
                    <p className="text-xs text-foreground-muted mt-1">
                      Tags help others discover your dataset
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Price (ETH) *
                    </label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                    <p className="text-xs text-foreground-muted mt-1">
                      Set to 0 for free datasets
                    </p>
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(4)}
                    className="w-full"
                    variant="hero"
                  >
                    Continue to Mint NFT
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Mint NFT */}
          {currentStep === 4 && (
            <Card className="verifield-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  Mint Dataset NFT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-background-secondary rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">File:</span>
                        <span className="text-foreground">{selectedFile?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Size:</span>
                        <span className="text-foreground">
                          {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : '0'} MB
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Hash:</span>
                        <code className="text-xs text-foreground">a665a45...7a27ae3</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Estimated Gas:</span>
                        <span className="text-foreground">~0.003 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-foreground-muted">
                      <Info className="w-4 h-4 mr-2" />
                      You'll receive an NFT certificate that proves ownership and authenticity
                    </div>
                    
                    <div className="flex items-center text-sm text-foreground-muted">
                      <Shield className="w-4 h-4 mr-2" />
                      Your dataset will be permanently stored on IPFS
                    </div>
                  </div>

                  <Button className="w-full" variant="hero" size="lg">
                    <Coins className="w-5 h-5 mr-2" />
                    Mint NFT & List Dataset
                  </Button>

                  <p className="text-xs text-center text-foreground-muted">
                    By minting, you agree to our Terms of Service and confirm you have the right to distribute this data
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;