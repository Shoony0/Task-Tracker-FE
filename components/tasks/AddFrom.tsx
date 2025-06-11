"use client";
import { useCreateTask } from '@/api/tasks';
import { TaskStatusList } from '@/utils/data';
import React from 'react'
import { toast } from 'react-toastify';

function AddFrom({ projects, projectId, users }) {
    const { createTask, isPending } = useCreateTask();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if(data.project == "0"){
            toast.error("Please select Project")
            return;
        }
        if(data.owner == "0"){
            toast.error("Please select User")
            return;
        }
        const reqData = { ...data, project_id: parseInt(data.project), owner_id: parseInt(data.owner) };
        console.log(reqData)
        createTask(reqData);
        e.currentTarget.reset();
    }
    return (
        <section>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="task" name="description" placeholder="Task Description" required />
                <input type="date" name="due_date" placeholder="Due Date" required />
                <select name='status' required>
                    {
                        TaskStatusList.map((item) => {
                            return <option key={item.id} value={item.id} >{item.name}</option>;
                        })
                    }
                </select>
                <select name="owner" required>
                    <option value={0}>Select User</option>
                    {
                        users &&
                        users.map((user) => {
                            return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                        })
                    }

                </select>
                <select name='project' defaultValue={projectId} disabled={projectId}>
                    {
                        !projectId &&
                        <option value={0}>Select Project</option>
                    }
                    {
                        projects &&
                        projects.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add Task'}</button>
            </form>
        </section>
    );
}

export default AddFrom
