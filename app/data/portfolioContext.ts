/**
 * Portfolio Context for AI Chatbot
 * Contains Creative Context Studio information for context-based responses
 */

import { projects } from './projects';

// Format projects for context
function formatProjectsForContext(): string {
  return projects
    .map((project) => {
      const status = project.status === 'active' ? 'Active' : project.status === 'deployed' ? 'Completed' : 'In Development';
      const techStack = project.techStack.join(', ');
      const tags = project.tags ? ` | Tags: ${project.tags.join(', ')}` : '';
      const problem = project.problemSolved ? ` | Problem Solved: ${project.problemSolved}` : '';
      const link = project.link ? ` | Link: ${project.link}` : '';
      
      return `${project.title} (${project.dateRange}) [${status}]
${project.description}
Domain: ${project.domain || 'N/A'} | Tech: ${techStack}${tags}${problem}${link}`;
    })
    .join('\n\n');
}

export const PORTFOLIO_CONTEXT = `
CREATIVE CONTEXT STUDIO
Video Creative Leader & Production Systems Strategist
Remote | Atlanta | Brooklyn | NYC | Los Angeles | Rotterdam | Cologne | Buenos Aires | Montevideo
hiya@creativecontext.studio

LEADERSHIP
James McKay serves as CEO and President of Creative Context Studio, leading the company's strategic vision and operations.

COMPANY OVERVIEW
Creative Context Studio builds production systems that work at any scale, from boutique creative direction to distributed teams producing 100+ assets weekly. We combine 18+ years of traditional, brand, and broadcast experience (network television, Fortune 500 campaigns, film) with hands-on expertise in physical production with teams and crews all over the globe. Our expertise includes concepting narrative content, optimizing video, directing talent, solving technical problems, and building automated operations and content systems. We are equally comfortable with generative AI tools, context engineering, and agentic workflows. Creative Context Studio works remotely from anywhere on projects anywhere.

CORE COMPETENCIES
Strategic Production & Creative Leadership: Creative Producing & Concepting | Narrative Storytelling & Documentary Development | Performance Video & Campaign Optimization | Multi-Platform Content Strategy | Talent Direction & On-Set Leadership | Writing & Storytelling | Creative Feedback & Team Development

Production Operations & Line Producing: Budget Management & Cost Optimization | Distributed Team Management (6+ continents) | Workflow Automation & Efficiency Systems | Production Scheduling & Resource Allocation | Technical Crew Coordination | Legal, Risk Assessment & Problem Solving | Stakeholder Communication & Client Relations

Technical Production Excellence: Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator) | DaVinci Resolve | Multi-Camera Direction | Live Streaming & Hybrid Event Production | Motion Graphics & Animation | Sound Design | Virtual Production (Unreal Engine 5, Unity)

Emerging Technology & AI Integration: Context Engineering & Prompt Development | Agentic Workflows & Automated Systems | Generative Video Tools (ElevenLabs, HeyGen, AI video generation) | AI-Powered Post-Production | Creative Optimization | Real-Time Rendering & Motion Capture

TECHNICAL SKILLS
Video Production & Editing: Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator) | DaVinci Resolve | Avid | FCP | CapCut
Motion, VFX & Animation: Motion Graphics | 3D Animation | Visual Effects | Compositing | Title Design | Dynamic Graphics
AI & Generative Tools: ChatGPT & Claude (prompt engineering, automation) | MCPs & custom AI workflows | ElevenLabs (voice generation, AI audio production) | HeyGen (AI video generation, synthetic talent) | Generative video tools | Automated content systems
Emerging Technology: Unreal Engine 5 | Unity | Virtual Production | Motion Capture | Real-Time Rendering | Live Streaming Solutions
Project Management & Operations: Microsoft 365 | Google Workspace | Airtable | Notion | Budget tracking systems | Production tracking systems | Analytics
Platform Expertise: Broadcast Television | Film | YouTube | TikTok | Instagram | Facebook | LinkedIn | Programmatic Video | Emerging platforms

CREATIVE CONTEXT STUDIO EXPERIENCE & CAPABILITIES
Founded 2009 | Atlanta, GA & Brooklyn, NY | Present
Creative Context Studio has concepted, produced, and delivered video projects spanning brand campaigns, documentary content, narrative film, and emerging media for Fortune 500 clients (IBM, Adidas, JP Morgan Chase), major networks, and independent productions. We have managed teams across 6 continents while maintaining consistent creative vision and operational excellence. Creative Context Studio has built production systems from scratch, including workflows for video production, post-production, and emerging AI-integrated content creation.

Creative Direction & Strategic Production: Creative Context Studio has directed documentary-style branded content, performance video campaigns, and narrative work requiring creative vision, talent direction, and executive-level client communication. We have developed platform-specific creative strategies for performance video optimization across YouTube, social media, and programmatic channels. Our team executes all phases of production from concept through final delivery, including camera work, lighting, sound, directing talent, and editing. Creative Context Studio has built creative testing frameworks that improved campaign performance through iterative optimization and data-driven decision making.

Production Operations & Scaling: Creative Context Studio has established production workflows enabling rapid content creation across multiple simultaneous campaigns while maintaining quality standards. We have managed distributed teams across 6 continents, coordinating complex shoots in diverse environments and time zones. Our expertise in budget management and resource allocation ensures we consistently deliver projects on time and within budget constraints. Creative Context Studio has pioneered integration of AI production tools into operational workflows using generative video, voice generation, and automated systems to solve real production challenges and increase output without proportional cost increase.

Notable Projects & Achievements: IBM Cyber Security Campaign (2018): Creative Context Studio directed branded video content requiring security clearances, coordinated press coverage for nationwide campaign activation. Campaign exceeded engagement targets by 40% and secured additional contract work. netuser (2020): Creative Context Studio wrote, produced, and directed narrative feature film starring Denis O'Hare. Achieved Best Film award at LGBT Los Angeles Film Festival, demonstrating independent creative vision and narrative storytelling mastery. Performance Video Testing System: Creative Context Studio built framework enabling rapid creative testing of ad variations, identifying high-performing hooks and optimization strategies. Reduced iteration cycles by 60% while improving campaign performance metrics. Distributed Production Network: Creative Context Studio established remote production capabilities enabling content creation from anywhere on Earth using remote tools and platforms. We maintain consistent creative quality and brand standards across simultaneous shoots globally.

ADDITIONAL CREATIVE CONTEXT STUDIO CAPABILITIES
Agency Production Services | 2022 - 2025
Creative Context Studio has specialized in strategic video production and client accounts for Fortune 500 brands across finance, private equity, healthcare, pharma, tech, luxury, and aviation sectors. We have produced end-to-end production from creative concepting through delivery while managing relationships across executive leadership, creative teams, and technical partners. Creative Context Studio has pioneered integration of emerging technologies—including AI brand ambassadors, VR/XR/AR experiences, and generative content tools—into traditional agency workflows.

Video Production & Creative Leadership: Creative Context Studio has produced multi-format video content including corporate showcases, AGM presentations, executive communications, and brand campaigns for leading global companies. We have led line producing, production management, and post-production across client deliverables. Our team executes hands-on production and editing work—while simultaneously managing creative teams through complex production cycles. Creative Context Studio has developed streamlined workflows enabling rapid turnaround on client deliverables without compromising creative quality or team wellbeing.

Emerging Technology & AI Integration: Creative Context Studio has built immersive brand experiences integrating virtual production technologies, creating interactive experiences with games, VR/XR/AR, and AI brand ambassadors. We have designed and implemented AI-powered content strategies combining generative tools with traditional creative direction. Creative Context Studio has experimented with AI video generation, synthetic talent, and automated workflows to expand capabilities and explore new client service offerings. We have trained distributed production teams on emerging technology workflows and best practices.

Live Events & Remote Production: Creative Context Studio has managed corporate AGM productions and live-streamed events requiring real-time technical coordination and stakeholder management. We have produced hybrid events combining in-person experiences with remote streaming for global audiences. Creative Context Studio has coordinated multi-location broadcasts ensuring seamless delivery across time zones and technical platforms.

Client Account Management: Creative Context Studio serves as primary client contact, translating business objectives into compelling creative strategies. We have built and maintained relationships across executive leadership, marketing teams, creative partners, and technical specialists. Creative Context Studio has delivered integrated campaigns spanning video, websites, live events, and emerging technology experiences.

Notable Agency Work: Corporate AGM videos and live streams for finance and private equity clients requiring precision broadcast quality and real-time coordination. Gamified brand campaigns for luxury and aviation sectors leveraging interactive technology and emerging platforms. Healthcare and pharma educational content requiring regulatory compliance, scientific accuracy, and sophisticated visual communication. Tech sector product launches and executive communications for companies spanning AI, cloud, and enterprise software.

BROADCAST & NETWORK PRODUCTION EXPERIENCE
The CW Network | Studio Production | "Would I Lie To You?" | 2022
Creative Context Studio managed 13-episode studio production with 45+ team members, delivering 6.5 hours of broadcast television to network standards on a compressed 10-day production timeline. We coordinated multi-camera studio shoots with A-list talent, managing technical crews, creative workflows, and equipment logistics. Creative Context Studio served as primary liaison with network executives on creative vision, brand standards, and deliverables. We successfully maintained budget discipline while delivering episodes within scope and schedule, resulting in network renewal for additional seasons.

Travel Channel | Global Production | "Ripley's Believe It or Not!" | 2020
Creative Context Studio supervised remote video production across 25+ cities spanning 6 continents, coordinating 100+ person distributed teams to deliver 60+ high-quality video segments for internationally distributed series. We developed standardized production protocols ensuring consistent video quality, brand standards, and creative vision across geographically diverse shooting environments. Creative Context Studio conducted comprehensive risk assessments for high-production-value stunts and extreme filming scenarios, enabling safe execution of complex sequences. We optimized video content for multiple broadcast standards and international markets, addressing cultural considerations and platform-specific requirements. Result: Zero safety incidents across 25+ international locations while maintaining on-time delivery and broadcast quality standards.

Adidas/Champs | Brand Campaign | Brand Documentary & Commercial | 2019
Creative Context Studio conceived, produced, and directed 15-minute branded documentary campaign featuring A-list sports and entertainment talent. We developed creative concept from initial brief through detailed storyboards, translating brand objectives into compelling narrative structure. Creative Context Studio directed on-set production including talent coordination, camera work, lighting, and B-roll capture across multiple shoot locations. Our team edited final deliverables for multiple formats—broadcast, digital, and social platforms—each optimized for platform-specific viewing patterns and engagement strategies. Creative Context Studio delivered finished campaign on-time and on-budget despite complex logistics including international talent, location coordination, and multi-format deliverables.

ADDITIONAL BROADCAST & NETWORK EXPERIENCE
Viceland/A&E Networks | "States of Undress S.2" & "Country Buck$ S.2" | 2016
Creative Context Studio produced documentary video series spanning fashion industry events and outdoor sports activations, managing all production logistics and creative delivery. We coordinated field video production with comprehensive production oversight. Creative Context Studio developed integrated video strategies for broadcast and digital distribution. We successfully managed Louisiana tax incentive program for cost-effective production delivery.

Discovery ID/Stephen David Entertainment | "Shadow of Doubt" | 2015-2016
Creative Context Studio produced true crime video series across multiple cities, managing sensitive content requiring careful creative direction and stakeholder coordination. We directed recreation video shoots coordinated with law enforcement and family representatives. Creative Context Studio managed video production workflows ensuring brand consistency and broadcast compliance. We delivered 6 x 60-minute episodes requiring complex multi-location video coordination.

Major Studio & Network Productions | 2005-2015 | MTV, National Geographic, Animal Planet, SyFy, Food Network
Creative Context Studio has produced and coordinated video content across multiple network series, managing large crews and complex production logistics. Notable Video Projects: Times Square New Year's Eve (Lucky Bastards - Esquire/NBC Universal): Creative Context Studio produced exclusive video content with complex permitting and celebrity coordination. NASA Partnership Content (Going Deep with David Rees - National Geographic): We directed video shoots requiring security clearances and technical expertise. Manhattan Street Production (Dinner Impossible - Food Network): Creative Context Studio coordinated 44th Street closure for live video production. VIP Celebrity Content (Born Hip Hop - MTV): We produced high-end lifestyle video in Los Angeles and NYC. 4K Early Adoption (Too Cute - Animal Planet): Creative Context Studio managed early 4K field production workflows and digital delivery. Town of the Living Dead (SyFy): We managed horror series with multiple stunts and practical effects including fires, car crashes, and boat explosions. Elder Skelter (Discovery ID): Creative Context Studio produced true crime series with comedic elements. The Crick (Discovery): We coordinated investigative content with law enforcement and religious compound access.

Walt Disney Pictures/Warner Bros | Pirates of the Caribbean II & III, Superman: Man of Steel | 2005-2011
Creative Context Studio coordinated production logistics for major studio features, managing communications for 600+ crew members across 3 Bahamian islands and supporting all phases of video production. We coordinated and cast background talent for Metropolis and Smallville.

Additional Feature Film & Web Production | 2007-2011 | Various independent and studio productions
Creative Context Studio has managed production logistics and creative delivery across diverse projects including Mariachi Gringo (US/Mexico co-production with tax credit management), Higher Ground (period film with complex stunts), We are the Hartmans (controlled practical effects), Were the World Mine (indie musical), Peter and Vandy (NYC location management), Death in Love (independent feature), and Behind the Star (10-episode web series). Creative Context Studio executed 10-episode web series for Crackle/Sony Pictures Television, directed JP Morgan Chase whiteboard animation campaign, and produced Condé Nast culinary video content.

CREATIVE CONTEXT STUDIO PORTFOLIO HIGHLIGHTS & RANGE
Broadcast & Network Production: Creative Context Studio has worked with Travel Channel ("Ripley's Believe It or Not!"), Discovery ID ("Shadow of Doubt"), The CW ("Would I Lie To You?"), A&E Networks, MTV, National Geographic, SyFy, Animal Planet, Food Network
Brand & Performance Video: Creative Context Studio has delivered work for IBM, Adidas, JP Morgan Chase, Complex, and 50+ additional Fortune 500 and mid-market brands
Narrative & Independent Film: Creative Context Studio produced "netuser" (award-winning feature film, Best Film LGBT Los Angeles Film Festival)
Interactive & Emerging Technology: Creative Context Studio creates virtual production experiences, VR/XR/AR brand installations, AI-integrated campaigns, gamified brand activations
Live Events & Remote Production: Creative Context Studio produces corporate AGMs, live-streamed events, hybrid global broadcasts across multiple time zones
Production Scale & Achievement: Creative Context Studio has delivered 60+ international video segments across 25+ cities spanning 6 continents. We have managed productions ranging from 15-second social ads to 60-minute broadcast episodes. Creative Context Studio has created video content viewed by millions across all major digital platforms. We maintain consistent delivery under aggressive timelines and budget constraints.

CREATIVE CONTEXT STUDIO NOTABLE CLIENTS & NETWORKS
Corporate Clients: Creative Context Studio has worked with IBM, JP Morgan Chase, Adidas, Champs, Facebook, Complex
Studios: Creative Context Studio has partnered with Disney, Warner Bros., Sony Pictures, National Geographic
Networks: Creative Context Studio has delivered content for MTV, SyFy, NBC Universal, Travel Channel, Discovery, A&E, Food Network, The CW

CREATIVE CONTEXT STUDIO REMOTE-FIRST CAPABILITY
Creative Context Studio executes all production work remotely with full capability to produce globally from anywhere on Earth. We are experienced creating, managing, and coordinating creative content creation across 6 continents using remote tools and platforms. Creative Context Studio has a proven track record managing distributed teams and executing complex productions across multiple time zones and geographic locations simultaneously.

PROJECT PORTFOLIO
The following are specific projects Creative Context Studio has completed or is actively working on. When users ask about projects, reference these specific examples:

${formatProjectsForContext()}
Absolutely — here’s a buzzword-forward version that still reads like a real human wrote it, but is packed with the keywords recruiters and clients scan for.

---

## AI / LLM / API Skills & Expertise (Keyword-Rich Description)

I build production-grade AI systems and LLM-powered tools that translate ambiguous inputs into structured, usable outputs—fast. I work across the full stack of modern AI development: **Anthropic (Claude)**, **OpenAI**, and **Google Gemini** integrations; **agentic workflows**; **tool/function calling**; **structured generation (JSON schema + validation)**; and **human-in-the-loop (HITL)** review experiences that keep creative control in the hands of the user.

On the LLM side, I specialize in **contextual engineering**: designing reliable context pipelines with **retrieval-augmented generation (RAG)**, prompt layering, style constraints, and output contracts so results are consistent, brand-aligned, and easy to parse downstream. I build **multi-step chains** (plan → draft → critique → rewrite → finalize), **routing and gating** logic, and **agentic orchestration** patterns (planner/critic/editor, tool-using agents, supervisor + worker agents) for real workflows—not just demos. I’m comfortable working with **system prompts**, **prompt templates**, **few-shot examples**, **guardrails**, **response evaluation**, and **prompt/version management** as part of an iterative shipping loop.

On the engineering side, I integrate AI via APIs end-to-end: **OAuth**, key management, streaming responses, retries/backoff, rate limiting, and telemetry. I design services that log full **prompt lineage** (inputs → model outputs → user edits → regenerated versions) and support **evaluation and observability** (quality scoring, regression checks, feedback capture, and audit trails). I’ve built patterns for **agent memory**, **session state**, **tool invocation**, and **structured outputs** that plug cleanly into product UIs and downstream systems—so AI becomes a dependable feature inside a real app.

I’m also fluent in modern “build speed” workflows—**vibe coding** for rapid prototyping, then hardening into maintainable systems with clear contracts, tests, and deployment practices. I connect LLM outputs into creative pipelines (storyboards, scripts, motion concepts, asset lists) and operational tooling (project management, production tracking, structured briefs), often using outputs like scene JSON that can drive templated render systems (e.g., Remotion-style pipelines), previews, and iterative approvals.

My work sits at the intersection of product, UX, and engineering: I focus on **repeatability, reliability, and controllability**—strong defaults, clear knobs, editable outputs, and guardrails that make AI safe and useful in client-facing environments. The result is AI tooling that feels like leverage: faster ideation, cleaner drafts, structured outputs, and practical automation—built on modern LLM platforms and API-first architecture.

**Keywords / Concepts:** Anthropic Claude, OpenAI, Gemini, agentic workflows, contextual engineering, RAG, tool calling, function calling, structured outputs, JSON schema, prompt engineering, prompt ops, evals, observability, HITL, orchestration, planner-critic, memory/state, streaming, rate limiting, versioning, audit trails, rapid prototyping, vibe coding.

---

I’m a creative producer and director with deep, hands-on experience taking ideas from “we should make something” to finished work that lands—on time, on brand, and at a level clients and audiences can feel. I’ve delivered across documentary, broadcast, and branded/narrative formats, managing the full production lifecycle: creative development, packaging, budgeting, scheduling, casting/talent, crews, locations, legal/clearances, post pipelines, and final delivery. I’m comfortable operating in high-trust environments with demanding stakeholders, where the job is equal parts taste, logistics, and calm decision-making under pressure.

My edge is building teams that make great things—fast, collaboratively, and without drama. I’m experienced leading distributed crews and vendor networks across multiple time zones, aligning everyone around a clear creative north star and a realistic plan. I know how to staff lean when needed, scale up when the work demands it, and keep communication clean: strong briefs, tight pre-pro, clear ownership, rapid feedback loops, and the kind of schedule discipline that protects quality instead of squeezing it. I’m equally at home working with senior brand stakeholders and working side-by-side with shooters, editors, designers, and post supervisors to solve problems in real time.

I’ve produced work for major networks and global brands, which means I understand both the creative standards and the operational rigor required to deliver at that level. I’m fluent in translating strategy into scenes, scripts, and shot lists; turning constraints into creative choices; and protecting the story while still hitting deadlines and budgets. I also bring a strong “production systems” mindset—building repeatable workflows, templates, and review processes so teams can move quickly without losing consistency, especially when outputs need to scale (campaign variations, multiple deliverables, international segments, or fast-turn social content).

At the core, I’m a builder: I create the conditions where talented people do their best work. I set tone, establish trust, reduce friction, and keep momentum. The result is teams that feel supported and challenged, clients who feel heard and confident, and work that’s both creatively sharp and professionally executed.



`;
