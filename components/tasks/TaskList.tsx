"use client"
import { useFetchTasks } from '@/api/tasks';
import React from 'react'
import SingleTask from './SingleTask';
import Loader from '../Loader';
import { useAppSelector } from '@/store/hooks';


type TaskListProps = {
    projectId?: number | undefined;
};

function TaskList({ projectId }: TaskListProps) {
    const { userRole } = useAppSelector((state) => state.user);
    const { data: tasks, isLoading } = useFetchTasks(projectId);
    if (isLoading) return <Loader message='Loading Tasks...' />;
    console.log("tasks")
    console.log(tasks)
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
                                    ["admin", "task_creator"].some((role) => userRole.includes(role))  &&
                                    <th>Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {

                                tasks.map((task) => {
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
