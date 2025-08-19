export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert-scale' | 'scenario' | 'drag-drop';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  weight: number;
}

export interface AssessmentResult {
  userId: string;
  assessmentId: string;
  psychometricFitScore: number;
  technicalReadinessScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitiveReadiness: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'No' | 'Maybe';
  confidenceLevel: number;
  nextSteps: string[];
  careerSuggestions: string[];
  alternativePaths: string[];
  reportGenerated: string;
}

export interface UserAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number;
}