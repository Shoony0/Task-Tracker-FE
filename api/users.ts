import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { UserForm } from "@/utils/types";
import { getErrorMessage } from "@/utils/actions";



export const useFetchUserProfile = () => {
    /**
     * Hook to fetch current user's profile.
     * 
     * - Fetches user profile data from `/api/users/me/`.
     * - Uses React Query for caching and state management.
     * 
     * @returns React Query object containing data, loading, error, and refetch states.
     */
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/users/me/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};


export const useFetchUsers = () => {
    /**
     * Hook to fetch all users.
     * 
     * - Fetches list of users from `/api/users/`.
     * - Uses React Query for caching and state management.
     * 
     * @returns React Query object containing data, loading, error, and refetch states.
     */
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/users/');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFetchUser = (id: number) => {
    /**
     * Hook to fetch all users.
     * 
     * - Fetches list of users from `/api/users/`.
     * - Uses React Query for caching and state management.
     * 
     * @returns React Query object containing data, loading, error, and refetch states.
     */
    return useQuery({
        queryKey: ['user', id],
        queryFn: async ({ queryKey }) => {
            const [_key, userId] = queryKey;
            const response = await axiosInstance.get(`/api/users/${userId}/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFetchUsersRole = () => {
    /**
     * Hook to fetch all user roles.
     * 
     * - Fetches role data from `/api/roles/`.
     * - Uses React Query for caching and state management.
     * 
     * @returns React Query object containing data, loading, error, and refetch states.
     */

    return useQuery({
        queryKey: ['usersRoles'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/roles/');
            console.log("response")
            console.log(response)
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCreateUser = () => {
    /**
     * Hook to create a new user.
     * 
     * - Sends user creation data to the backend.
     * - Invalidates the users query to refresh the list.
     * - Handles success and error notifications.
     * 
     * @returns Object with:
     *  - createUser: function to trigger the mutation
     *  - isPending, isSuccess, isError, error: mutation state values
     */
    const queryClient = useQueryClient();

    const { mutate: createUser, isPending } = useMutation({
        mutationKey: ["users"],
        mutationFn: async (userData: UserForm) => {
            return await axiosInstance.post('/api/users/', userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User Created Successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to create user')
            console.log(error.message)
        },
    });

    return { createUser, isPending };
};

export const useUpdateUser = (id: number) => {
    /**
     * Hook to update user by ID.
     * 
     * - Sends update data to `/api/users/{id}/`.
     * - Invalidates user profile, single user, and users list on success.
     * - Handles success and error notifications.
     * 
     * @param id - User ID to update.
     * @returns Object with:
     *  - updateUser: function to trigger the mutation
     *  - isPending, isSuccess, isError, error: mutation state values
     */
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationKey: ["user", id],
        mutationFn: async (userData: UserForm) => {
            return await axiosInstance.patch(`/api/users/${id}/`, userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] }); // refresh profile
            queryClient.invalidateQueries({ queryKey: ['user', id] });
            queryClient.invalidateQueries({ queryKey: ['users'] }); // refresh user list
            toast.success('User updated successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to update user.')
            console.log(error)
        },
    });

    return { updateUser, isPending };
};


export const useDeleteUser = (id: number) => {
    /**
     * Hook to delete a user by ID.
     * 
     * - Sends DELETE request to `/api/users/{id}/`.
     * - Invalidates users list on success.
     * - Handles success and error notifications.
     * 
     * @param id - User ID to delete.
     * @returns Object with:
     *  - deleteUser: function to trigger the mutation
     *  - isPending, isSuccess, isError, error: mutation state values
     */
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isPending } = useMutation({
        mutationKey: ['users', id],
        mutationFn: async () => {
            return await axiosInstance.delete(`/api/users/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] }); // refresh user list
            toast.success('User deleted successfully.');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete user.');
            console.error(error);
        },
    });

    return { deleteUser, isPending };
};