"use client";
import { useAppSelector } from '@/store/hooks';
import React from 'react'
import AddFrom from './AddFrom';
import UpdateFrom from './UpdateForm';
import { useFetchUsers } from '@/api/users';
import Loader from '../Loader';



function AddTask({ projectId }: Readonly<{ projectId?: number }>) {
    const { userRole } = useAppSelector((state) => state.user);
    const { taskId } = useAppSelector((state) => state.editData);
    const { projects } = useAppSelector((state) => state.project);

    const { data: users, isLoading } = useFetchUsers();
    if (isLoading || !users) return <Loader message='Loading Users...' />;

    if (taskId !== 0) {
        return <UpdateFrom taskId={taskId} users={users} />
    } else {
        if (["admin", "task_creator"].some((role) => userRole.includes(role))) {

            return <AddFrom projects={projects} projectId={projectId} users={users} />
        } else {
            return;
        }

    }
};

export default AddTask;
