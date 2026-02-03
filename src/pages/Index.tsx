import { AppProvider, useApp } from '@/context/AppContext';
import HomeScreen from '@/components/screens/HomeScreen';
import UploadScreen from '@/components/screens/UploadScreen';
import QuestionnaireScreen from '@/components/screens/QuestionnaireScreen';
import AnalyzingScreen from '@/components/screens/AnalyzingScreen';
import DiagnosisScreen from '@/components/screens/DiagnosisScreen';
import RecommendationsScreen from '@/components/screens/RecommendationsScreen';
import ProgressScreen from '@/components/screens/ProgressScreen';

const AppContent = () => {
  const { currentScreen } = useApp();

  const screens = {
    home: <HomeScreen />,
    upload: <UploadScreen />,
    questionnaire: <QuestionnaireScreen />,
    analyzing: <AnalyzingScreen />,
    diagnosis: <DiagnosisScreen />,
    recommendations: <RecommendationsScreen />,
    progress: <ProgressScreen />,
  };

  return (
    <div className="min-h-screen">
      {screens[currentScreen]}
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
