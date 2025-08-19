import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { assessmentQuestions } from '@/data/questions';
import { UserAnswer } from '@/types/assessment';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  }, []);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleAnswer = (answer: string | number) => {
    const timeSpent = Date.now() - questionStartTime;
    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeSpent
    };

    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(Date.now());
    } else {
      // Complete assessment and navigate to results
      const totalTime = Date.now() - startTime;
      localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
      localStorage.setItem('assessmentTime', totalTime.toString());
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const canProceed = currentAnswer !== undefined;
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Est. time remaining: {Math.max(25 - Math.floor((Date.now() - startTime) / 60000), 0)} min</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Regulatory Affairs Specialist Assessment
          </h1>
          
          <ProgressBar 
            value={currentQuestionIndex + 1} 
            max={assessmentQuestions.length}
            className="mb-6"
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            currentAnswer={currentAnswer?.answer}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={assessmentQuestions.length}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Progress: {currentQuestionIndex + 1} / {assessmentQuestions.length}</p>
            <p className="text-xs mt-1">
              {Math.round(((currentQuestionIndex + 1) / assessmentQuestions.length) * 100)}% Complete
            </p>
          </div>

          <Button
            variant={isLastQuestion ? "hero" : "default"}
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {isLastQuestion ? 'View Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;