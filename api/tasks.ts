import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TasksForm, taskUpdateStatus } from "@/utils/types";
import { getErrorMessage } from "@/utils/actions";


export const useFetchTasks = (projectId: number | undefined) => {
    /**
     * Hook to fetch tasks.
     * 
     * - If projectId is provided, fetches tasks for that specific project.
     * - If projectId is undefined, fetches all tasks.
     * 
     * @param projectId - Optional project ID to filter tasks.
     * @returns React Query object containing data, loading, error, and refetch states.
     */
    return useQuery({
        queryKey: ['tasks', projectId],
        queryFn: async () => {
            if (projectId) {
                const response = await axiosInstance.get(`/api/projects/${projectId}/tasks/`);
                return response.data;
            } else {
                const response = await axiosInstance.get('/api/tasks/');
                return response.data;
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFetchTask = (id: number) => {
    /**
     * Hook to fetch a single task by ID.
     * 
     * @param id - Task ID to fetch.
     * @returns React Query object containing data, loading, error, and refetch states.
     */
    return useQuery({
        queryKey: ['task', id],
        queryFn: async ({ queryKey }) => {
            const [_key, taskId] = queryKey;
            const response = await axiosInstance.get(`/api/tasks/${taskId}/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCreateTask = () => {
    /**
     * Hook to create a new task.
     * 
     * - Sends task creation data to the backend.
     * - Invalidates the tasks query to refresh the list.
     * - Handles success and error notifications.
     * 
     * @returns Object with:
     *  - createTask: function to trigger the mutation
     *  - isPending: mutation loading state
     *  - isSuccess: whether mutation succeeded
     *  - isError: whether mutation failed
     *  - error: error object if mutation failed
     */
    const queryClient = useQueryClient();

    const { mutate: createTask, isPending } = useMutation({
        mutationKey: ["tasks"],
        mutationFn: async (userData: TasksForm) => {
            return await axiosInstance.post('/api/tasks/', userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task Created Successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to create task.')
            console.log(error)
        },
    });

    return { createTask, isPending };
};

export const useUpdateTask = (id: number) => {
    /**
     * Hook to update a task by ID.
     * 
     * - Sends updated task data to the backend.
     * - Invalidates both task detail and task list queries on success.
     * - Handles success and error notifications.
     * 
     * @param id - The ID of the task to update.
     * @returns Object with:
     *  - updateTask: function to trigger the update
     *  - isPending, isSuccess, isError, error: mutation state values
     */
    const queryClient = useQueryClient();

    const { mutate: updateTask, isPending } = useMutation({
        mutationKey: ["task", id],
        mutationFn: async (taskData: TasksForm | taskUpdateStatus) => {
            return await axiosInstance.patch(`/api/tasks/${id}/`, taskData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', id] });
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // refresh task list
            toast.success('Task updated successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to update task.')
            console.log(error)
        },
    });

    return { updateTask, isPending };
};

export const useDeleteTask = (id: number) => {
    /**
     * Hook to delete a task by ID.
     * 
     * - Sends delete request to the backend.
     * - Invalidates the tasks query to refresh task list.
     * - Handles success and error notifications.
     * 
     * @param id - Task ID to delete.
     * @returns Object with:
     *  - deleteTask: function to trigger deletion
     *  - isPending, isSuccess, isError, error: mutation state values
     */
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending } = useMutation({
        mutationKey: ['tasks', id],
        mutationFn: async () => {
            return await axiosInstance.delete(`/api/tasks/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // refresh task list
            toast.success('Task deleted successfully.');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || 'Failed to delete task.');
            console.error(error);
        },
    });

    return { deleteTask, isPending };
};