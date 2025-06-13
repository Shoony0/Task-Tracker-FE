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

    return (
        <section>
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="task" name="description" placeholder="Task Description" defaultValue={description} required />
                <input type="date" name="due_date" placeholder="Due Date" defaultValue={due_date} required />
                <select name='status' defaultValue={status} required>
                    {
                        TaskStatusList.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>;
                        })
                    }
                </select>
                <select name="owner" defaultValue={owner.id} required>
                    <option value={0}>Select User</option>
                    {
                        users?.map((user) => {
                            return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update Task'}</button>
            </form>
        </section>
    );
}

export default UpdateFrom;
