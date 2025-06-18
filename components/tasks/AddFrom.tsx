"use client";
import { useCreateTask } from '@/api/tasks';
import { TaskStatusList } from '@/utils/data';
import { Project, TasksForm, UserType } from '@/utils/types';
import React from 'react'
import { toast } from 'react-toastify';



type AddFormType = {
    description: string;
    due_date: string;
    status: string;
    owner: string;
    project: string;
}
/**
 * AddForm Component
 * 
 * - Form for creating new tasks.
 * - Handles basic validation and submits form data.
 */
function AddFrom({ projects, projectId, users }: Readonly<{ projects: Project[], projectId: number | undefined, users: UserType[] }>) {
    const { createTask, isPending } = useCreateTask();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as AddFormType;
        // Validation for owner
        if (data.owner == "0") {
            toast.error("Please select User")
            return;
        }
        // Validation for project
        if (data.project == "0") {
            toast.error("Please select Project")
            return;
        }
        // Prepare request payload
        const reqData = { ...data, project_id: parseInt(data.project), owner_id: parseInt(data.owner) } as TasksForm;

        createTask(reqData);
        e.currentTarget.reset();
    }
    return (
        <section className='form-container'>
            <div className='form-box'>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit} className="form-layout">
                    <div className="form-row">
                        <label htmlFor='description'>Description</label>
                        <textarea name="description" id="description" placeholder="Task Description" required></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor='due_date'>Due Date</label>
                        <input type="date" name="due_date" id="due_date" placeholder="Due Date" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='status'>Status</label>
                        <select name='status' id="status" required>
                            {
                                TaskStatusList.map((item) => {
                                    return <option key={item.id} value={item.id} >{item.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor='owner'>Assigned User</label>
                        <select name="owner" id='owner' required>
                            <option value={0}>Select User</option>
                            {
                                users?.map((user) => {
                                    return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                                })
                            }

                        </select>

                    </div>
                    <div className="form-row">
                        <label htmlFor='project'>Project</label>
                        <select name='project' id="project" defaultValue={projectId} disabled={projectId !== undefined}>
                            {
                                !projectId &&
                                <option value={0}>Select Project</option>
                            }
                            {
                                projects?.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add Task'}</button>
                </form>
            </div>
        </section>
    );
}

export default AddFrom
