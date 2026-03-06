export interface Skill {
  name: string;
  level: number;
  description: string;
  category: string;
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

export const aboutData = {
  agentId: 'CC-2026',
  specialization: [
    'Creative Producing',
    'Storytelling & Narrative',
    'Agentic Creative & AI',
    'Line Producing & Production',
  ],
  location: 'Remote / Atlanta / Brooklyn',
  missionStatement:
    'Producer and creator building production systems that work at any scale. Expertise across storytelling, production services, film, video, branded content, AI-driven workflows, interactive experiences, and full-stack web applications.',
  backgroundBriefing:
    '20 years of experience in traditional, brand, and broadcast production. Worked with teams and crews across 6 continents on projects ranging from network television to Fortune 500 campaigns to independent film. Built systems that automate operational work so creators can focus on making things. Expertise in concepting narrative content, optimizing video, directing talent, solving technical problems, and building automated operations and content systems.',
  skills: [
    { name: 'Video Production', level: 5, description: '20 years producing video content from concept to delivery across broadcast, digital, and social platforms', category: 'Production' },
    { name: 'Creative Direction', level: 5, description: 'End-to-end creative leadership from concepting through final delivery', category: 'Production' },
    { name: 'Multi-Camera Direction', level: 5, description: 'Expert in coordinating multi-camera studio and field productions with A-list talent', category: 'Production' },
    { name: 'Documentary Production', level: 5, description: 'Produced documentary content for major networks including true crime, travel, and investigative series', category: 'Production' },
    { name: 'Narrative Film', level: 5, description: 'Wrote, produced, and directed narrative feature films with award-winning results', category: 'Production' },
    { name: 'Branded Content', level: 5, description: 'Created branded video campaigns for Fortune 500 clients across multiple industries', category: 'Production' },
    { name: 'Remote Production', level: 5, description: 'Established distributed production capabilities coordinating teams across 6 continents', category: 'Production' },
    { name: 'Budget Management', level: 5, description: 'Maintained budget discipline on productions ranging from independent films to network television', category: 'Production' },
    { name: 'Talent Direction', level: 5, description: 'Directed on-set production including talent coordination, camera work, and lighting', category: 'Production' },
    { name: 'Storyboarding', level: 5, description: 'Developed creative concepts from initial brief through detailed storyboards', category: 'Production' },
    { name: 'Risk Assessment', level: 5, description: 'Conducted comprehensive risk assessments for high-production-value stunts and extreme filming scenarios', category: 'Production' },
    { name: 'Live Streaming', level: 4, description: 'Produced live-streamed events and hybrid experiences for global audiences', category: 'Production' },
    { name: 'Virtual Production', level: 4, description: 'Built immersive brand experiences with VR/XR/AR and virtual production technologies', category: 'Production' },
    { name: 'Adobe Premiere Pro', level: 5, description: 'Expert-level video editing with Premiere Pro for broadcast and digital delivery', category: 'Video/Post' },
    { name: 'After Effects', level: 5, description: 'Advanced motion graphics and visual effects creation', category: 'Video/Post' },
    { name: 'Motion Graphics', level: 5, description: 'Created motion graphics and animation for broadcast and digital platforms', category: 'Video/Post' },
    { name: 'Post-Production', level: 5, description: 'Comprehensive post-production workflows including editing, color grading, and final delivery', category: 'Video/Post' },
    { name: 'DaVinci Resolve', level: 4, description: 'Professional color grading and finishing workflows', category: 'Video/Post' },
    { name: 'Sound Design', level: 4, description: 'Comprehensive audio post-production and sound design', category: 'Video/Post' },
    { name: 'Multi-Format Delivery', level: 5, description: 'Optimized video content for broadcast, digital, and social platforms with platform-specific viewing patterns', category: 'Video/Post' },
    { name: '4K Production', level: 5, description: 'Early adopter of 4K field production workflows and digital delivery', category: 'Video/Post' },
    { name: 'React/Next.js', level: 5, description: 'Expert-level proficiency in React ecosystem and Next.js framework', category: 'Frontend' },
    { name: 'TypeScript', level: 5, description: 'Strong TypeScript skills for type-safe development', category: 'Frontend' },
    { name: 'Tailwind CSS', level: 5, description: 'Expert in utility-first CSS framework', category: 'Frontend' },
    { name: 'Node.js', level: 4, description: 'Proficient in server-side JavaScript and API development', category: 'Backend' },
    { name: 'Python', level: 4, description: 'Experience with Python for AI/ML and backend services', category: 'Backend' },
    { name: 'AI/ML Integration', level: 4, description: 'Integrating AI models and ML workflows into applications', category: 'AI/ML' },
    { name: 'Context Engineering', level: 4, description: 'Prompt development, agentic workflows, and automated AI systems', category: 'AI/ML' },
    { name: 'AI Production Tools', level: 4, description: 'Pioneered integration of generative video, voice generation, and AI-powered post-production tools', category: 'AI/ML' },
    { name: 'Unity/C#', level: 4, description: 'Game development with Unity engine and C# programming', category: 'Game Dev' },
    { name: 'Unreal Engine 5', level: 3, description: 'Virtual production workflows using Unreal Engine 5 for real-time rendering', category: 'Game Dev' },
    { name: 'Git/Version Control', level: 5, description: 'Proficient in Git workflows and version control', category: 'DevOps' },
  ] as Skill[],
  techStackCategories: [
    { category: 'Video Production', technologies: ['Multi-Camera Systems', 'Studio Production', 'Field Production', 'Remote Production', 'Live Streaming', 'Hybrid Events'], description: 'Professional video production workflows and systems' },
    { category: 'Post-Production', technologies: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics', 'Sound Design', 'Color Grading'], description: 'Video editing, motion graphics, and post-production tools' },
    { category: 'Frontend', technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'], description: 'Modern frontend development with React ecosystem' },
    { category: 'Backend', technologies: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'REST APIs'], description: 'Server-side development and API design' },
    { category: 'AI/ML', technologies: ['OpenAI', 'Anthropic Claude', 'LTX-2', 'ElevenLabs', 'HeyGen', 'Generative Video', 'AI Voice Generation'], description: 'AI integration and machine learning workflows' },
    { category: 'Immersive', technologies: ['Unreal Engine 5', 'Unity', 'VR/XR/AR', 'Virtual Production', 'Real-Time Rendering', 'Motion Capture'], description: 'Game engines, immersive tech, and interactive experiences' },
    { category: 'DevOps', technologies: ['Git', 'Vercel', 'Docker', 'CI/CD', 'AWS'], description: 'Deployment and infrastructure management' },
    { category: 'Design', technologies: ['Figma', 'Design Systems', 'UI/UX', 'Prototyping'], description: 'User interface design and prototyping' },
    { category: 'Production Management', technologies: ['Budget Management', 'Production Scheduling', 'Tax Incentive Programs', 'Risk Assessment', 'Multi-Location Coordination', 'Background Casting'], description: 'Production logistics and management systems' },
  ] as TechStackCategory[],
  timeline: [
    { date: '2025', title: 'Combined Portfolio & AI Video', description: 'LTX-2 AI video production, combined portfolio launch', type: 'project' as const },
    { date: '2022-2025', title: 'AI Brand Ambassador', description: 'AI avatars for medical conference activation & Fortune 500 brand-ambassador pipeline', type: 'project' as const },
    { date: '2022-2025', title: 'RF Studio53', description: 'Agency producer for Fortune 500 brands', type: 'work' as const },
    { date: '2022', title: 'CW "Would I Lie To You?"', description: '13 episodes, 45+ crew, 10-day timeline', type: 'work' as const },
    { date: '2020', title: 'netuser & Ripley\'s', description: 'Award-winning film + global production across 6 continents', type: 'achievement' as const },
    { date: '2019', title: 'Adidas/Champs Documentary', description: 'A-list talent, multi-platform brand campaign', type: 'work' as const },
    { date: '2009', title: 'Creative Context Studio Founded', description: 'Atlanta & Brooklyn production studio', type: 'work' as const },
    { date: '2005-2011', title: 'Disney, Warner Bros, Networks', description: 'Pirates of the Caribbean, Superman, MTV, NatGeo', type: 'work' as const },
  ] as TimelineEvent[],
};
