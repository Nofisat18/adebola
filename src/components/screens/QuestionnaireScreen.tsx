import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { SkinType, SkinConcern } from '@/types/skincare';

const skinTypes: { value: SkinType; label: string; description: string }[] = [
  { value: 'oily', label: 'Oily', description: 'Shiny, enlarged pores' },
  { value: 'dry', label: 'Dry', description: 'Tight, flaky, rough' },
  { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { value: 'normal', label: 'Normal', description: 'Balanced, minimal issues' },
  { value: 'sensitive', label: 'Sensitive', description: 'Easily irritated, reactive' },
];

const skinConcerns: { value: SkinConcern; label: string; emoji: string }[] = [
  { value: 'acne', label: 'Acne & Breakouts', emoji: '🔴' },
  { value: 'dryness', label: 'Dryness', emoji: '🏜️' },
  { value: 'pigmentation', label: 'Dark Spots', emoji: '🌑' },
  { value: 'sensitivity', label: 'Sensitivity', emoji: '⚡' },
  { value: 'redness', label: 'Redness', emoji: '🌹' },
  { value: 'aging', label: 'Fine Lines', emoji: '✨' },
  { value: 'dullness', label: 'Dullness', emoji: '☁️' },
  { value: 'pores', label: 'Large Pores', emoji: '⭕' },
];

const QuestionnaireScreen: React.FC = () => {
  const { setCurrentScreen, answers, setAnswers, generateDiagnosis } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleSkinTypeSelect = (type: SkinType) => {
    setAnswers({ ...answers, skinType: type });
  };

  const handlePrimaryConcernSelect = (concern: SkinConcern) => {
    setAnswers({ 
      ...answers, 
      primaryConcern: concern,
      secondaryConcerns: answers.secondaryConcerns.filter(c => c !== concern)
    });
  };

  const handleSecondaryConcernToggle = (concern: SkinConcern) => {
    if (concern === answers.primaryConcern) return;
    
    const current = answers.secondaryConcerns;
    const updated = current.includes(concern)
      ? current.filter(c => c !== concern)
      : [...current, concern].slice(0, 3);
    
    setAnswers({ ...answers, secondaryConcerns: updated });
  };

  const handleLifestyleChange = (key: keyof typeof answers.lifestyle, value: string) => {
    setAnswers({
      ...answers,
      lifestyle: { ...answers.lifestyle, [key]: value }
    });
  };

  const canContinue = () => {
    switch (step) {
      case 1: return !!answers.skinType;
      case 2: return !!answers.primaryConcern;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      generateDiagnosis();
      setCurrentScreen('analyzing');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setCurrentScreen('upload');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-sm text-muted-foreground">Step 2 of 3</div>
      </header>

      {/* Progress bar */}
      <div className="px-6">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Question {step} of {totalSteps}
        </p>
      </div>

      <main className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-md w-full flex-1 flex flex-col">
          {/* Step 1: Skin Type */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  What's your skin type?
                </h2>
                <p className="text-muted-foreground">
                  Select the option that best describes your skin
                </p>
              </div>

              <div className="space-y-3">
                {skinTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleSkinTypeSelect(type.value)}
                    className={`
                      w-full p-4 rounded-2xl border-2 text-left transition-all duration-300
                      ${answers.skinType === type.value
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-primary/50 bg-card'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{type.label}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {answers.skinType === type.value && (
                        <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Primary Concern */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  What's your main concern?
                </h2>
                <p className="text-muted-foreground">
                  Choose your primary skin concern
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skinConcerns.map((concern) => (
                  <button
                    key={concern.value}
                    onClick={() => handlePrimaryConcernSelect(concern.value)}
                    className={`
                      p-4 rounded-2xl border-2 text-center transition-all duration-300
                      ${answers.primaryConcern === concern.value
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-primary/50 bg-card'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{concern.emoji}</div>
                    <p className="text-sm font-medium text-foreground">{concern.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Secondary Concerns */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Any other concerns?
                </h2>
                <p className="text-muted-foreground">
                  Select up to 3 additional concerns (optional)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skinConcerns
                  .filter(c => c.value !== answers.primaryConcern)
                  .map((concern) => {
                    const isSelected = answers.secondaryConcerns.includes(concern.value);
                    return (
                      <button
                        key={concern.value}
                        onClick={() => handleSecondaryConcernToggle(concern.value)}
                        className={`
                          p-4 rounded-2xl border-2 text-center transition-all duration-300
                          ${isSelected
                            ? 'border-accent bg-accent/10 shadow-soft'
                            : 'border-border hover:border-accent/50 bg-card'
                          }
                        `}
                      >
                        <div className="text-2xl mb-2">{concern.emoji}</div>
                        <p className="text-sm font-medium text-foreground">{concern.label}</p>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Tell us about your lifestyle
                </h2>
                <p className="text-muted-foreground">
                  This helps us personalize your routine
                </p>
              </div>

              <div className="space-y-6">
                {/* Sleep */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Average hours of sleep per night
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['5-6', '6-7', '7-8', '8+'] as const).map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLifestyleChange('sleepHours', value)}
                        className={`
                          p-3 rounded-xl border-2 text-center text-sm transition-all
                          ${answers.lifestyle.sleepHours === value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 bg-card'
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water intake */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Daily water intake
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'moderate', 'high'] as const).map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLifestyleChange('waterIntake', value)}
                        className={`
                          p-3 rounded-xl border-2 text-center text-sm capitalize transition-all
                          ${answers.lifestyle.waterIntake === value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 bg-card'
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stress level */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Current stress level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'moderate', 'high'] as const).map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLifestyleChange('stressLevel', value)}
                        className={`
                          p-3 rounded-xl border-2 text-center text-sm capitalize transition-all
                          ${answers.lifestyle.stressLevel === value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 bg-card'
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-auto pt-8">
            <Button 
              variant="hero" 
              size="lg"
              className="w-full"
              disabled={!canContinue()}
              onClick={handleContinue}
            >
              {step === totalSteps ? 'Analyze My Skin' : 'Continue'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionnaireScreen;
