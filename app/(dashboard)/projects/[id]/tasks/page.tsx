"use client";
import AddTask from '@/components/tasks/AddTask';
import TaskList from '@/components/tasks/TaskList';
import { useParams } from 'next/navigation';
import React from 'react';

const ProjectsTask = () => {
  const params = useParams<{ id?: string }>();
  const projectId = params.id ? parseInt(params.id, 10) : undefined as number | undefined;
  console.log("projectId", projectId);


  return (
    <main>
      <AddTask projectId={projectId} />
      <TaskList projectId={projectId} />
    </main>

  );
};

export default ProjectsTask;
