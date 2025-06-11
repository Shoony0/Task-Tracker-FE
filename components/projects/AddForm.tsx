import { useCreateProject } from '@/api/projects';
import React from 'react'
import Loader from '../Loader';
import { getAccessJWTTokenData } from '@/utils/actions';

function AddForm({ users }) {
    console.log(users);
    const { createProject, isPending } = useCreateProject();
    if (isPending) return <Loader message='Creating...' />;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const users = formData.getAll('users');
        const user_ids = users.map((item) => parseInt(item));

        const tokenData = getAccessJWTTokenData();
        const reqData = { ...data, owner_id: tokenData.user_id, user_ids: user_ids };
        console.log("reqData")
        console.log(reqData)
        createProject(reqData);
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
                        users &&
                        users.map((user) => {
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
