import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuestionnaireAnswers, DiagnosisResult, SkincareRoutine, ProgressEntry, SkinConcern } from '@/types/skincare';
import { getRecommendedRoutine } from '@/data/mockProducts';

type AppScreen = 'home' | 'upload' | 'questionnaire' | 'analyzing' | 'diagnosis' | 'recommendations' | 'progress';

interface AppContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  answers: QuestionnaireAnswers;
  setAnswers: (answers: QuestionnaireAnswers) => void;
  diagnosis: DiagnosisResult | null;
  setDiagnosis: (result: DiagnosisResult | null) => void;
  routine: SkincareRoutine | null;
  progress: ProgressEntry[];
  addProgressEntry: (entry: ProgressEntry) => void;
  generateDiagnosis: () => void;
  generateRoutine: () => void;
  resetApp: () => void;
}

const defaultAnswers: QuestionnaireAnswers = {
  skinType: null,
  primaryConcern: null,
  secondaryConcerns: [],
  lifestyle: {
    sleepHours: '7-8',
    waterIntake: 'moderate',
    stressLevel: 'moderate',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(defaultAnswers);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [routine, setRoutine] = useState<SkincareRoutine | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);

  const generateDiagnosis = () => {
    if (!answers.skinType || !answers.primaryConcern) return;

    // Mock AI analysis based on questionnaire
    const concerns: DiagnosisResult['concerns'] = [];
    
    // Primary concern always included
    concerns.push({
      type: answers.primaryConcern,
      severity: 'moderate',
      description: getConcernDescription(answers.primaryConcern),
    });

    // Add secondary concerns
    answers.secondaryConcerns.forEach(concern => {
      concerns.push({
        type: concern,
        severity: 'mild',
        description: getConcernDescription(concern),
      });
    });

    // Add lifestyle-based concerns
    if (answers.lifestyle.sleepHours === '5-6') {
      if (!concerns.find(c => c.type === 'dullness')) {
        concerns.push({
          type: 'dullness',
          severity: 'mild',
          description: 'Lack of sleep may be contributing to a dull complexion.',
        });
      }
    }

    if (answers.lifestyle.stressLevel === 'high') {
      if (!concerns.find(c => c.type === 'sensitivity')) {
        concerns.push({
          type: 'sensitivity',
          severity: 'mild',
          description: 'High stress levels can trigger skin sensitivity and inflammation.',
        });
      }
    }

    const overallScore = Math.max(45, 100 - (concerns.length * 12) - 
      (concerns.filter(c => c.severity === 'moderate').length * 8));

    setDiagnosis({
      concerns,
      overallScore,
      skinType: answers.skinType,
    });
  };

  const generateRoutine = () => {
    if (!diagnosis) return;
    
    const allConcerns = diagnosis.concerns.map(c => c.type);
    const recommendedRoutine = getRecommendedRoutine(diagnosis.skinType, allConcerns);
    setRoutine(recommendedRoutine);
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgress(prev => [...prev, entry]);
  };

  const resetApp = () => {
    setCurrentScreen('home');
    setUploadedImage(null);
    setAnswers(defaultAnswers);
    setDiagnosis(null);
    setRoutine(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        uploadedImage,
        setUploadedImage,
        answers,
        setAnswers,
        diagnosis,
        setDiagnosis,
        routine,
        progress,
        addProgressEntry,
        generateDiagnosis,
        generateRoutine,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper function to get concern descriptions
function getConcernDescription(concern: SkinConcern): string {
  const descriptions: Record<SkinConcern, string> = {
    acne: 'Active breakouts and clogged pores detected. We\'ll focus on gentle exfoliation and oil control.',
    dryness: 'Your skin barrier needs extra hydration and nourishment to restore moisture balance.',
    pigmentation: 'Uneven skin tone and dark spots visible. Brightening ingredients will help.',
    sensitivity: 'Signs of irritation detected. We\'ll recommend gentle, soothing products.',
    redness: 'Visible redness and inflammation. Calming ingredients are essential.',
    aging: 'Fine lines and loss of firmness detected. Anti-aging actives will help.',
    dullness: 'Your skin could use a radiance boost. Exfoliation and vitamin C will help.',
    pores: 'Enlarged pores visible. Niacinamide and proper cleansing will minimize appearance.',
  };
  return descriptions[concern];
}
