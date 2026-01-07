import DramaticPageLoad from './components/DramaticPageLoad';
import HeroPanel from './components/HeroPanel';
import MissionBriefing from './components/MissionBriefing';
import SignalDecoder from './components/SignalDecoder';

export default function Home() {

  return (
    <DramaticPageLoad>
      <div className="relative min-h-screen">
        {/* Paper Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12 md:mb-16 w-full overflow-visible">
            <HeroPanel
              agentDesignation="CREATIVE CONTEXT STUDIO"
              status="AVAILABLE"
              location="Atlanta Metro / Remote Operations"
              useDualRotatingTitle={true}
            />
          </div>

          {/* Overview */}
          <div className="w-full mb-8 sm:mb-12 md:mb-16">
            <MissionBriefing
              title="OVERVIEW"
              content={[
                "Creative Context Studio builds the systems that help creators and startups **ship content consistently**—turning content into an engine: a **repeatable production workflow** that scales as output grows.",
                "## What gets built",
                "- **Storytelling and Engagement**",
                "- **Video production + post-production pipelines**",
                "- **Interactive experiences**",
                "- **Branded content and marketing campaigns**",
                "- **AI workflow automation** (Claude, n8n, custom scripts)",
                "- **Full-stack applications**",
                "## Operational focus",
                "Friction gets removed across **scheduling, budgets, approvals, asset flow, and delivery**—so teams increase velocity and consistency **without sacrificing craft**."
              ]}
            />
          </div>

          {/* Signal Decoder */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <SignalDecoder
              speed={50}
              lineLength={25}
              lineCount={7}
              autoStart={true}
            />
          </div>
        </div>
      </div>
    </DramaticPageLoad>
  );
}
