'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects, Project } from '../data/projects';
import { FilterType, SortType } from '../components/ProjectFilter';
import ProjectFilter from '../components/ProjectFilter';
import EnhancedProjectCard from '../components/EnhancedProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import { useProjectFilter } from '../hooks/useProjectFilter';
import { TechStackType } from '../components/ui/TechStackIcon';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredProjects = useProjectFilter(projects, filter, sort);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Get unique tech stacks from all projects
  const availableTechStacks = useMemo(() => {
    const allTechStacks = projects.flatMap((p) => p.techStack);
    return Array.from(new Set(allTechStacks)) as TechStackType[];
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 uppercase tracking-wider text-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PROJECTS
      </motion.h1>

      {/* Filter Panel */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ProjectFilter
          onFilterChange={setFilter}
          onSortChange={setSort}
          activeFilter={filter}
          activeSort={sort}
          availableTechStacks={availableTechStacks}
        />
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm font-mono uppercase tracking-wider text-secondary">
          {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''}
        </p>
      </motion.div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCardWithAnimation
              key={project.projectId}
              project={project}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-mono uppercase tracking-wider text-secondary">
            NO PROJECTS FOUND
          </p>
          <p className="text-sm text-secondary mt-2">
            Try adjusting your filters
          </p>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

interface ProjectCardWithAnimationProps {
  project: typeof projects[0];
  index: number;
  onViewDetails: (project: Project) => void;
}

function ProjectCardWithAnimation({
  project,
  index,
  onViewDetails,
}: ProjectCardWithAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <EnhancedProjectCard
        project={project}
        projectId={project.projectId}
        title={project.title}
        description={project.description}
        dateRange={project.dateRange}
        status={project.status}
        techStack={project.techStack}
        link={project.link}
        problemSolved={project.problemSolved}
        preview={project.preview}
        onViewDetails={onViewDetails}
      />
    </motion.div>
  );
}


