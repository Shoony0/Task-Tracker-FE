import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ProjectForm } from "@/utils/types";
import { getErrorMessage } from "@/utils/actions";


export const useFetchProjects = () => {
    /**
     * Custom hook to fetch the list of projects using React Query's useQuery.
     * 
     * This hook:
     * - Retrieves project data from the backend API.
     * - Caches and reuses data for 5 minutes to minimize unnecessary requests.
     * - Automatically handles loading, error, and refetching states via React Query.
     * 
     * @returns The standard React Query object containing:
     *  - data: the fetched project data.
     *  - isLoading: boolean indicating loading state.
     *  - isError: boolean indicating error state.
     *  - refetch: function to manually refetch the data.
     *  - ...and other React Query fields.
     */
    return useQuery({
        queryKey: ['projects'], // Unique cache key for this query.
        queryFn: async () => {
            const response = await axiosInstance.get('/api/projects/');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes , // Data remains fresh for 5 minutes before becoming stale.
        
    });
};

export const useFetchProject = (id: number) => {
    /**
     * Custom hook to fetch a single project's details by ID using React Query.
     * 
     * This hook:
     * - Retrieves a specific project's data from the backend API.
     * - Caches each project individually based on its ID.
     * - Keeps data fresh for 5 minutes.
     * 
     * @param id - The unique ID of the project to fetch.
     * 
     * @returns The standard React Query object containing:
     *  - data: the fetched project details.
     *  - isLoading: boolean indicating loading state.
     *  - isError: boolean indicating error state.
     *  - refetch: function to manually refetch the data.
     *  - ...and other React Query fields.
     */
    return useQuery({
        queryKey: ['project', id],
        queryFn: async ({ queryKey }) => {
            const [_key, projectId] = queryKey;
            const response = await axiosInstance.get(`/api/projects/${projectId}/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes, // Cache data for 5 minutes.
    });
};


export const useCreateProject = () => {
    /**
     * Custom hook to handle creating a new project using React Query's useMutation.
     * 
     * This hook:
     * - Sends project creation data to the backend API.
     * - Invalidates the 'projects' query to refresh the projects list upon success.
     * - Displays success and error toast notifications.
     * 
     * @returns An object containing:
     *  - createProject: function to trigger the project creation mutation.
     *  - isPending: boolean indicating if the mutation is currently in progress.
     */
    const queryClient = useQueryClient();

    // useMutation hook to handle project creation API request.
    const { mutate: createProject, isPending } = useMutation({
        mutationKey: ["projects"],
        mutationFn: async (userData: ProjectForm) => {
            return await axiosInstance.post('/api/projects/', userData);
        },
        // On successful creation, invalidate the 'projects' query to refresh project list.
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
    /**
     * Custom hook to handle updating a specific project by ID using React Query's useMutation.
     * 
     * This hook:
     * - Sends updated project data to the backend API.
     * - Invalidates both the single project and project list queries on success to keep data fresh.
     * - Displays success and error toast notifications.
     * 
     * @param id - The ID of the project to update.
     * 
     * @returns An object containing:
     *  - updateProject: function to trigger the project update mutation.
     *  - isPending: boolean indicating if the mutation is currently in progress.
     */
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
    /**
     * Custom hook to handle deleting a specific project by ID using React Query's useMutation.
     * 
     * This hook:
     * - Sends a delete request for the specified project.
     * - Invalidates the 'projects' query to refresh the project list upon successful deletion.
     * - Displays success and error toast notifications.
     * 
     * @param id - The ID of the project to delete.
     * 
     * @returns An object containing:
     *  - deleteProject: function to trigger the delete mutation.
     *  - isPending: boolean indicating if the mutation is currently in progress.
     */
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