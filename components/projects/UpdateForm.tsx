import { useFetchProject, useUpdateProject } from '@/api/projects';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateProject } from '@/store/slices/updateSlice';
import React from 'react'
import Loader from '../Loader';
import { getAccessJWTTokenData } from '@/utils/actions';
import { ProjectForm, UserType } from '@/utils/types';

function UpdateForm({ projectId, users }: Readonly<{ projectId: number, users: UserType[] }>) {
    const dispatch = useAppDispatch();

    // Fetch existing project data
    const { data: project, isLoading } = useFetchProject(projectId);
    const { updateProject, isPending } = useUpdateProject(projectId);

    if (isLoading || !project) return <Loader message='Loading project...' />;

    if (isPending) return <Loader message='Updating Project...' />;

    const { description, name, start_date, end_date, users: projects_user } = project;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // Get token for owner_id
        const tokenData = getAccessJWTTokenData();
        // Extract selected users
        const users = formData.getAll('users') as string[];

        const user_ids = users.map((item) => parseInt(item));
        const reqData = { ...data, owner_id: tokenData.user_id, user_ids: user_ids } as ProjectForm;

        updateProject(reqData);

        // Reset update state after submission
        dispatch(setUpdateProject(0));
        e.currentTarget.reset();
    }

    const cancelUpdate = () => {
        // Reset update state in redux store
        dispatch(setUpdateProject(0));
    }

    return (
        <section className='form-container'>
            <div className='form-box'>
                <h2>Update Project</h2>
                <form onSubmit={handleSubmit} className="form-layout">
                    <div className="form-row">
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" id='name' placeholder="Project Name" required defaultValue={name} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='description'>Description</label>
                        <textarea name="description" id='description' placeholder="Description" required defaultValue={description}></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor='start_date'>Start Date</label>
                        <input type="date" name="start_date" id='start_date' placeholder="Start Date" required defaultValue={start_date} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='end_date'>End Date</label>
                        <input type="date" name="end_date" id='end_date' placeholder="End Date" required defaultValue={end_date} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='users'>Assigned User</label>
                        <select name="users" id='users' required defaultValue={projects_user.map((p_user: UserType) => p_user.id)} multiple>
                            {
                                users?.map((user) => {
                                    return <option key={user.id} value={user.id} >{user.first_name} {user.last_name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update Project'}</button>
                    <button type="button" onClick={cancelUpdate}>Cancel</button>
                </form>
            </div>
        </section>
    );
};

export default UpdateForm;
