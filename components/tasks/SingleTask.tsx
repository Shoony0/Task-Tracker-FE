import { useDeleteTask, useUpdateTask } from '@/api/tasks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUpdateTask } from '@/store/slices/updateSlice';
import { TaskStatusList } from '@/utils/data';
import React, { useState } from 'react'
import Loader from '../Loader';
import { Tasks, taskUpdateStatus } from '@/utils/types';

function SingleTask({ id, description, due_date, status, owner, project, creator }: Readonly<Tasks>) {
    const [taskId, setTaskId] = useState<number>(0);
    const dispatch = useAppDispatch();
    // Hook for deleting task
    const { deleteTask, isPending } = useDeleteTask(id);
    // Hook for updating task
    const { updateTask, isPending: updatePending } = useUpdateTask(id);
    // Show loading while deleting
    if (isPending) <Loader message='Deleting...' />;
    // Show loading while updating
    if (updatePending) <Loader message='Updating...' />;

    const updateStatus = (status: string) => {
        /**
         * Handles task status update.
         * @param status - New status string to update the task.
         */
        setTaskId(taskId);
        console.log(status);
        
        const update_data: taskUpdateStatus = {
            status: status,
        }
        updateTask(update_data);
    };
    
    // Get current user's role from Redux state
    const { userRole } = useAppSelector((state) => state.user);
    return (
        <tr>
            <td>{description}</td>
            <td>{due_date}</td>
            <td>{creator.first_name} {creator.last_name}</td>
            <td>{owner.first_name} {owner.last_name}</td>
            <td>{project.name}</td>
            <td>
                <select name='status' defaultValue={status} onChange={(e) => updateStatus(e.target.value)}>
                    {
                        TaskStatusList.map((item) => {
                            return <option key={item.id} value={item.id} >{item.name}</option>;
                        })
                    }
                </select>
            </td>
            {
                ["admin", "task_creator"].some((role) => userRole.includes(role)) &&
                <td>
                    <button type="button" className='edit-btn' onClick={() => dispatch(setUpdateTask(id))}>Edit</button>
                    <button type="button" className='delete-btn' onClick={() => deleteTask()}>Delete</button>
                </td>

            }
        </tr >
    );
};

export default SingleTask;
