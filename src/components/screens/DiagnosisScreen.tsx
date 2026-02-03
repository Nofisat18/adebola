import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowRight, ArrowLeft, Droplets, Sun, Zap, Sparkles, AlertCircle, Flower2, CloudSun, CircleDot } from 'lucide-react';
import { SkinConcern } from '@/types/skincare';

const concernIcons: Record<SkinConcern, React.ReactNode> = {
  acne: <AlertCircle className="w-6 h-6" />,
  dryness: <Droplets className="w-6 h-6" />,
  pigmentation: <Sun className="w-6 h-6" />,
  sensitivity: <Zap className="w-6 h-6" />,
  redness: <Flower2 className="w-6 h-6" />,
  aging: <Sparkles className="w-6 h-6" />,
  dullness: <CloudSun className="w-6 h-6" />,
  pores: <CircleDot className="w-6 h-6" />,
};

const concernLabels: Record<SkinConcern, string> = {
  acne: 'Acne & Breakouts',
  dryness: 'Dryness',
  pigmentation: 'Pigmentation',
  sensitivity: 'Sensitivity',
  redness: 'Redness',
  aging: 'Signs of Aging',
  dullness: 'Dullness',
  pores: 'Enlarged Pores',
};

const severityColors = {
  mild: 'bg-primary/20 text-primary',
  moderate: 'bg-accent/20 text-accent-foreground',
  severe: 'bg-destructive/20 text-destructive',
};

const DiagnosisScreen: React.FC = () => {
  const { setCurrentScreen, diagnosis, generateRoutine, resetApp } = useApp();

  const handleViewRoutine = () => {
    generateRoutine();
    setCurrentScreen('recommendations');
  };

  if (!diagnosis) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No diagnosis available</p>
          <Button onClick={resetApp}>Start Over</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <button 
          onClick={resetApp}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Start Over</span>
        </button>
        <div className="text-sm text-muted-foreground">Step 3 of 3</div>
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Score Card */}
          <div className="bg-card rounded-3xl p-6 shadow-card text-center space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground">Your Skin Health Score</h2>
            
            <div className="relative w-40 h-40 mx-auto">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(diagnosis.overallScore / 100) * 440} 440`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{diagnosis.overallScore}</span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              {diagnosis.overallScore >= 80 
                ? 'Your skin is in great condition!' 
                : diagnosis.overallScore >= 60 
                ? 'Your skin is doing well with room for improvement.'
                : 'We\'ve identified areas that need attention.'}
            </p>
          </div>

          {/* Skin Type */}
          <div className="bg-card rounded-2xl p-5 shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Skin Type</p>
                <p className="text-lg font-semibold text-foreground capitalize">{diagnosis.skinType}</p>
              </div>
            </div>
          </div>

          {/* Detected Concerns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Detected Concerns</h3>
            
            <div className="space-y-3">
              {diagnosis.concerns.map((concern, index) => (
                <div 
                  key={concern.type}
                  className="bg-card rounded-2xl p-5 shadow-card animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      concern.severity === 'mild' ? 'bg-primary/10 text-primary' :
                      concern.severity === 'moderate' ? 'bg-accent/20 text-accent-foreground' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {concernIcons[concern.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{concernLabels[concern.type]}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${severityColors[concern.severity]}`}>
                          {concern.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{concern.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-4">
            <Button 
              variant="hero" 
              size="lg"
              className="w-full"
              onClick={handleViewRoutine}
            >
              View My Personalized Routine
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Based on your unique skin profile
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisScreen;
