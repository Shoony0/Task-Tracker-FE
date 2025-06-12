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
    const dispatch = useAppDispatch();

    const { data: task, isLoading } = useFetchTask(taskId);
    const { updateTask, isPending } = useUpdateTask(taskId);

    if (isLoading || !task) return <Loader message='Loading Task...' />;
    if (isPending) return <Loader message='Updating Task...' />;

    const { description, due_date, status, owner } = task;
    console.log("task")
    console.log(task)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as UpdateFromType;
        const reqData = { ...data, owner_id: parseInt(data.owner) } as TasksForm;
        console.log("reqData")
        console.log(reqData)
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
