import { useCreateProject } from '@/api/projects';
import React from 'react'
import Loader from '../Loader';
import { getAccessJWTTokenData } from '@/utils/actions';
import { UserType, JWTTokenData, ProjectForm } from '@/utils/types';



function AddForm({ users }: Readonly<{ users: UserType[] }>) {
    // React Query mutation for creating project
    const { createProject, isPending } = useCreateProject();
    // Show loader while mutation is in progress
    if (isPending) return <Loader message='Creating...' />;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Extract form data from form element
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        // Extract selected users as array of strings, convert to numbers
        const users = formData.getAll('users') as string[];
        const user_ids: number[] = users.map((item) => parseInt(item));
        
        // Get logged-in user's ID from token
        const tokenData: JWTTokenData = getAccessJWTTokenData();
        // Prepare request data
        const reqData = {...data, owner_id: tokenData.user_id, user_ids: user_ids } as ProjectForm;
        // Call mutation
        createProject(reqData);
        // Reset form after submit
        e.currentTarget.reset();
    }
    return (
        <section>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Project Name" required />
                <textarea name="description" placeholder="Description" required></textarea>
                <input type="date" name="start_date" placeholder="Start Date" required />
                <input type="date" name="end_date" placeholder="End Date" required />
                <select name="users" multiple required>
                    {
                        users?.map((user) => {
                            return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add Project'}</button>
            </form>
        </section>
    )
}

export default AddForm
