/**
 * News Ticker Messages
 * Extracted from docs/tickerContent.md
 * Messages are displayed in a continuous scrolling loop with social icons as separators
 */

// Extract individual messages from tickerContent.md (split by • and cleaned)
export const newsTickerMessages = [
  // From Ticker Set A - Keywords only
  "VIDEO PRODUCTION SYSTEMS",
  "POST-PRODUCTION PIPELINE",
  "BRANDED CONTENT STUDIO",
  "CREATIVE OPERATIONS",
  "CONTENT OPERATIONS",
  "PRODUCTION WORKFLOW AUTOMATION",
  "AI WORKFLOW AUTOMATION",
  "N8N AUTOMATIONS",
  "CLAUDE WORKFLOWS",
  "PRODUCTION SCHEDULING AUTOMATION",
  "BUDGET TRACKING SYSTEMS",
  "APPROVAL WORKFLOWS",
  "ASSET MANAGEMENT PIPELINE",
  "INTERACTIVE EXPERIENCES",
  "FULL-STACK WEB APPLICATIONS",
  
  // From Ticker Set B - Keyword + short sentence
  "PRODUCTION SYSTEMS THAT SCALE",
  "BUILD A REPEATABLE POST PIPELINE",
  "SHIP BRANDED CONTENT FASTER",
  "AUTOMATE SCHEDULING AND APPROVALS",
  "TIGHTEN BUDGETS AND HANDOFFS",
  "REDUCE OPERATIONAL DRAG",
  "KEEP CRAFT HIGH, MOVE FASTER",
  "AI WORKFLOWS FOR CONTENT TEAMS",
  "N8N AUTOMATIONS FOR PRODUCTION OPS",
  "CLAUDE-ASSISTED PRODUCTION PLANNING",
  "INTERACTIVE CONTENT + WEB BUILDS",
  
  // From Ticker Set C - Service-led
  "VIDEO PRODUCTION + POST SYSTEMS",
  "BRANDED STORYTELLING PRODUCTION",
  "AI WORKFLOW AUTOMATION",
  "CREATIVE OPS SYSTEMS",
  "CONTENT OPS AUTOMATION",
  "SCHEDULING + BUDGETS + APPROVALS",
  "ASSET FLOW + DELIVERY PIPELINES",
  "INTERACTIVE EXPERIENCES",
  "FULL-STACK APPLICATIONS",
  "MODERN PRODUCTION STUDIO",
  
  // From Ticker Set D - Search phrase style
  "PRODUCTION WORKFLOW AUTOMATION FOR VIDEO TEAMS",
  "POST-PRODUCTION PIPELINE SETUP",
  "CREATIVE OPERATIONS FOR BRANDED CONTENT",
  "AI AUTOMATION FOR CONTENT PRODUCTION",
  "N8N WORKFLOW AUTOMATION FOR CREATIVES",
  "CLAUDE WORKFLOW TEMPLATES FOR TEAMS",
  "SCHEDULING AND BUDGET TRACKING FOR PRODUCTION",
  "APPROVAL AND ASSET DELIVERY SYSTEMS",
  "INTERACTIVE WEB EXPERIENCES STUDIO",
  
  // From Ticker Set E - Short CTA prompts
  "NEED A PRODUCTION PIPELINE?",
  "WANT FEWER HANDOFF HEADACHES?",
  "AUTOMATE SCHEDULING AND BUDGETS",
  "BUILD A POST SYSTEM THAT SCALES",
  "TURN CHAOS INTO A WORKFLOW",
  "SHIP CONSISTENTLY, KEEP CRAFT",
  "MAKE CONTENT OPS INVISIBLE",
  "MOVE FASTER WITHOUT BURNOUT",
  
  // From Sleek agency ticker
  "MODERN BRANDED CONTENT",
  "EDITORIAL CRAFT + PRODUCTION RIGOR",
  "CAMPAIGN-READY VIDEO SYSTEMS",
  "POST-PRODUCTION THAT SCALES",
  "CREATIVE OPERATIONS FOR FAST TEAMS",
  "SMOOTHER APPROVALS",
  "CLEANER HANDOFFS",
  "RELIABLE DELIVERY",
  "STORY-FIRST STRATEGY",
  "TALENT DIRECTION + ON-SET LEADERSHIP",
  "INTERACTIVE BRAND EXPERIENCES",
  "FULL-STACK MICROSITES",
  "AI-ASSISTED PRODUCTION WORKFLOWS",
  "N8N AUTOMATIONS",
  "CLAUDE-ENABLED PLANNING",
  "FROM CONCEPT TO CUT TO LAUNCH",
  
  // From Technical studio ticker
  "RAG AGENTS",
  "PRODUCTION PIPELINE ARCHITECTURE",
  "POST-PRODUCTION WORKFLOW DESIGN",
  "CONTENT OPERATIONS AUTOMATION",
  "SCHEDULING + RESOURCING SYSTEMS",
  "BUDGET TRACKING + COST REPORTING",
  "APPROVAL STATE MACHINES",
  "ASSET NAMING CONVENTIONS + FOLDER SCHEMAS",
  "VERSIONING + DELIVERY AUTOMATION",
  "SOPS + DOCUMENTATION",
  "N8N ORCHESTRATIONS",
  "CLAUDE PROMPT OPS + CONTEXT ENGINEERING",
  "CUSTOM SCRIPTS + INTEGRATIONS",
  "WEB APPS FOR PRODUCTION TEAMS",
  "REPEATABLE, TESTABLE, SCALABLE WORKFLOWS",
  "FROM INTAKE TO DELIVERY, INSTRUMENTED AND RELIABLE",
];

/**
 * Social Media Links Configuration
 * Update URLs when channel details are provided
 */
export interface SocialLink {
  name: string;
  icon: string; // Text representation for monospace aesthetic
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'X (Twitter)',
    icon: '[X]',
    url: 'https://x.com/CreateContextSt',
  },
  {
    name: 'Instagram',
    icon: '[IG]',
    url: 'https://www.instagram.com/creativecontext.studio/',
  },
  {
    name: 'Threads',
    icon: '[TH]',
    url: '#', // Placeholder - update when social media URLs are available
  },
  {
    name: 'LinkedIn',
    icon: '[IN]',
    url: '#', // Placeholder - update when social media URLs are available
  },
  {
    name: 'YouTube',
    icon: '[YT]',
    url: '#', // Placeholder - update when social media URLs are available
  },
  {
    name: 'Substack',
    icon: '[SUB]',
    url: 'https://creativecontextstudio.substack.com/subscribe',
  },
];
