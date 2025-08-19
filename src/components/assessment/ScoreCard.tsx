import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  variant?: 'primary' | 'accent' | 'secondary';
}

export const ScoreCard = ({ title, score, description, variant = 'primary' }: ScoreCardProps) => {
  const getColorClasses = (score: number, variant: string) => {
    if (score >= 80) {
      return variant === 'accent' ? 'bg-accent/10 border-accent/20' : 'bg-primary/10 border-primary/20';
    } else if (score >= 60) {
      return 'bg-yellow-50 border-yellow-200';
    } else {
      return 'bg-red-50 border-red-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", getColorClasses(score, variant))}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className={cn("text-3xl font-bold", getScoreColor(score))}>
            {score}%
          </span>
          <div className="text-right">
            <div className={cn("text-xs px-2 py-1 rounded-full font-medium", 
              score >= 80 ? 'bg-accent text-accent-foreground' :
              score >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            )}>
              {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};