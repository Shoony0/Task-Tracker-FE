"use client";
import { useFetchTask, useUpdateTask } from '@/api/tasks';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateTask } from '@/store/slices/updateSlice';
import { TaskStatusList } from '@/utils/data';
import Loader from '../Loader';
import { TasksForm, UserType } from '@/utils/types';

type UpdateFromType = {
    description: string;
    due_date: string;
    owner: string;

}

function UpdateFrom({ taskId, users }: Readonly<{ taskId: number, users: UserType[] }>) {
    /**
     * UpdateFrom Component
     * 
     * - Used to update an existing Task.
     * - Fetches the task details based on taskId.
     * - Submits updated task data.
     * 
     * @param taskId - ID of the task to be updated.
     * @param users - List of available users to select the owner.
     */
    const dispatch = useAppDispatch();

    // Fetch existing task data by taskId
    const { data: task, isLoading } = useFetchTask(taskId);
    // Hook for updating the task
    const { updateTask, isPending } = useUpdateTask(taskId);

    // Show loader while data is being fetched or updated
    if (isLoading || !task) return <Loader message='Loading Task...' />;
    if (isPending) return <Loader message='Updating Task...' />;

    const { description, due_date, status, owner } = task;

    // Handle form submit to update task
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as UpdateFromType;
        // Prepare request data
        const reqData = { ...data, owner_id: parseInt(data.owner) } as TasksForm;
        updateTask(reqData);
        e.currentTarget.reset();
        dispatch(setUpdateTask(0));
    }

    const cancelUpdate = () => {
        // Reset update state in redux store
        dispatch(setUpdateTask(0));
    }

    return (
        <section className='form-container'>
            <div className='form-box'>
                <h2>Update Task</h2>
                <form onSubmit={handleSubmit} className="form-layout">
                    <div className="form-row">
                        <label htmlFor='description'>Description</label>
                        <textarea name="description" id='description' placeholder="Task Description" defaultValue={description} required></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor='due_date'>Due Date</label>
                        <input type="date" name="due_date" id='due_date' placeholder="Due Date" defaultValue={due_date} required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='status'>Status</label>
                        <select name='status' id='status' defaultValue={status} required>
                            {
                                TaskStatusList.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor='owner'>Assigned User</label>
                        <select name="owner" id='owner' defaultValue={owner.id} required>
                            <option value={0}>Select User</option>
                            {
                                users?.map((user) => {
                                    return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update Task'}</button>
                    <button type="button" onClick={cancelUpdate}>Cancel</button>
                </form>
            </div>
        </section>
    );
}

export default UpdateFrom;
