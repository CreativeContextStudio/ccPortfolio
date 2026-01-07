import { StatusType } from '../components/ui/StatusBadge';
import { TechStackType } from '../components/ui/TechStackIcon';

export interface Project {
  projectId: string;
  title: string;
  description: string;
  dateRange: string;
  status: StatusType;
  techStack: TechStackType[];
  tags?: string[];
  link?: string;
  domain?: string;
  problemSolved?: string;
  preview?: {
    image?: string;
    additionalInfo?: string;
  };
}

export const projects: Project[] = [
  {
    projectId: 'PROJECT-2024-001',
    title: 'Portfolio Website',
    description:
      'A Cold War aerospace-themed portfolio website built with Next.js and Tailwind CSS. Features multi-theme support, comprehensive component library, and dramatic animations.',
    dateRange: '2024-01 - 2024-03',
    status: 'deployed',
    techStack: ['react', 'nextjs', 'typescript', 'tailwind', 'git', 'interactive'],
    tags: ['interactive'],
    link: 'https://creativecontent.studio',
    domain: 'Web Development',
    problemSolved: 'Created a unique portfolio experience that stands out while maintaining professional standards.',
    preview: {
      additionalInfo: 'Features include multi-theme system, animated components, and responsive design.',
    },
  },
  {
    projectId: 'PROJECT-2020-001',
    title: 'netuser',
    description:
      'Award-winning narrative feature film written, produced, and directed. Starring Denis O\'Hare. Achieved Best Film award at LGBT Los Angeles Film Festival.',
    dateRange: '2020',
    status: 'deployed',
    techStack: ['video', 'premiere', 'aftereffects'],
    tags: ['video', 'film'],
    domain: 'Film Production',
    problemSolved: 'Created compelling narrative feature that resonated with festival audiences and critics.',
    preview: {
      additionalInfo: 'Feature-length narrative film. Best Film award at LGBT Los Angeles Film Festival.',
    },
  },
  {
    projectId: 'PROJECT-2018-001',
    title: 'IBM Cyber Security Campaign',
    description:
      'Directed branded video content requiring security clearances. Campaign exceeded engagement targets by 40% and secured additional contract work.',
    dateRange: '2018',
    status: 'deployed',
    techStack: ['video', 'premiere', 'aftereffects', 'ai'],
    tags: ['video', 'brand', 'ai'],
    domain: 'Brand Video',
    problemSolved: 'Delivered high-security video content that exceeded engagement targets by 40%.',
    preview: {
      additionalInfo: 'Required security clearances. Exceeded engagement targets by 40%.',
    },
  },
  {
    projectId: 'PROJECT-2019-001',
    title: 'Adidas/Champs Brand Documentary',
    description:
      'Conceived, produced, and directed 15-minute branded documentary campaign featuring A-list sports and entertainment talent. Delivered for broadcast, digital, and social platforms.',
    dateRange: '2019',
    status: 'deployed',
    techStack: ['video', 'premiere', 'aftereffects'],
    tags: ['video', 'brand'],
    domain: 'Brand Video',
    problemSolved: 'Created compelling brand narrative that worked across multiple platforms and formats.',
    preview: {
      additionalInfo: '15-minute documentary. Featured A-list sports and entertainment talent. Multi-platform delivery.',
    },
  },
  {
    projectId: 'PROJECT-2020-002',
    title: 'Travel Channel - "Ripley\'s Believe It or Not!"',
    description:
      'Supervised remote video production across 25+ cities spanning 6 continents. Coordinated 100+ person distributed teams to deliver 60+ high-quality video segments for internationally distributed series.',
    dateRange: '2020',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'broadcast'],
    domain: 'Broadcast Production',
    problemSolved: 'Maintained consistent quality and brand standards across 25+ international locations with zero safety incidents.',
    preview: {
      additionalInfo: '60+ video segments across 25+ cities, 6 continents. 100+ person distributed team.',
    },
  },
  {
    projectId: 'PROJECT-2022-001',
    title: 'The CW - "Would I Lie To You?"',
    description:
      'Managed 13-episode studio production with 45+ team members, delivering 6.5 hours of broadcast television to network standards on a compressed 10-day production timeline. Multi-camera studio shoots with A-list talent.',
    dateRange: '2022',
    status: 'deployed',
    techStack: ['video', 'premiere', 'interactive'],
    tags: ['video', 'broadcast', 'interactive'],
    domain: 'Broadcast Production',
    problemSolved: 'Delivered network-quality episodes on compressed timeline, resulting in network renewal for additional seasons.',
    preview: {
      additionalInfo: '13 episodes, 6.5 hours of content. 45+ team members. 10-day production timeline.',
    },
  },
  {
    projectId: 'PROJECT-2015-001',
    title: 'Discovery ID - "Shadow of Doubt"',
    description:
      'Produced true crime video series across multiple cities. Directed recreation video shoots coordinated with law enforcement and family representatives. Delivered 6 x 60-minute episodes.',
    dateRange: '2015-2016',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'documentary'],
    domain: 'Documentary Production',
    problemSolved: 'Managed sensitive content requiring careful creative direction and stakeholder coordination.',
    preview: {
      additionalInfo: '6 x 60-minute episodes. Coordinated with law enforcement and family representatives.',
    },
  },
  {
    projectId: 'PROJECT-2022-002',
    title: 'VR/XR/AR Brand Experiences',
    description:
      'Built immersive brand experiences integrating virtual production technologies. Created interactive experiences with games, VR/XR/AR, and AI brand ambassadors for Fortune 500 clients.',
    dateRange: '2022-2025',
    status: 'active',
    techStack: ['xr', 'unreal', 'unity', 'ai', 'interactive'],
    tags: ['xr', 'games', 'ai', 'interactive'],
    domain: 'Immersive Media',
    problemSolved: 'Pioneered integration of emerging technologies into traditional agency workflows.',
    preview: {
      additionalInfo: 'Virtual production, VR/XR/AR experiences, AI brand ambassadors, interactive games.',
    },
  },
  {
    projectId: 'PROJECT-2020-003',
    title: 'Performance Video Testing System',
    description:
      'Built framework enabling rapid creative testing of ad variations. Reduced iteration cycles by 60% while improving campaign performance metrics. Integrated AI tools for automated optimization.',
    dateRange: '2020-Present',
    status: 'active',
    techStack: ['video', 'premiere', 'ai', 'python', 'nodejs', 'interactive'],
    tags: ['video', 'ai', 'interactive'],
    domain: 'AI/ML',
    problemSolved: 'Streamlined video ad testing workflow, reducing iteration cycles by 60%.',
    preview: {
      additionalInfo: 'Automated video testing framework. 60% reduction in iteration cycles.',
    },
  },
  {
    projectId: 'PROJECT-2022-003',
    title: 'AI Brand Ambassador System',
    description:
      'Developed AI-powered brand ambassador system for Fortune 500 clients. Integrated generative video, voice generation, and automated content systems into production workflows.',
    dateRange: '2022-2025',
    status: 'active',
    techStack: ['ai', 'video', 'premiere', 'python', 'nodejs', 'interactive'],
    tags: ['ai', 'video', 'interactive'],
    domain: 'AI/ML',
    problemSolved: 'Created scalable AI brand ambassador system for consistent brand representation.',
    preview: {
      additionalInfo: 'Generative video, voice generation, automated content systems.',
    },
  },
  {
    projectId: 'PROJECT-2024-002',
    title: 'AI Creative System',
    description:
      'An experimental AI-powered creative workflow system designed as a Cold War aerospace control panel interface. Integrates multiple AI models for creative content generation.',
    dateRange: '2024-02 - 2024-04',
    status: 'active',
    techStack: ['react', 'nextjs', 'typescript', 'python', 'nodejs', 'ai', 'interactive'],
    tags: ['ai', 'interactive'],
    domain: 'AI/ML',
    problemSolved: 'Streamlined creative workflow by automating repetitive tasks and providing intelligent suggestions.',
    preview: {
      additionalInfo: 'Uses OpenAI, Anthropic, and custom fine-tuned models for content generation.',
    },
  },
  {
    projectId: 'PROJECT-2024-003',
    title: 'Unity Game Prototype',
    description:
      'A 3D puzzle game prototype built in Unity with custom shaders and procedural generation. Features innovative gameplay mechanics and stunning visuals.',
    dateRange: '2023-11 - 2024-01',
    status: 'deployed',
    techStack: ['unity', 'interactive'],
    tags: ['games', 'interactive'],
    domain: 'Game Development',
    problemSolved: 'Created engaging gameplay loop with procedurally generated levels for infinite replayability.',
    preview: {
      additionalInfo: 'Includes custom shader effects, particle systems, and dynamic lighting.',
    },
  },
  {
    projectId: 'PROJECT-2022-004',
    title: 'Hybrid Event Production System',
    description:
      'Produced hybrid events combining in-person experiences with remote streaming for global audiences. Managed corporate AGM productions and live-streamed events requiring real-time technical coordination.',
    dateRange: '2022-2025',
    status: 'active',
    techStack: ['video', 'premiere', 'interactive'],
    tags: ['video', 'interactive'],
    domain: 'Live Production',
    problemSolved: 'Enabled global audience participation through hybrid event production.',
    preview: {
      additionalInfo: 'Corporate AGMs, live-streamed events, multi-timezone coordination.',
    },
  },
  {
    projectId: 'PROJECT-2016-001',
    title: 'Viceland/A&E Networks Documentary Series',
    description:
      'Produced documentary video series spanning fashion industry events and outdoor sports activations. Managed all production logistics and creative delivery. Developed integrated video strategies for broadcast and digital distribution.',
    dateRange: '2016',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'documentary'],
    domain: 'Documentary Production',
    problemSolved: 'Successfully managed Louisiana tax incentive program for cost-effective production delivery.',
    preview: {
      additionalInfo: 'Fashion industry and outdoor sports content. Broadcast and digital distribution.',
    },
  },
  {
    projectId: 'PROJECT-2011-001',
    title: 'Times Square New Year\'s Eve Coverage',
    description:
      'Produced exclusive video content with complex permitting and celebrity coordination for Esquire/NBC Universal. Managed large-scale live event production in Times Square.',
    dateRange: '2011',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'broadcast'],
    domain: 'Live Production',
    problemSolved: 'Coordinated complex permitting and celebrity logistics for high-profile live event.',
    preview: {
      additionalInfo: 'Esquire/NBC Universal. Complex permitting and celebrity coordination.',
    },
  },
  {
    projectId: 'PROJECT-2011-002',
    title: 'NASA Partnership Content - National Geographic',
    description:
      'Directed video shoots requiring security clearances and technical expertise for National Geographic series. Worked with NASA on specialized content requiring access to restricted facilities.',
    dateRange: '2011',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'documentary'],
    domain: 'Documentary Production',
    problemSolved: 'Delivered high-security content meeting NASA and National Geographic standards.',
    preview: {
      additionalInfo: 'Required security clearances. NASA partnership. National Geographic series.',
    },
  },
  {
    projectId: 'PROJECT-2011-003',
    title: 'Early 4K Field Production - Animal Planet',
    description:
      'Managed early 4K field production workflows and digital delivery for Animal Planet series. Pioneered 4K production techniques in field environments.',
    dateRange: '2011',
    status: 'deployed',
    techStack: ['video', 'premiere'],
    tags: ['video', 'broadcast'],
    domain: 'Broadcast Production',
    problemSolved: 'Established 4K production workflows in field environments before industry standardization.',
    preview: {
      additionalInfo: 'Early 4K adoption. Field production workflows. Animal Planet series.',
    },
  },
  {
    projectId: 'PROJECT-2011-004',
    title: 'SyFy - "Town of the Living Dead"',
    description:
      'Managed horror series with multiple stunts and practical effects including fires, car crashes, and boat explosions. Coordinated complex safety protocols for high-risk production scenarios.',
    dateRange: '2011',
    status: 'deployed',
    techStack: ['video', 'premiere', 'aftereffects'],
    tags: ['video', 'broadcast'],
    domain: 'Broadcast Production',
    problemSolved: 'Safely executed complex stunts and practical effects while maintaining production schedule.',
    preview: {
      additionalInfo: 'Multiple stunts: fires, car crashes, boat explosions. Complex safety protocols.',
    },
  },
];

