import AddTask from '@/components/tasks/AddTask';
import TaskList from '@/components/tasks/TaskList';
import React from 'react'

const Tasks = () => {
  return (
    <main>
      <AddTask />
      <TaskList />
    </main>

  );
};

export default Tasks;
