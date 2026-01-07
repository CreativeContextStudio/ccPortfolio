export interface Skill {
  name: string;
  level: number; // 1-5
  description: string;
  category: 'Frontend' | 'Backend' | 'Game Dev' | 'AI/ML' | 'DevOps' | 'Design' | 'Production' | 'Video/Post';
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'achievement';
}

export interface AboutData {
  agentId: string;
  specialization: string[];
  location: string;
  missionStatement: string;
  backgroundBriefing: string;
  skills: Skill[];
  techStackCategories: TechStackCategory[];
  timeline: TimelineEvent[];
  fieldExperience: string[];
  technicalTraining: string[];
}

export const aboutData: AboutData = {
  agentId: 'CC-2026',
  specialization: [
    'Applied AI',
    'Unity Development',
    'Full-Stack Systems',
    'Creative Technology',
  ],
  location: 'Atlanta Metro / Remote Operations',
  missionStatement:
    'Producer and creator building production systems that work at any scale. Expertise across storytelling, production services, film, video, branded content, AI-driven workflows, interactive experiences, and full-stack web applications. Projects are clearly scoped, rigorously planned, executed with precision, and documented for iteration and reuse.',
  backgroundBriefing:
    '18+ years of experience in traditional, brand, and broadcast production. Worked with teams and crews across 6 continents on projects ranging from network television to Fortune 500 campaigns to independent film. Built systems that automate operational work so creators can focus on making things. Expertise in concepting narrative content, optimizing video, directing talent, solving technical problems, and building automated operations and content systems.',
  skills: [
    {
      name: 'React/Next.js',
      level: 5,
      description: 'Expert-level proficiency in React ecosystem and Next.js framework',
      category: 'Frontend',
    },
    {
      name: 'TypeScript',
      level: 5,
      description: 'Strong TypeScript skills for type-safe development',
      category: 'Frontend',
    },
    {
      name: 'Node.js',
      level: 4,
      description: 'Proficient in server-side JavaScript and API development',
      category: 'Backend',
    },
    {
      name: 'Python',
      level: 4,
      description: 'Experience with Python for AI/ML and backend services',
      category: 'Backend',
    },
    {
      name: 'Unity/C#',
      level: 4,
      description: 'Game development with Unity engine and C# programming',
      category: 'Game Dev',
    },
    {
      name: 'AI/ML Integration',
      level: 4,
      description: 'Integrating AI models and ML workflows into applications',
      category: 'AI/ML',
    },
    {
      name: 'Tailwind CSS',
      level: 5,
      description: 'Expert in utility-first CSS framework',
      category: 'Frontend',
    },
    {
      name: 'Git/Version Control',
      level: 5,
      description: 'Proficient in Git workflows and version control',
      category: 'DevOps',
    },
    {
      name: 'Video Production',
      level: 5,
      description: '18+ years producing video content from concept to delivery across broadcast, digital, and social platforms',
      category: 'Production',
    },
    {
      name: 'Multi-Camera Direction',
      level: 5,
      description: 'Expert in coordinating multi-camera studio and field productions with A-list talent',
      category: 'Production',
    },
    {
      name: 'Post-Production',
      level: 5,
      description: 'Comprehensive post-production workflows including editing, color grading, and final delivery',
      category: 'Video/Post',
    },
    {
      name: 'Documentary Production',
      level: 5,
      description: 'Produced documentary content for major networks including true crime, travel, and investigative series',
      category: 'Production',
    },
    {
      name: 'Narrative Film',
      level: 5,
      description: 'Wrote, produced, and directed narrative feature films with award-winning results',
      category: 'Production',
    },
    {
      name: 'Branded Content',
      level: 5,
      description: 'Created branded video campaigns for Fortune 500 clients across multiple industries',
      category: 'Production',
    },
    {
      name: 'Remote Production',
      level: 5,
      description: 'Established distributed production capabilities coordinating teams across 6 continents',
      category: 'Production',
    },
    {
      name: 'Live Streaming',
      level: 4,
      description: 'Produced live-streamed events and hybrid experiences for global audiences',
      category: 'Production',
    },
    {
      name: 'Budget Management',
      level: 5,
      description: 'Maintained budget discipline on productions ranging from independent films to network television',
      category: 'Production',
    },
    {
      name: 'Talent Coordination',
      level: 5,
      description: 'Directed on-set production including talent coordination, camera work, and lighting',
      category: 'Production',
    },
    {
      name: 'Storyboarding',
      level: 5,
      description: 'Developed creative concepts from initial brief through detailed storyboards',
      category: 'Production',
    },
    {
      name: 'Risk Assessment',
      level: 5,
      description: 'Conducted comprehensive risk assessments for high-production-value stunts and extreme filming scenarios',
      category: 'Production',
    },
    {
      name: 'Adobe Premiere Pro',
      level: 5,
      description: 'Expert-level video editing with Premiere Pro for broadcast and digital delivery',
      category: 'Video/Post',
    },
    {
      name: 'Adobe After Effects',
      level: 5,
      description: 'Advanced motion graphics and visual effects creation',
      category: 'Video/Post',
    },
    {
      name: 'DaVinci Resolve',
      level: 4,
      description: 'Professional color grading and finishing workflows',
      category: 'Video/Post',
    },
    {
      name: 'Motion Graphics',
      level: 5,
      description: 'Created motion graphics and animation for broadcast and digital platforms',
      category: 'Video/Post',
    },
    {
      name: 'Sound Design',
      level: 4,
      description: 'Comprehensive audio post-production and sound design',
      category: 'Video/Post',
    },
    {
      name: 'Multi-Format Delivery',
      level: 5,
      description: 'Optimized video content for broadcast, digital, and social platforms with platform-specific viewing patterns',
      category: 'Video/Post',
    },
    {
      name: '4K Production',
      level: 5,
      description: 'Early adopter of 4K field production workflows and digital delivery',
      category: 'Video/Post',
    },
    {
      name: 'AI Production Tools',
      level: 4,
      description: 'Pioneered integration of generative video, voice generation, and AI-powered post-production tools',
      category: 'AI/ML',
    },
    {
      name: 'Virtual Production',
      level: 4,
      description: 'Built immersive brand experiences with VR/XR/AR and virtual production technologies',
      category: 'Production',
    },
    {
      name: 'Unreal Engine 5',
      level: 3,
      description: 'Virtual production workflows using Unreal Engine 5 for real-time rendering',
      category: 'Game Dev',
    },
  ],
  techStackCategories: [
    {
      category: 'Frontend',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      description: 'Modern frontend development with React ecosystem',
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'REST APIs'],
      description: 'Server-side development and API design',
    },
    {
      category: 'Game Development',
      technologies: ['Unity', 'C#', 'Unreal Engine 5', 'Shader Programming', '3D Graphics', 'Motion Capture'],
      description: 'Game engine development and interactive experiences',
    },
    {
      category: 'AI/ML',
      technologies: ['OpenAI API', 'Anthropic Claude', 'Python ML', 'NLP', 'Generative Video', 'ElevenLabs', 'HeyGen', 'AI Voice Generation'],
      description: 'AI integration and machine learning workflows',
    },
    {
      category: 'DevOps',
      technologies: ['Git', 'Vercel', 'Docker', 'CI/CD', 'AWS'],
      description: 'Deployment and infrastructure management',
    },
    {
      category: 'Design',
      technologies: ['Figma', 'Design Systems', 'UI/UX', 'Prototyping'],
      description: 'User interface design and prototyping',
    },
    {
      category: 'Video Production',
      technologies: ['Multi-Camera Systems', 'Studio Production', 'Field Production', 'Remote Production', 'Live Streaming', 'Hybrid Events'],
      description: 'Professional video production workflows and systems',
    },
    {
      category: 'Post-Production',
      technologies: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics', 'Sound Design', 'Color Grading'],
      description: 'Video editing, motion graphics, and post-production tools',
    },
    {
      category: 'Virtual Production',
      technologies: ['VR/XR/AR', 'Unreal Engine 5', 'Unity', 'Real-Time Rendering', 'AI Brand Ambassadors', 'Interactive Experiences'],
      description: 'Emerging virtual production and immersive technologies',
    },
    {
      category: 'Production Management',
      technologies: ['Budget Management', 'Production Scheduling', 'Tax Incentive Programs', 'Risk Assessment', 'Multi-Location Coordination', 'Background Casting'],
      description: 'Production logistics and management systems',
    },
  ],
  timeline: [
    {
      date: '2024',
      title: 'Portfolio Website Development',
      description: 'Built comprehensive portfolio with Cold War aerospace aesthetic',
      type: 'project',
    },
    {
      date: '2023-2024',
      title: 'AI Creative Systems',
      description: 'Developed AI-powered creative workflow tools',
      type: 'project',
    },
    {
      date: '2023',
      title: 'Unity Game Prototype',
      description: 'Created 3D puzzle game with procedural generation',
      type: 'project',
    },
    {
      date: '2022-2023',
      title: 'Full-Stack E-Commerce Platform',
      description: 'Built scalable e-commerce solution with real-time inventory',
      type: 'work',
    },
    {
      date: '2021-2022',
      title: 'Backend API Development',
      description: 'Developed RESTful APIs for mobile applications',
      type: 'work',
    },
    {
      date: '2020-2021',
      title: 'Frontend Development',
      description: 'Started specializing in React and modern frontend development',
      type: 'work',
    },
  ],
  fieldExperience: [
    '5+ years of professional software development',
    'Experience with startups and enterprise clients',
    'Full-stack development across multiple industries',
    'AI/ML integration in production applications',
    'Game development and interactive experiences',
  ],
  technicalTraining: [
    'Computer Science fundamentals',
    'Software engineering best practices',
    'Agile development methodologies',
    'Continuous learning in emerging technologies',
    'Open source contributions',
  ],
};

