import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-skincare.jpg';
import skinPortrait from '@/assets/skin-portrait.jpg';

const HomeScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Zyrel</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Decorative element */}
          <div className="relative mx-auto w-64 h-64 mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
            <div className="absolute inset-4 rounded-full overflow-hidden shadow-elevated">
              <img 
                src={skinPortrait} 
                alt="Healthy glowing skin" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating orbs */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full gradient-coral opacity-80 animate-float" />
            <div className="absolute -bottom-2 -left-6 w-12 h-12 rounded-full gradient-primary opacity-60 animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Your Skin,{' '}
              <span className="text-gradient">Understood</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover your unique skin profile with AI-powered analysis and get a personalized skincare routine tailored just for you.
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => setCurrentScreen('upload')}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Personalized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Expert-Backed</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom decorative image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Skincare products" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
};

export default HomeScreen;
