import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";



export const useFetchUserProfile = () => {
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
    return useQuery({
        queryKey: ['task', id],
        queryFn: async ({ queryKey }) => {
            const [_key, userId] = queryKey;
            const response = await axiosInstance.get(`/api/users/${userId}/`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFetchUsersRole = () => {
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
    const queryClient = useQueryClient();

    const { mutate: createUser, isPending } = useMutation({
        mutationKey: ["users"],
        mutationFn: async (userData) => {
            return await axiosInstance.post('/api/users/', userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User Created Successfully.');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'Failed to create user')
            console.log(error.message)
        },
    });

    return { createUser, isPending };
};

export const useUpdateUser = (id: number) => {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationKey: ["user", id],
        mutationFn: async (userData) => {
            return await axiosInstance.patch(`/api/users/${id}/`, userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] }); // refresh profile
            queryClient.invalidateQueries({ queryKey: ['user', id] });
            queryClient.invalidateQueries({ queryKey: ['users'] }); // refresh user list
            toast.success('User updated successfully.');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'Failed to update user.')
            console.log(error)
        },
    });

    return { updateUser, isPending };
};


export const useDeleteUser = (id: number) => {
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