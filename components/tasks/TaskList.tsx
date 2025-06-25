"use client"
import { useFetchTasks } from '@/api/tasks';
import React from 'react'
import SingleTask from './SingleTask';
import Loader from '../Loader';
import { Tasks } from '@/utils/types';
import { getAccessJWTTokenData } from '@/utils/actions';


function TaskList({ projectId }: Readonly<{ projectId?: number }>) {
    /**
     * TaskList Component
     * 
     * - Fetches and displays a list of tasks.
     * - Supports both project-specific and global task fetching.
     * - Displays loader while data is being fetched.
     * 
     * @param projectId - (optional) ID of the project to fetch tasks for.
     */

    // Get user role from localStorage store
    const { roles:userRole } = getAccessJWTTokenData();    
    // Fetch tasks using custom hook, supports optional projectId filter
    const { data: tasks, isLoading } = useFetchTasks(projectId);
    // Show loader while fetching tasks
    if (isLoading) return <Loader message='Loading Tasks...' />;

    return (
        <section>
            <h2>Task List</h2>

            {
                tasks.length !== 0 ?

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Creator</th>
                                <th>Owner</th>
                                <th>Project</th>
                                <th>Status</th>
                                {
                                    ["admin", "task_creator"].some((role) => userRole.includes(role)) &&
                                    <th>Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {

                                tasks.map((task: Tasks) => {
                                    return <SingleTask key={task.id} {...task} />
                                })


                            }

                        </tbody>
                    </table>
                    :
                    <p>No Task found.</p>
            }
        </section>
    );
};

export default TaskList;
