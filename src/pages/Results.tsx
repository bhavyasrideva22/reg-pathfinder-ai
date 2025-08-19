import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScoreCard } from '@/components/assessment/ScoreCard';
import { WiscarRadarChart } from '@/components/assessment/RadarChart';
import { calculateAssessmentResults } from '@/utils/scoring';
import { AssessmentResult, UserAnswer } from '@/types/assessment';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Download,
  Home,
  RefreshCw
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answersData = localStorage.getItem('assessmentAnswers');
    
    if (!answersData) {
      navigate('/');
      return;
    }

    try {
      const answers: UserAnswer[] = JSON.parse(answersData);
      const calculatedResults = calculateAssessmentResults(answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error processing results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Unable to load results</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-accent text-accent-foreground';
      case 'Maybe': return 'bg-yellow-100 text-yellow-800';
      case 'No': return 'bg-red-100 text-red-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Assessment Results</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Your Regulatory Affairs Specialist Career Readiness Report
          </p>
          
          {/* Overall Score */}
          <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
            <div className="text-6xl font-bold text-primary mb-2">
              {results.overallConfidenceScore}%
            </div>
            <div className="text-lg mb-3">Overall Career Fit Score</div>
            <Badge className={getRecommendationColor(results.recommendation)}>
              Recommendation: {results.recommendation}
            </Badge>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ScoreCard
            title="Psychometric Fit"
            score={results.psychometricFitScore}
            description="Your personality alignment with regulatory affairs work"
            variant="primary"
          />
          <ScoreCard
            title="Technical Readiness"
            score={results.technicalReadinessScore}
            description="Your current knowledge and technical skills"
            variant="accent"
          />
        </div>

        {/* WISCAR Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              WISCAR Framework Analysis
            </CardTitle>
            <p className="text-muted-foreground">
              Comprehensive evaluation across six key dimensions for career success
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="font-bold text-primary w-12 text-right">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <WiscarRadarChart data={results.wiscarScores} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.careerSuggestions.map((career, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                    <ArrowRight className="w-4 h-4 text-accent" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Paths (if any) */}
        {results.alternativePaths.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Alternative Career Paths to Consider</CardTitle>
              <p className="text-muted-foreground">
                Based on your results, you might also consider these related fields
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.alternativePaths.map((path, index) => (
                  <Badge key={index} variant="outline">
                    {path}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button 
            onClick={() => {
              localStorage.removeItem('assessmentAnswers');
              localStorage.removeItem('assessmentTime');
              navigate('/assessment');
            }}
            variant="secondary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
          <Button variant="hero">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;