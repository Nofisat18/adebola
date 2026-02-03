import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

const analyzingSteps = [
  'Scanning skin texture...',
  'Detecting concerns...',
  'Analyzing hydration levels...',
  'Evaluating skin tone...',
  'Generating personalized insights...',
];

const AnalyzingScreen: React.FC = () => {
  const { setCurrentScreen, uploadedImage } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    // Step text animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analyzingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    // Navigate to diagnosis after animation
    const timeout = setTimeout(() => {
      setCurrentScreen('diagnosis');
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [setCurrentScreen]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full text-center space-y-12">
        {/* Scanning animation */}
        <div className="relative mx-auto w-56 h-56">
          {/* Background rings */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
          <div className="absolute inset-4 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-8 rounded-full border-4 border-primary/30" />
          
          {/* Pulsing rings */}
          <div className="pulse-ring" />
          <div className="pulse-ring" style={{ animationDelay: '0.5s' }} />
          <div className="pulse-ring" style={{ animationDelay: '1s' }} />
          
          {/* Center image */}
          <div className="absolute inset-12 rounded-full overflow-hidden shadow-elevated">
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Your skin" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full gradient-primary flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Scanning line */}
          <div className="absolute inset-12 rounded-full overflow-hidden">
            <div className="scan-line absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Analyzing Your Skin
            </h2>
            <p className="text-muted-foreground h-6 transition-all duration-300">
              {analyzingSteps[currentStep]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-primary transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{progress}%</p>
          </div>
        </div>

        {/* Fun fact */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-sm text-muted-foreground">
          <p>💡 Did you know? Your skin renews itself every 28 days.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
