'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export type LoginType = {
    email: string;
    password: string;
}


export const useLoginUser = () => {
    const queryClient = useQueryClient();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: async (loginData: LoginType) => {
            return await axiosInstance.post('/api/token/', loginData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login'] });
            toast.success('Login Successfully.');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(axiosError?.response?.data?.detail);
            console.log(error);
        },
    });

    return { loginUser, isPending };
};

export const useGetSSOToken = () => {
    const queryClient = useQueryClient();

    const { mutate: getSSOToken, isPending } = useMutation({
        mutationKey: ["sso"],
        mutationFn: async (token: string) => {
            const response = await axiosInstance.post('/api/sso/token/data/', {token});
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sso'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(axiosError?.response?.data?.detail || 'Failed to fetch token')
            console.log(error)
        },
    });

    return { getSSOToken, isPending };
};