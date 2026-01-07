export interface ResumeItem {
  title: string;
  period: string;
  subtitle?: string;
  description: string;
  location?: string;
  achievements?: string[];
}

export interface ResumeData {
  workHistory: ResumeItem[];
  education: ResumeItem[];
  certifications: ResumeItem[];
  competencies?: ResumeItem[];
  pdfUrl?: string;
  agentInfo?: {
    name: string;
    operationalStatus: string;
  };
}

export const resumeData: ResumeData = {
  agentInfo: {
    name: 'JAMES McKAY',
    operationalStatus: 'REMOTE-FIRST / GLOBAL OPERATIONS',
  },
  workHistory: [
    {
      title: 'PRODUCER & CREATIVE DIRECTOR',
      period: 'JUNE 2009 - PRESENT',
      subtitle: 'CREATIVE CONTEXT STUDIO',
      location: 'ATLANTA, GA & BROOKLYN, NY | REMOTE-FIRST',
      description:
        'Concepted, produced, and delivered video projects spanning brand campaigns, documentary content, narrative film, and emerging media for Fortune 500 clients, major networks, and independent productions. Managed teams across 6 continents while maintaining consistent creative vision and operational excellence. Built production systems from scratch, including workflows for video production, post-production, and emerging AI-integrated content creation.',
      achievements: [
        'IBM Cyber Security Campaign (2018): Directed branded video content requiring security clearances. Campaign exceeded engagement targets by 40% and secured additional contract work.',
        'netuser (2020): Wrote, produced, and directed narrative feature film starring Denis O\'Hare. Achieved Best Film award at LGBT Los Angeles Film Festival.',
        'Performance Video Testing System: Built framework enabling rapid creative testing of ad variations, reducing iteration cycles by 60% while improving campaign performance metrics.',
        'Distributed Production Network: Established remote production capabilities enabling content creation from anywhere on Earth using remote tools and platforms.',
        'Managed distributed teams across 6 continents, coordinating complex shoots in diverse environments and time zones.',
        'Pioneered integration of AI production tools into operational workflows using generative video, voice generation, and automated systems.',
      ],
    },
    {
      title: 'PRODUCER & STORYTELLER',
      period: 'AUGUST 2022 - JUNE 2025',
      subtitle: 'RF STUDIO53',
      location: 'NEW YORK, NY',
      description:
        'Agency producer specializing in strategic video production and client accounts for Fortune 500 brands across finance, private equity, healthcare, pharma, tech, luxury, and aviation sectors. Produced end-to-end production from creative concepting through delivery while managing relationships across executive leadership, creative teams, and technical partners. Pioneered integration of emerging technologies—including AI brand ambassadors, VR/XR/AR experiences, and generative content tools—into traditional agency workflows.',
      achievements: [
        'Built immersive brand experiences integrating virtual production technologies, creating interactive experiences with games, VR/XR/AR, and AI brand ambassadors.',
        'Managed corporate AGM productions and live-streamed events requiring real-time technical coordination and stakeholder management.',
        'Produced hybrid events combining in-person experiences with remote streaming for global audiences across multiple time zones.',
        'Trained distributed production teams on emerging technology workflows and best practices.',
        'Served as primary client contact for agency accounts, translating business objectives into compelling creative strategies.',
      ],
    },
    {
      title: 'PRODUCTION MANAGER',
      period: '2022',
      subtitle: 'THE CW NETWORK - "WOULD I LIE TO YOU?"',
      location: 'STUDIO PRODUCTION',
      description:
        'Managed 13-episode studio production with 45+ team members, delivering 6.5 hours of broadcast television to network standards on a compressed 10-day production timeline. Coordinated multi-camera studio shoots with A-list talent, managing technical crews, creative workflows, and equipment logistics.',
      achievements: [
        'Successfully maintained budget discipline while delivering episodes within scope and schedule, resulting in network renewal for additional seasons.',
        'Served as primary liaison with network executives on creative vision, brand standards, and deliverables.',
        'Coordinated multi-camera studio shoots with A-list talent and technical crews.',
      ],
    },
    {
      title: 'PRODUCTION SUPERVISOR',
      period: '2020',
      subtitle: 'TRAVEL CHANNEL - "RIPLEY\'S BELIEVE IT OR NOT!"',
      location: 'GLOBAL PRODUCTION',
      description:
        'Supervised remote video production across 25+ cities spanning 6 continents, coordinating 100+ person distributed teams to deliver 60+ high-quality video segments for internationally distributed series. Developed standardized production protocols ensuring consistent video quality, brand standards, and creative vision across geographically diverse shooting environments.',
      achievements: [
        'Zero safety incidents across 25+ international locations while maintaining on-time delivery and broadcast quality standards.',
        'Conducted comprehensive risk assessments for high-production-value stunts and extreme filming scenarios.',
        'Optimized video content for multiple broadcast standards and international markets.',
        'Coordinated 100+ person distributed teams across 6 continents.',
      ],
    },
    {
      title: 'PRODUCER',
      period: '2019',
      subtitle: 'ADIDAS/CHAMPS - BRAND DOCUMENTARY & COMMERCIAL',
      location: 'BRAND CAMPAIGN',
      description:
        'Conceived, produced, and directed 15-minute branded documentary campaign featuring A-list sports and entertainment talent. Developed creative concept from initial brief through detailed storyboards, translating brand objectives into compelling narrative structure. Directed on-set production including talent coordination, camera work, lighting, and B-roll capture across multiple shoot locations.',
      achievements: [
        'Personally edited final deliverables for multiple formats—broadcast, digital, and social platforms—each optimized for platform-specific viewing patterns.',
        'Delivered finished campaign on-time and on-budget despite complex logistics including international talent and location coordination.',
        'Directed on-set production including talent coordination, camera work, lighting, and B-roll capture.',
      ],
    },
    {
      title: 'LINE PRODUCER',
      period: '2016',
      subtitle: 'VICELAND/A&E NETWORKS',
      location: 'DOCUMENTARY SERIES',
      description:
        'Produced documentary video series spanning fashion industry events and outdoor sports activations, managing all production logistics and creative delivery. Coordinated field video production with comprehensive production oversight. Developed integrated video strategies for broadcast and digital distribution.',
      achievements: [
        'Successfully managed Louisiana tax incentive program for cost-effective production delivery.',
        'Coordinated field video production across multiple locations.',
        'Developed integrated video strategies for broadcast and digital distribution.',
      ],
    },
    {
      title: 'LINE PRODUCER',
      period: '2015-2016',
      subtitle: 'DISCOVERY ID - "SHADOW OF DOUBT"',
      location: 'TRUE CRIME SERIES',
      description:
        'Produced true crime video series across multiple cities, managing sensitive content requiring careful creative direction and stakeholder coordination. Directed recreation video shoots coordinated with law enforcement and family representatives. Managed video production workflows ensuring brand consistency and broadcast compliance.',
      achievements: [
        'Delivered 6 x 60-minute episodes requiring complex multi-location video coordination.',
        'Directed recreation video shoots coordinated with law enforcement and family representatives.',
        'Managed sensitive content requiring careful creative direction and stakeholder coordination.',
      ],
    },
    {
      title: 'PRODUCTION MANAGER/COORDINATOR',
      period: '2005-2015',
      subtitle: 'MAJOR STUDIO & NETWORK PRODUCTIONS',
      location: 'MTV, NATIONAL GEOGRAPHIC, ANIMAL PLANET, SYFY, FOOD NETWORK',
      description:
        'Produced and coordinated video content across multiple network series, managing large crews and complex production logistics. Worked on diverse projects including Times Square New Year\'s Eve coverage, NASA partnership content requiring security clearances, and early 4K field production workflows.',
      achievements: [
        'Times Square New Year\'s Eve (Lucky Bastards - Esquire/NBC Universal): Produced exclusive video content with complex permitting and celebrity coordination.',
        'NASA Partnership Content (Going Deep with David Rees - National Geographic): Directed video shoots requiring security clearances and technical expertise.',
        '4K Early Adoption (Too Cute - Animal Planet): Managed early 4K field production workflows and digital delivery.',
        'Town of the Living Dead (SyFy): Managed horror series with multiple stunts and practical effects including fires, car crashes, and boat explosions.',
      ],
    },
    {
      title: 'PRODUCTION SECRETARY & BACKGROUND CASTING',
      period: '2005-2011',
      subtitle: 'WALT DISNEY PICTURES/WARNER BROS',
      location: 'MAJOR STUDIO FEATURES',
      description:
        'Coordinated production logistics for major studio features, managing communications for 600+ crew members across 3 Bahamian islands and supporting all phases of video production. Coordinated and cast background talent for Metropolis and Smallville locations.',
      achievements: [
        'Pirates of the Caribbean II & III: Coordinated production logistics for 600+ crew members across 3 Bahamian islands.',
        'Superman: Man of Steel: Coordinated and cast background talent for Metropolis and Smallville locations.',
      ],
    },
    {
      title: 'PRODUCTION MANAGER/SUPERVISOR',
      period: '2007-2011',
      subtitle: 'ADDITIONAL FEATURE FILM & WEB PRODUCTION',
      location: 'INDEPENDENT & STUDIO PRODUCTIONS',
      description:
        'Managed production logistics and creative delivery across diverse projects including US/Mexico co-productions with tax credit management, period films with complex stunts, and web series for Crackle/Sony Pictures Television. Executed JP Morgan Chase whiteboard animation campaign and produced Condé Nast culinary video content.',
      achievements: [
        'Mariachi Gringo (US/Mexico co-production): Managed tax credit management and international production coordination.',
        'Crackle/Sony Pictures Television: Executed 10-episode web series.',
        'JP Morgan Chase: Directed whiteboard animation campaign.',
        'Condé Nast: Produced culinary video content.',
      ],
    },
  ],
  education: [
    {
      title: 'THEATRICAL PRODUCTION & PERFORMANCE',
      period: '1996-2005',
      subtitle: 'ABOUT FACE THEATRE, PUSHPUSH THEATER',
      location: 'CHICAGO, IL',
      description:
        'Artistic Associate & Performer contributing to theatrical production and artistic development across multiple theatrical productions. Foundation in live performance, narrative storytelling, and creative collaboration.',
      achievements: [
        'Developed expertise in narrative storytelling and live performance.',
        'Contributed to artistic development across multiple theatrical productions.',
      ],
    },
  ],
  certifications: [
    {
      title: '18+ YEARS TRADITIONAL, BRAND, & BROADCAST EXPERIENCE',
      period: '2005-PRESENT',
      subtitle: 'NETWORK TELEVISION, FORTUNE 500 CAMPAIGNS, FILM',
      description:
        'Comprehensive experience across network television, Fortune 500 campaigns, and independent film production.',
    },
    {
      title: 'DISTRIBUTED TEAM MANAGEMENT',
      period: 'CONTINUOUS',
      subtitle: '6+ CONTINENTS',
      description:
        'Proven capability managing production teams and coordinating shoots across 6 continents simultaneously.',
    },
    {
      title: 'EMERGING TECHNOLOGY INTEGRATION',
      period: '2020-PRESENT',
      subtitle: 'AI, VR/XR/AR, GENERATIVE CONTENT',
      description:
        'Pioneered integration of AI production tools, virtual production technologies, and generative content systems into operational workflows.',
    },
  ],
  competencies: [
    {
      title: 'STRATEGIC PRODUCTION & CREATIVE LEADERSHIP',
      period: 'CORE COMPETENCY',
      subtitle: 'CREATIVE PRODUCING & CONCEPTING',
      description:
        'Creative Producing & Concepting | Narrative Storytelling & Documentary Development | Performance Video & Campaign Optimization | Multi-Platform Content Strategy | Talent Direction & On-Set Leadership | Writing & Storytelling | Creative Feedback & Team Development',
    },
    {
      title: 'PRODUCTION OPERATIONS & LINE PRODUCING',
      period: 'CORE COMPETENCY',
      subtitle: 'BUDGET MANAGEMENT & COST OPTIMIZATION',
      description:
        'Budget Management & Cost Optimization | Distributed Team Management (6+ continents) | Workflow Automation & Efficiency Systems | Production Scheduling & Resource Allocation | Technical Crew Coordination | Legal, Risk Assessment & Problem Solving | Stakeholder Communication & Client Relations',
    },
    {
      title: 'TECHNICAL PRODUCTION EXCELLENCE',
      period: 'CORE COMPETENCY',
      subtitle: 'ADOBE CREATIVE SUITE & PRODUCTION TOOLS',
      description:
        'Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator) | DaVinci Resolve | Multi-Camera Direction | Live Streaming & Hybrid Event Production | Motion Graphics & Animation | Sound Design | Virtual Production (Unreal Engine 5, Unity)',
    },
    {
      title: 'EMERGING TECHNOLOGY & AI INTEGRATION',
      period: 'CORE COMPETENCY',
      subtitle: 'CONTEXT ENGINEERING & AUTOMATED SYSTEMS',
      description:
        'Context Engineering & Prompt Development | Agentic Workflows & Automated Systems | Generative Video Tools (ElevenLabs, HeyGen, AI video generation) | AI-Powered Post-Production | Creative Optimization | Real-Time Rendering & Motion Capture',
    },
  ],
  pdfUrl: '/McKayResumeComplete2025.pdf', // Update with actual PDF path
};
