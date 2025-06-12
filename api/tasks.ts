import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TasksForm, taskUpdateStatus } from "@/utils/types";
import { getErrorMessage } from "@/utils/actions";


export const useFetchTasks = (projectId: number | undefined) => {
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