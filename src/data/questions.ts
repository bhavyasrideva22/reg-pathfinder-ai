import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: 'p1',
    type: 'likert-scale',
    category: 'psychometric',
    subcategory: 'conscientiousness',
    question: 'I pay close attention to details and rarely make careless mistakes.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  {
    id: 'p2',
    type: 'likert-scale',
    category: 'psychometric',
    subcategory: 'responsibility',
    question: 'I feel comfortable taking responsibility for ensuring compliance and safety standards.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.2
  },
  {
    id: 'p3',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'ethical-reasoning',
    question: 'When faced with a regulatory deadline that seems impossible to meet, what would you do?',
    options: [
      'Rush the documentation to meet the deadline',
      'Communicate the challenges early and request an extension',
      'Skip some validation steps to save time',
      'Work overtime alone to complete everything'
    ],
    correctAnswer: 1,
    weight: 1.5
  },
  {
    id: 'p4',
    type: 'likert-scale',
    category: 'psychometric',
    subcategory: 'analytical-thinking',
    question: 'I enjoy analyzing complex rules and guidelines to understand their implications.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  
  // Technical Questions
  {
    id: 't1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'regulatory-knowledge',
    question: 'What does FDA stand for?',
    options: [
      'Federal Drug Administration',
      'Food and Drug Administration',
      'Federal Department of Agriculture',
      'Food Development Agency'
    ],
    correctAnswer: 1,
    weight: 0.8
  },
  {
    id: 't2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'regulatory-knowledge',
    question: 'Which document format is commonly used for regulatory submissions in many regions?',
    options: ['CTD (Common Technical Document)', 'FDA-483', 'GMP Certificate', 'ISO 9001'],
    correctAnswer: 0,
    weight: 1.0
  },
  {
    id: 't3',
    type: 'scenario',
    category: 'technical',
    subcategory: 'problem-solving',
    question: 'A clinical trial is about to start, but you notice the Investigational New Drug (IND) application has a missing safety report. What is your priority action?',
    options: [
      'Proceed with the trial and submit the report later',
      'Halt the trial until the safety report is submitted and approved',
      'Contact the investigator to proceed with caution',
      'Submit an incomplete application to meet deadlines'
    ],
    correctAnswer: 1,
    weight: 1.5
  },
  {
    id: 't4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'logical-reasoning',
    question: 'If a product needs approval in both the US and EU, and the US requires 6 months processing time while the EU requires 8 months, when should you submit to each region to launch simultaneously?',
    options: [
      'Submit to both regions at the same time',
      'Submit to EU first, then US 2 months later',
      'Submit to US first, then EU 2 months later',
      'Wait for US approval before submitting to EU'
    ],
    correctAnswer: 1,
    weight: 1.2
  },

  // WISCAR Questions
  {
    id: 'w1',
    type: 'likert-scale',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I persist through challenging tasks even when progress seems slow.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  {
    id: 'w2',
    type: 'likert-scale',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I find healthcare regulations and compliance guidelines genuinely interesting.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  {
    id: 'w3',
    type: 'likert-scale',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I am confident in my written communication and documentation skills.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  {
    id: 'w4',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive-readiness',
    question: 'You receive a 200-page regulatory guidance document. How do you approach it?',
    options: [
      'Read it quickly to get the main points',
      'Create a structured summary with key sections and requirements',
      'Focus only on the parts that seem immediately relevant',
      'Ask colleagues to explain the important parts'
    ],
    correctAnswer: 1,
    weight: 1.3
  },
  {
    id: 'w5',
    type: 'likert-scale',
    category: 'wiscar',
    subcategory: 'ability-to-learn',
    question: 'I actively seek feedback and use it to improve my work.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.0
  },
  {
    id: 'w6',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'real-world-alignment',
    question: 'A typical day in regulatory affairs might involve reviewing documents, coordinating with multiple teams, and tracking submission deadlines. How does this work environment appeal to you?',
    options: [
      'Very appealing - I enjoy structured, detail-oriented work',
      'Somewhat appealing - I can adapt to this type of work',
      'Neutral - It would depend on the specific tasks',
      'Not very appealing - I prefer more creative or unpredictable work'
    ],
    correctAnswer: 0,
    weight: 1.2
  }
];