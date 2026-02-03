import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Sun, Moon, Clock, ChevronRight, Bookmark, Calendar } from 'lucide-react';
import { RoutineStep } from '@/types/skincare';
import heroImage from '@/assets/hero-skincare.jpg';

const RecommendationsScreen: React.FC = () => {
  const { setCurrentScreen, routine, diagnosis, resetApp } = useApp();
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  if (!routine || !diagnosis) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No routine available</p>
          <Button onClick={resetApp}>Start Over</Button>
        </div>
      </div>
    );
  }

  const currentRoutine = activeTab === 'morning' ? routine.morning : routine.evening;

  const toggleStep = (order: number) => {
    setExpandedStep(expandedStep === order ? null : order);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <button 
          onClick={() => setCurrentScreen('diagnosis')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('progress')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth"
        >
          <Calendar className="w-5 h-5" />
          <span>Track</span>
        </button>
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header Card */}
          <div className="bg-card rounded-3xl overflow-hidden shadow-card animate-fade-in">
            <div className="h-32 relative">
              <img 
                src={heroImage} 
                alt="Skincare products" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-5 -mt-8 relative">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Your Personalized Routine
              </h1>
              <p className="text-muted-foreground">
                Based on your <span className="text-foreground font-medium capitalize">{diagnosis.skinType}</span> skin 
                and {diagnosis.concerns.length} identified {diagnosis.concerns.length === 1 ? 'concern' : 'concerns'}.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="bg-card rounded-2xl p-1.5 shadow-card flex">
            <button
              onClick={() => setActiveTab('morning')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                font-medium transition-all duration-300
                ${activeTab === 'morning' 
                  ? 'gradient-primary text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Sun className="w-5 h-5" />
              Morning
            </button>
            <button
              onClick={() => setActiveTab('evening')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                font-medium transition-all duration-300
                ${activeTab === 'evening' 
                  ? 'gradient-coral text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Moon className="w-5 h-5" />
              Evening
            </button>
          </div>

          {/* Routine Steps */}
          <div className="space-y-3">
            {currentRoutine.map((step, index) => (
              <div
                key={step.order}
                className="bg-card rounded-2xl shadow-card overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleStep(step.order)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  {/* Step number */}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                    ${activeTab === 'morning' 
                      ? 'gradient-primary text-primary-foreground' 
                      : 'gradient-coral text-primary-foreground'
                    }
                  `}>
                    {step.order}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {step.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {step.product.brand}
                    </p>
                  </div>

                  {/* Expand icon */}
                  <ChevronRight 
                    className={`
                      w-5 h-5 text-muted-foreground transition-transform duration-300
                      ${expandedStep === step.order ? 'rotate-90' : ''}
                    `} 
                  />
                </button>

                {/* Expanded content */}
                {expandedStep === step.order && (
                  <div className="px-4 pb-4 space-y-4 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      {/* Product image placeholder */}
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <div className="w-10 h-10 rounded-lg gradient-primary opacity-50" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-foreground">
                            {step.product.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {step.duration || 'Apply as directed'}
                          </div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 bg-muted/50 rounded-xl p-3">
                        <p className="text-sm font-medium text-foreground mb-1">
                          How to use:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.instructions}
                        </p>
                      </div>

                      {/* Usage tip */}
                      <p className="text-xs text-muted-foreground mt-3">
                        💡 {step.product.usage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button 
              variant="hero" 
              size="lg"
              className="w-full"
              onClick={() => setCurrentScreen('progress')}
            >
              <Bookmark className="w-5 h-5 mr-2" />
              Save & Track Progress
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full"
              onClick={resetApp}
            >
              Start New Analysis
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationsScreen;
