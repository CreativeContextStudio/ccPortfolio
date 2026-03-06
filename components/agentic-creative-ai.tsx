"use client";

import { PillarSection } from "@/components/pillar-section";
import { FrequencyBars } from "@/components/frequency-bars";
import { SatelliteDrifter } from "@/components/ambient-drifters";
import { AgenticCreativeAiIllustration } from "@/components/section-illustrations";
import { getProjectsByPillar } from "@/app/data/projects";

const PROJECTS = getProjectsByPillar("agentic-creative-ai");

export function AgenticCreativeAi() {
  return (
    <PillarSection
      id="agentic-creative"
      title="Agentic Creative & AI"
      subtitle="AI-native tools, generative workflows, interactive systems, and context-engineered experiences."
      projects={PROJECTS}
      bgAlt={true}
      accent="var(--ltx-studio)"
      illustration={<AgenticCreativeAiIllustration />}
    >
      <SatelliteDrifter />
      <div className="mt-8 flex justify-center">
        <FrequencyBars className="text-ltx-studio" />
      </div>
    </PillarSection>
  );
}
