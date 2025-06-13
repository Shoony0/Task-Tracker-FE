"use client";
import AddTask from '@/components/tasks/AddTask';
import TaskList from '@/components/tasks/TaskList';
import { useParams } from 'next/navigation';
import React from 'react';

const ProjectsTask = () => {
  // Extracting route parameter 'id' from URL using Next.js useParams hook
  const params = useParams<{ id?: string }>();
  // Convert 'id' param to number if exists, else set as undefined
  const projectId = params.id ? parseInt(params.id, 10) : undefined as number | undefined;

  return (
    <main>
      <AddTask projectId={projectId} />
      <TaskList projectId={projectId} />
    </main>

  );
};

export default ProjectsTask;
