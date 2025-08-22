import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, Database, Upload, User, Home } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">VeriField</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/marketplace" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/marketplace') ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Marketplace</span>
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/upload') ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/dashboard') ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="hero" size="sm">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground-muted hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/marketplace" 
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground-muted hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Database className="w-4 h-4" />
              <span>Marketplace</span>
            </Link>
            <Link 
              to="/upload" 
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground-muted hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground-muted hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <div className="px-3 py-2">
              <Button variant="hero" size="sm" className="w-full">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;