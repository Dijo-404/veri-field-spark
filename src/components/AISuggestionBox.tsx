import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Database, 
  Heart,
  X
} from "lucide-react";

interface Suggestion {
  id: string;
  type: "dataset" | "paper";
  title: string;
  description: string;
  tags: string[];
  relevanceScore: number;
  previewUrl?: string;
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "dataset",
    title: "Climate Change Indicators 2024",
    description: "Real-time environmental data from global sensors",
    tags: ["climate", "environment", "sensors"],
    relevanceScore: 95
  },
  {
    id: "2",
    type: "paper",
    title: "Machine Learning in Financial Markets",
    description: "Comprehensive analysis of ML applications in trading",
    tags: ["ml", "finance", "trading"],
    relevanceScore: 89
  },
  {
    id: "3",
    type: "dataset",
    title: "Healthcare Demographics Analysis",
    description: "Anonymized patient data for research purposes",
    tags: ["healthcare", "demographics", "research"],
    relevanceScore: 82
  }
];

interface AISuggestionBoxProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AISuggestionBox = ({ isOpen, onToggle }: AISuggestionBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedSuggestions, setSavedSuggestions] = useState<string[]>([]);

  const currentSuggestion = mockSuggestions[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockSuggestions.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mockSuggestions.length) % mockSuggestions.length);
  };

  const handleSave = (id: string) => {
    setSavedSuggestions(prev => [...prev, id]);
  };

  const handleDismiss = () => {
    handleNext();
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hero-glow"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 w-80 z-50">
      <Card className="verifield-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              AI Suggestions
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-foreground-muted">
            <span>Based on your interests</span>
            <span>{currentIndex + 1} of {mockSuggestions.length}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {currentSuggestion.type === "dataset" ? (
                <Database className="w-4 h-4 text-primary" />
              ) : (
                <BookOpen className="w-4 h-4 text-primary" />
              )}
              <Badge variant="outline" className="text-xs">
                {currentSuggestion.type}
              </Badge>
              <Badge variant="outline" className="text-xs text-success">
                {currentSuggestion.relevanceScore}% match
              </Badge>
            </div>

            <h4 className="font-semibold text-foreground">
              {currentSuggestion.title}
            </h4>

            <p className="text-sm text-foreground-muted">
              {currentSuggestion.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {currentSuggestion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="w-8 h-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="w-8 h-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave(currentSuggestion.id)}
                disabled={savedSuggestions.includes(currentSuggestion.id)}
              >
                <Heart className={`w-4 h-4 mr-1 ${
                  savedSuggestions.includes(currentSuggestion.id) 
                    ? 'fill-current text-primary' 
                    : ''
                }`} />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISuggestionBox;