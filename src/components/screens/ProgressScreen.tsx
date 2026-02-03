import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Sun, Moon, Trophy, Flame } from 'lucide-react';

const ProgressScreen: React.FC = () => {
  const { setCurrentScreen, routine, addProgressEntry, progress } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedSteps, setCompletedSteps] = useState<{ morning: string[]; evening: string[] }>({
    morning: [],
    evening: [],
  });
  const [activeRoutine, setActiveRoutine] = useState<'morning' | 'evening'>('morning');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    setCompletedSteps({ morning: [], evening: [] });
  };

  const toggleStep = (stepId: string, time: 'morning' | 'evening') => {
    setCompletedSteps(prev => {
      const current = prev[time];
      const updated = current.includes(stepId)
        ? current.filter(id => id !== stepId)
        : [...current, stepId];
      return { ...prev, [time]: updated };
    });
  };

  const currentRoutine = activeRoutine === 'morning' ? routine?.morning : routine?.evening;
  const currentCompleted = completedSteps[activeRoutine];
  const totalSteps = currentRoutine?.length || 0;
  const completedCount = currentCompleted.length;
  const progressPercent = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  // Calculate streak (mock data for demo)
  const streak = 7;
  
  // Generate week calendar
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 3 + i);
    return date;
  });

  const getCompletionStatus = (date: Date): 'complete' | 'partial' | 'none' | 'future' => {
    const today = new Date();
    if (date > today) return 'future';
    // Mock completion data for demo
    const dayDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff <= 0) return isToday(date) && completedCount > 0 ? 'partial' : 'none';
    if (dayDiff <= 3) return 'complete';
    if (dayDiff <= 5) return 'partial';
    return 'none';
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <button 
          onClick={() => setCurrentScreen('recommendations')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Routine</span>
        </button>
        <h1 className="text-lg font-semibold text-foreground">Track Progress</h1>
        <div className="w-20" />
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Streak Card */}
          <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                <div className="flex items-center gap-2">
                  <Flame className="w-8 h-8 text-accent" />
                  <span className="text-4xl font-bold text-foreground">{streak}</span>
                  <span className="text-lg text-muted-foreground">days</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          {/* Week Calendar */}
          <div className="bg-card rounded-2xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigateDay('prev')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <span className="font-medium text-foreground">{formatDate(currentDate)}</span>
              <button 
                onClick={() => navigateDay('next')}
                disabled={isToday(currentDate)}
                className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((date, i) => {
                const status = getCompletionStatus(date);
                const isSelected = date.toDateString() === currentDate.toDateString();
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentDate(date);
                      setCompletedSteps({ morning: [], evening: [] });
                    }}
                    className={`
                      flex flex-col items-center p-2 rounded-xl transition-all
                      ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                    `}
                  >
                    <span className={`text-xs mb-1 ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2)}
                    </span>
                    <span className={`text-sm font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {date.getDate()}
                    </span>
                    <div className={`
                      w-2 h-2 rounded-full mt-1
                      ${status === 'complete' ? 'bg-primary' : 
                        status === 'partial' ? 'bg-accent' : 
                        status === 'future' ? 'bg-transparent' : 'bg-muted-foreground/30'}
                      ${isSelected ? 'opacity-50' : ''}
                    `} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Routine Toggle */}
          <div className="bg-card rounded-2xl p-1.5 shadow-card flex">
            <button
              onClick={() => setActiveRoutine('morning')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                font-medium transition-all duration-300
                ${activeRoutine === 'morning' 
                  ? 'gradient-primary text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Sun className="w-5 h-5" />
              AM Routine
            </button>
            <button
              onClick={() => setActiveRoutine('evening')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                font-medium transition-all duration-300
                ${activeRoutine === 'evening' 
                  ? 'gradient-coral text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Moon className="w-5 h-5" />
              PM Routine
            </button>
          </div>

          {/* Progress Ring */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke={activeRoutine === 'morning' ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(progressPercent / 100) * 264} 264`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">{completedCount}/{totalSteps}</span>
                <span className="text-xs text-muted-foreground">steps</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {currentRoutine?.map((step, index) => {
              const isComplete = currentCompleted.includes(step.product.id);
              
              return (
                <button
                  key={step.order}
                  onClick={() => toggleStep(step.product.id, activeRoutine)}
                  className={`
                    w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all duration-300
                    ${isComplete 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-card shadow-card border-2 border-transparent hover:border-primary/30'
                    }
                  `}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all
                    ${isComplete 
                      ? 'gradient-primary' 
                      : 'bg-muted'
                    }
                  `}>
                    {isComplete ? (
                      <Check className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">{step.order}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isComplete ? 'text-primary' : 'text-foreground'}`}>
                      {step.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.product.category}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Save Button */}
          {completedCount === totalSteps && totalSteps > 0 && (
            <div className="animate-fade-in pt-4">
              <div className="bg-primary/10 rounded-2xl p-4 text-center space-y-3">
                <div className="text-3xl">🎉</div>
                <p className="font-semibold text-foreground">
                  Amazing! You completed your {activeRoutine} routine!
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    addProgressEntry({
                      date: currentDate.toISOString(),
                      completedSteps: currentCompleted,
                    });
                  }}
                >
                  Save Progress
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProgressScreen;
