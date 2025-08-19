import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question, UserAnswer } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ 
  question, 
  currentAnswer, 
  onAnswer, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={currentAnswer === index ? "assessment" : "outline"}
                className={cn(
                  "w-full text-left justify-start h-auto p-4 text-wrap",
                  currentAnswer === index && "ring-2 ring-accent"
                )}
                onClick={() => onAnswer(index)}
              >
                <span className="text-sm leading-relaxed">{option}</span>
              </Button>
            ))}
          </div>
        );
      
      case 'likert-scale':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={currentAnswer === index ? "assessment" : "outline"}
                className={cn(
                  "w-full text-center h-12",
                  currentAnswer === index && "ring-2 ring-accent"
                )}
                onClick={() => onAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      
      default:
        return <div>Question type not supported</div>;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="capitalize font-medium">
            {question.category} • {question.subcategory}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderQuestionContent()}
      </CardContent>
    </Card>
  );
};