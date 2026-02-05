export interface FeatureCategory {
  name: string;
  features: string[];
}

export interface StudioLabProject {
  id: string;
  name: string;
  shortCode: string;
  status: string;
  description: string;
  fullDescription: string;
  featureCategories: FeatureCategory[];
  tags: string[];
  techStack?: string[];
  routes?: string[];
}

export const studioLabProjects: Record<string, StudioLabProject> = {
  contentCreator: {
    id: 'contentCreator',
    name: 'contentCreator',
    shortCode: 'CC',
    status: 'IN DEV',
    description:
      'Professional social media content creation app with broadcast-quality GFX overlays, 25+ themes, 50+ animation presets, and batch export for images and video.',
    fullDescription:
      'A comprehensive content creation platform designed for social media professionals and creators. Built to streamline the production of high-quality visual content with broadcast-grade graphics overlays, extensive theming options, and powerful batch export capabilities. The app bridges the gap between professional video production tools and accessible content creation.',
    featureCategories: [
      {
        name: 'Output Formats',
        features: [
          'High-resolution image export (PNG, JPG, WebP)',
          'Video export with hardware acceleration',
          'Animated GIF creation with optimization',
          'Platform-specific aspect ratios (Stories, Reels, Feed)',
          'Batch processing for multi-platform delivery',
        ],
      },
      {
        name: 'Broadcast GFX',
        features: [
          'Lower thirds with customizable animations',
          'Title cards and bumpers',
          'Animated overlays and frames',
          'Real-time preview with accurate timing',
          'Professional motion graphics templates',
        ],
      },
      {
        name: 'Styling',
        features: [
          '25+ professional themes',
          'Custom color palette support',
          'Typography system with 50+ font pairings',
          'Gradient and texture backgrounds',
          'Brand kit integration',
        ],
      },
      {
        name: 'Libraries',
        features: [
          '50+ animation presets',
          'Curated stock asset integration',
          'Custom asset upload and management',
          'Template library with categories',
          'Recent projects quick access',
        ],
      },
      {
        name: 'Export',
        features: [
          'One-click multi-platform export',
          'Quality presets (Web, Print, Broadcast)',
          'Filename templating system',
          'Export queue management',
          'Cloud sync for project backup',
        ],
      },
    ],
    tags: ['CONTENT', 'GFX', 'VIDEO', 'THEMES'],
    routes: [
      '/create - Main editor workspace',
      '/templates - Browse and select templates',
      '/library - Asset and project library',
      '/export - Export queue and settings',
      '/settings - App preferences and brand kits',
    ],
  },
  contentManagement: {
    id: 'contentManagement',
    name: 'contentManagement',
    shortCode: 'CM',
    status: '~40-55%',
    description:
      'AI-powered production management platform with multi-brand support, episode lifecycle tracking, Claude-generated guides, and real-time collaboration.',
    fullDescription:
      'An intelligent production management system designed for content teams managing multiple brands and shows. Leverages Claude AI to generate production guides, automate documentation, and provide contextual assistance throughout the episode lifecycle. Built for real-time collaboration with role-based access control.',
    featureCategories: [
      {
        name: 'Brand Management',
        features: [
          'Multi-brand workspace organization',
          'Brand-specific style guides and assets',
          'Cross-brand asset sharing with permissions',
          'Brand performance analytics dashboard',
          'Custom branding for client portals',
        ],
      },
      {
        name: 'Episode Lifecycle',
        features: [
          'Pre-production planning tools',
          'Production day tracking and logging',
          'Post-production workflow management',
          'Review and approval workflows',
          'Archive and versioning system',
        ],
      },
      {
        name: 'AI Intelligence',
        features: [
          'Claude-generated production guides',
          'Automated documentation from notes',
          'Smart scheduling suggestions',
          'Content analysis and tagging',
          'Natural language search across projects',
        ],
      },
      {
        name: 'Collaboration',
        features: [
          'Real-time editing and comments',
          'Role-based access control (RBAC)',
          'Task assignment and tracking',
          'Notification system with preferences',
          '@mentions and threaded discussions',
        ],
      },
    ],
    tags: ['AI', 'PRODUCTION', 'COLLABORATION'],
    techStack: [
      'Next.js 15 with App Router',
      'TypeScript for type safety',
      'Tailwind CSS for styling',
      'Supabase for database and auth',
      'Claude API for AI features',
      'React Query for data management',
    ],
  },
};
