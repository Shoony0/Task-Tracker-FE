import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ProjectForm } from "@/utils/types";
import { getErrorMessage } from "@/utils/actions";


export const useFetchProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/projects/');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        
    });
};

export const useFetchProject = (id: number) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: async ({ queryKey }) => {
            const [_key, projectId] = queryKey;
            const response = await axiosInstance.get(`/api/projects/${projectId}/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};


export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const { mutate: createProject, isPending } = useMutation({
        mutationKey: ["projects"],
        mutationFn: async (userData: ProjectForm) => {
            return await axiosInstance.post('/api/projects/', userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project Created Successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) ||  'Failed to create project')
            console.log(error)
        },
    });

    return { createProject, isPending };
};


export const useUpdateProject = (id: number) => {
    const queryClient = useQueryClient();

    const { mutate: updateProject, isPending } = useMutation({
        mutationKey: ["project", id],
        mutationFn: async (projectData: ProjectForm) => {
            return await axiosInstance.patch(`/api/projects/${id}/`, projectData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', id] });
            queryClient.invalidateQueries({ queryKey: ['projects'] }); // refresh task list
            toast.success('Project updated successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to update project.')
            console.log(error)
        },
    });

    return { updateProject, isPending };
};

export const useDeleteProject = (id: number) => {
    const queryClient = useQueryClient();

    const { mutate: deleteProject, isPending } = useMutation({
        mutationKey: ['projects', id],
        mutationFn: async () => {
            return await axiosInstance.delete(`/api/projects/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] }); // refresh task list
            toast.success('Project deleted successfully.');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || 'Failed to delete project.');
            console.error(error);
        },
    });

    return { deleteProject, isPending };
};