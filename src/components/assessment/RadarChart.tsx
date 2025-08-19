import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitiveReadiness: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
}

export const WiscarRadarChart = ({ data }: RadarChartProps) => {
  const chartData = [
    { subject: 'Will', value: data.will, fullMark: 100 },
    { subject: 'Interest', value: data.interest, fullMark: 100 },
    { subject: 'Skill', value: data.skill, fullMark: 100 },
    { subject: 'Cognitive Readiness', value: data.cognitiveReadiness, fullMark: 100 },
    { subject: 'Ability to Learn', value: data.abilityToLearn, fullMark: 100 },
    { subject: 'Real World Alignment', value: data.realWorldAlignment, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
        />
        <Radar
          name="WISCAR Scores"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};