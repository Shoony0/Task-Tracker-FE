import { useFetchProject, useUpdateProject } from '@/api/projects';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateProject } from '@/store/slices/updateSlice';
import React from 'react'
import Loader from '../Loader';
import { getAccessJWTTokenData } from '@/utils/actions';

function UpdateForm({ projectId, users }) {
    const dispatch = useAppDispatch();

    const { data: project, isLoading } = useFetchProject(projectId);
    const { updateProject, isPending } = useUpdateProject(projectId);

    if (isLoading || !project) return <Loader message='Loading project...' />;

    if (isPending) return <Loader message='Updating Project...' />;

    const { id, description, name, start_date, end_date, users: projects_user } = project;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const tokenData = getAccessJWTTokenData();
        const users = formData.getAll('users');

        const user_ids = users.map((item) => parseInt(item));
        const reqData = { ...data, owner_id: tokenData.user_id, user_ids: user_ids };
        updateProject(reqData);

        dispatch(setUpdateProject(0));
        e.currentTarget.reset();
    }

    return (
        <section>
            <h2>Update Project</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Project Name" required defaultValue={name} />
                <textarea name="description" placeholder="Description" required defaultValue={description}></textarea>
                <input type="date" name="start_date" placeholder="Start Date" required defaultValue={start_date} />
                <input type="date" name="end_date" placeholder="End Date" required defaultValue={end_date} />
                <select name="users" required defaultValue={projects_user.map((p_user) => p_user.id)} multiple>
                    {
                        users &&
                        users.map((user) => {
                            return <option key={user.id} value={user.id} >{user.first_name} {user.last_name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update Project'}</button>
            </form>
        </section>
    );
};

export default UpdateForm;
