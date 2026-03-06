"use client";

import { PillarSection } from "@/components/pillar-section";
import { LineProducingProductionIllustration } from "@/components/section-illustrations";
import { getProjectsByPillar } from "@/app/data/projects";

const PROJECTS = getProjectsByPillar("line-producing-production");

export function LineProducingProduction() {
  return (
    <PillarSection
      id="line-producing"
      title="Line Producing & Production"
      subtitle="Budget, schedule, crew, delivery. Network television, major studio features, and global distributed production."
      projects={PROJECTS}
      bgAlt={false}
      accent="var(--ltx-green)"
      illustration={<LineProducingProductionIllustration />}
    />
  );
}
