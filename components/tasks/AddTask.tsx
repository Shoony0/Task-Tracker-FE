"use client";
import { useAppSelector } from '@/store/hooks';
import React from 'react'
import AddFrom from './AddFrom';
import UpdateFrom from './UpdateForm';
import { useFetchUsers } from '@/api/users';
import Loader from '../Loader';



function AddTask({ projectId }: Readonly<{ projectId?: number }>) {
    /**
     * AddTask Component
     * 
     * - Dynamically renders AddForm or UpdateForm based on taskId state.
     * - Fetches necessary users and project data from global state.
     * - Controls access based on userRole (admin or task_creator).
     */
    const { userRole } = useAppSelector((state) => state.user);
    const { taskId } = useAppSelector((state) => state.editData);
    const { projects } = useAppSelector((state) => state.project);

    const { data: users, isLoading } = useFetchUsers();
    // Show loader while fetching users
    if (isLoading || !users) return <Loader message='Loading Users...' />;

    // If editing task -> show update form
    if (taskId !== 0) {
        return <UpdateFrom taskId={taskId} users={users} />
    } else {
        // If creating task -> show add form for allowed roles
        if (["admin", "task_creator"].some((role) => userRole.includes(role))) {

            return <AddFrom projects={projects} projectId={projectId} users={users} />
        } else {
            return;
        }

    }
};

export default AddTask;
