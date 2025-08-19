import { UserAnswer, Question, AssessmentResult } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateAssessmentResults = (answers: UserAnswer[]): AssessmentResult => {
  const scoresByCategory = {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitiveReadiness: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0
    }
  };

  const maxScoresByCategory = {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitiveReadiness: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0
    }
  };

  // Calculate scores
  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    let score = 0;
    const maxScore = question.weight * 5; // Assuming 5-point scale

    if (question.type === 'likert-scale') {
      score = (Number(answer.answer) + 1) * question.weight; // Convert 0-4 to 1-5
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      score = (answer.answer === question.correctAnswer ? 5 : 1) * question.weight;
    }

    // Categorize scores
    if (question.category === 'psychometric') {
      scoresByCategory.psychometric += score;
      maxScoresByCategory.psychometric += maxScore;
    } else if (question.category === 'technical') {
      scoresByCategory.technical += score;
      maxScoresByCategory.technical += maxScore;
    } else if (question.category === 'wiscar') {
      const subcategory = question.subcategory.replace('-', '');
      
      if (subcategory === 'cognitivereadiness') {
        scoresByCategory.wiscar.cognitiveReadiness += score;
        maxScoresByCategory.wiscar.cognitiveReadiness += maxScore;
      } else if (subcategory === 'abilitytolearn') {
        scoresByCategory.wiscar.abilityToLearn += score;
        maxScoresByCategory.wiscar.abilityToLearn += maxScore;
      } else if (subcategory === 'realworldalignment') {
        scoresByCategory.wiscar.realWorldAlignment += score;
        maxScoresByCategory.wiscar.realWorldAlignment += maxScore;
      } else if (subcategory === 'will') {
        scoresByCategory.wiscar.will += score;
        maxScoresByCategory.wiscar.will += maxScore;
      } else if (subcategory === 'interest') {
        scoresByCategory.wiscar.interest += score;
        maxScoresByCategory.wiscar.interest += maxScore;
      } else if (subcategory === 'skill') {
        scoresByCategory.wiscar.skill += score;
        maxScoresByCategory.wiscar.skill += maxScore;
      }
    }
  });

  // Calculate percentages
  const psychometricFitScore = Math.round((scoresByCategory.psychometric / maxScoresByCategory.psychometric) * 100);
  const technicalReadinessScore = Math.round((scoresByCategory.technical / maxScoresByCategory.technical) * 100);
  
  const wiscarScores = {
    will: Math.round((scoresByCategory.wiscar.will / Math.max(maxScoresByCategory.wiscar.will, 1)) * 100),
    interest: Math.round((scoresByCategory.wiscar.interest / Math.max(maxScoresByCategory.wiscar.interest, 1)) * 100),
    skill: Math.round((scoresByCategory.wiscar.skill / Math.max(maxScoresByCategory.wiscar.skill, 1)) * 100),
    cognitiveReadiness: Math.round((scoresByCategory.wiscar.cognitiveReadiness / Math.max(maxScoresByCategory.wiscar.cognitiveReadiness, 1)) * 100),
    abilityToLearn: Math.round((scoresByCategory.wiscar.abilityToLearn / Math.max(maxScoresByCategory.wiscar.abilityToLearn, 1)) * 100),
    realWorldAlignment: Math.round((scoresByCategory.wiscar.realWorldAlignment / Math.max(maxScoresByCategory.wiscar.realWorldAlignment, 1)) * 100)
  };

  const overallConfidenceScore = Math.round(
    (psychometricFitScore + technicalReadinessScore + 
     Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3
  );

  // Generate recommendations
  let recommendation: 'Yes' | 'No' | 'Maybe';
  let nextSteps: string[];
  let careerSuggestions: string[];
  let alternativePaths: string[];

  if (overallConfidenceScore >= 80) {
    recommendation = 'Yes';
    nextSteps = [
      'Begin with Introduction to Regulatory Affairs course',
      'Study FDA and EMA submission guidelines',
      'Practice with CTD format documentation',
      'Consider regulatory affairs internship opportunities'
    ];
    careerSuggestions = [
      'Regulatory Affairs Associate',
      'Clinical Regulatory Coordinator',
      'Regulatory Intelligence Analyst'
    ];
    alternativePaths = [];
  } else if (overallConfidenceScore >= 50) {
    recommendation = 'Maybe';
    nextSteps = [
      'Strengthen foundational knowledge in life sciences',
      'Take introductory compliance courses',
      'Develop technical writing skills',
      'Gain experience in quality assurance roles'
    ];
    careerSuggestions = [
      'Quality Assurance Assistant',
      'Clinical Research Coordinator',
      'Medical Writer'
    ];
    alternativePaths = [
      'Quality Assurance',
      'Clinical Research',
      'Medical Writing'
    ];
  } else {
    recommendation = 'No';
    nextSteps = [
      'Explore alternative career paths in healthcare',
      'Consider roles in business development or sales',
      'Develop core analytical and communication skills'
    ];
    careerSuggestions = [
      'Healthcare Business Analyst',
      'Medical Sales Representative',
      'Project Coordinator'
    ];
    alternativePaths = [
      'Healthcare Administration',
      'Medical Sales',
      'Healthcare Project Management'
    ];
  }

  return {
    userId: 'current-user',
    assessmentId: 'reg-affairs-readiness-2025',
    psychometricFitScore,
    technicalReadinessScore,
    wiscarScores,
    overallConfidenceScore,
    recommendation,
    confidenceLevel: overallConfidenceScore,
    nextSteps,
    careerSuggestions,
    alternativePaths,
    reportGenerated: new Date().toISOString()
  };
};