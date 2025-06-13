'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/actions";

export type LoginType = {
    email: string;
    password: string;
}


export const useLoginUser = () => {
    /**
     * Custom hook to handle user login using React Query's useMutation.
     * 
     * This hook:
     * - Sends login credentials to the backend API.
     * - Handles success and error states.
     * - Invalidates the 'login' query key upon successful login (can be extended to refresh user state).
     * - Displays success or error toast notifications.
     * 
     * @returns An object containing:
     *  - loginUser: function to trigger the login mutation.
     *  - isPending: boolean indicating if the login mutation is in progress.
     */
    // Initialize React Query's queryClient to manage cache.
    const queryClient = useQueryClient();

    // useMutation hook to handle login API call.
    const { mutate: loginUser, isPending } = useMutation({
        // Function to perform the login API request.
        mutationFn: async (loginData: LoginType) => {
            return await axiosInstance.post('/api/token/', loginData);
        },
        // Callback when mutation succeeds.
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login'] });
            toast.success('Login Successfully.');
        },
        // Callback when mutation fails.
        onError: (error) => {
            // Cast the error to AxiosError for better type safety.
            const axiosError = error as AxiosError<any>;
            // Show error toast with parsed error message.
            toast.error(getErrorMessage(axiosError));
            // Log the full error for debugging.
            console.log(error);
        },
    });

    return { loginUser, isPending };
};

export const useGetSSOToken = () => {
    /**
     * Custom hook to handle fetching SSO token data using React Query's useMutation.
     * 
     * This hook:
     * - Sends the received SSO token to the backend API for verification or further processing.
     * - Handles success and error states.
     * - Invalidates the 'sso' query key upon success (to refresh dependent queries if necessary).
     * - Displays error toast notifications if the request fails.
     * 
     * @returns An object containing:
     *  - getSSOToken: function to trigger the SSO token mutation.
     *  - isPending: boolean indicating if the mutation is currently in progress.
     */

    const queryClient = useQueryClient();

    const { mutate: getSSOToken, isPending } = useMutation({
        // Unique key for this mutation (optional but helpful for devtools and debugging).
        mutationKey: ["sso"],
        mutationFn: async (token: string) => {
            const response = await axiosInstance.post('/api/sso/token/data/', { token });
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sso'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<any>;
            toast.error(getErrorMessage(axiosError) || 'Failed to fetch token')
            console.log(error)
        },
    });
    // Expose the mutation function and loading state.
    return { getSSOToken, isPending };
};