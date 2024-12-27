import React from 'react'
import { format } from "date-fns";

import { Project } from '@/state/api';

type Props = {
    project: Project;
  };
  
  const ProjectCard = ({ project }: Props) => {
    return (
      <div className="flex m-3 min-w-0 gap-x-4 rounded border p-4 shadow bg-white dark:bg-dark-secondary dark:text-white">
        <div className="min-w-0 flex-auto">
        <p className="text-sm/6 font-semibold">{project.name}</p>
        <p className="mt-1 truncate text-xs/5">{project.description}</p>
        </div>
        <div className="sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs/5">Start Date: <time>{project.startDate ? format(new Date(project.startDate), "P"): "Not set"}</time></p>
        <p className="mt-1 text-xs/5">End Date:<time>{project.endDate ? format(new Date(project.endDate), "P"): "Not set"}</time></p>
        </div>
      </div>
  )
}

export default ProjectCard