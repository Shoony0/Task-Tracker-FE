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
        const reqData = { ...data, owner_id: tokenData.user_id, user_ids: user_ids } as ProjectForm;
        // Call mutation
        createProject(reqData);
        // Reset form after submit
        e.currentTarget.reset();
    }
    return (
        <section className='form-container'>
            <div className='form-box'>
                <h2>Add New Project</h2>
                <form onSubmit={handleSubmit} className="form-layout">
                    <div className="form-row">
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" id='name' placeholder="Project Name" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='description'>Description</label>
                        <textarea name="description" id='description' placeholder="Description" required></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor='start_date'>Start Date</label>
                        <input type="date" name="start_date" id='start_date' placeholder="Start Date" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='end_date'>End Date</label>
                        <input type="date" name="end_date" id='end_date' placeholder="End Date" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='users'>Assigned User</label>
                        <select name="users" id='users' multiple required>
                            {
                                users?.map((user) => {
                                    return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add Project'}</button>
                </form>
            </div>
        </section>
    )
}

export default AddForm
