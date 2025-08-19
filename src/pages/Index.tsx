import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Target,
  Award
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Psychometric Analysis',
      description: 'Evaluate personality fit and cognitive alignment with regulatory work'
    },
    {
      icon: Target,
      title: 'Technical Assessment',
      description: 'Test domain knowledge and regulatory aptitude'
    },
    {
      icon: Award,
      title: 'WISCAR Framework',
      description: 'Comprehensive evaluation across six key success dimensions'
    }
  ];

  const careerPaths = [
    'Regulatory Affairs Associate',
    'Clinical Regulatory Coordinator',
    'Regulatory Intelligence Analyst',
    'Quality & Regulatory Affairs Officer',
    'Regulatory Compliance Analyst'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Regulatory Affairs
            </h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Are You Ready to Become a Regulatory Affairs Specialist?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your career fit with our AI-powered assessment. Get personalized insights 
            into your readiness for a rewarding career in regulatory affairs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Clock className="w-4 h-4 mr-2" />
              25-30 minutes
            </Badge>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              <Users className="w-4 h-4 mr-2" />
              Personalized Results
            </Badge>
            <Badge className="bg-secondary border-secondary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Guidance
            </Badge>
          </div>

          <Button 
            size="lg" 
            variant="hero"
            onClick={() => navigate('/assessment')}
            className="text-lg px-8 py-6 h-auto"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">What You'll Discover</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full w-fit mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Regulatory Affairs */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">About Regulatory Affairs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-center text-muted-foreground">
                Regulatory Affairs Specialists ensure that products—especially pharmaceuticals, 
                medical devices, food, and chemicals—comply with regulations and laws in various 
                global markets.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      Prepare and submit regulatory documents
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      Ensure compliance with FDA, EMA, and other agencies
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      Coordinate between R&D and regulatory bodies
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      Monitor regulatory changes and updates
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Skills That Matter
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                      Attention to detail and accuracy
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                      Strong analytical and problem-solving abilities
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                      Excellent written communication
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                      Understanding of regulatory frameworks
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Career Opportunities</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Regulatory affairs opens doors to diverse career paths in healthcare, 
            pharmaceuticals, medical devices, and more.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {careerPaths.map((career, index) => (
              <Badge key={index} variant="outline" className="text-sm py-2 px-4">
                {career}
              </Badge>
            ))}
          </div>

          <Button 
            size="lg" 
            variant="hero"
            onClick={() => navigate('/assessment')}
            className="text-lg px-8 py-6 h-auto"
          >
            Discover Your Path
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
