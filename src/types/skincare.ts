export type SkinType = 'oily' | 'dry' | 'combination' | 'normal' | 'sensitive';

export type SkinConcern = 
  | 'acne'
  | 'dryness'
  | 'pigmentation'
  | 'sensitivity'
  | 'redness'
  | 'aging'
  | 'dullness'
  | 'pores';

export interface QuestionnaireAnswers {
  skinType: SkinType | null;
  primaryConcern: SkinConcern | null;
  secondaryConcerns: SkinConcern[];
  lifestyle: {
    sleepHours: '5-6' | '6-7' | '7-8' | '8+';
    waterIntake: 'low' | 'moderate' | 'high';
    stressLevel: 'low' | 'moderate' | 'high';
  };
}

export interface DiagnosisResult {
  concerns: {
    type: SkinConcern;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
  }[];
  overallScore: number;
  skinType: SkinType;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment' | 'mask';
  image: string;
  description: string;
  usage: string;
  frequency: 'daily' | 'twice-daily' | 'weekly' | 'as-needed';
}

export interface RoutineStep {
  order: number;
  time: 'morning' | 'evening' | 'both';
  product: Product;
  instructions: string;
  duration?: string;
}

export interface SkincareRoutine {
  morning: RoutineStep[];
  evening: RoutineStep[];
}

export interface ProgressEntry {
  date: string;
  completedSteps: string[];
  notes?: string;
  photo?: string;
}
