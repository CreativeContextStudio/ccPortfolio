"use client";

import { PillarSection } from "@/components/pillar-section";
import { CreativeProducingIllustration } from "@/components/section-illustrations";
import { getProjectsByPillar } from "@/app/data/projects";

const PROJECTS = getProjectsByPillar("creative-producing");

export function CreativeProducing() {
  return (
    <PillarSection
      id="creative-producing"
      title="Creative Producing"
      subtitle="Brand campaigns, documentaries, performance video, and immersive experiences for Fortune 500 clients and major networks."
      projects={PROJECTS}
      bgAlt={true}
      accent="var(--ltx-pink)"
      illustration={<CreativeProducingIllustration />}
    />
  );
}
