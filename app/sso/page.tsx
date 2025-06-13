"use client";
import { useGetSSOToken } from '@/api/auth';
import Loader from '@/components/Loader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';


function SSOPage() {
    /**
     * SSOPage Component
     * 
     * This component handles Single Sign-On (SSO) callback logic.
     * It reads the temporary token from URL params, exchanges it for an access token,
     * stores it in sessionStorage, and redirects the user accordingly.
     */

    // Extract query parameters from the URL
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Custom hook to exchange the SSO temporary token for access & refresh tokens
    const { getSSOToken, isPending } = useGetSSOToken();

    useEffect(() => {
        // Get token & status from the URL query parameters
        const ssoTempToken = searchParams.get('token');
        const status = searchParams.get('status');

        if (status === 'success' && ssoTempToken) {
            // If SSO is successful and temp token is present, fetch actual tokens
            getSSOToken(ssoTempToken, {
                onSuccess: (data) => {
                    if (data?.access) {
                        // Store tokens in sessionStorage
                        sessionStorage.setItem('token', data.access);
                        sessionStorage.setItem('refresh', data.refresh);
                        // Show success message and redirect to projects page
                        toast.success('Login Successfully.');
                        router.replace('/projects');

                    } else if (data?.status === "error") {
                        // Handle API error response if token exchange failed
                        toast.error(data?.message);
                        router.replace('/');
                    }
                },
                onError: (error) => {
                    // Handle network or unexpected errors
                    console.error('SSO Token fetch failed:', error);
                    toast.success('Failed to fetched token.');
                    router.replace('/');
                }
            });
        } else {
            // If no token present in URL: check if token exists in sessionStorage
            const token = sessionStorage.getItem('token');
            if (!token) {
                // No token found → redirect to login
                router.replace('/');
            } else if (pathname === '/') {
                // Already logged in but accidentally landed on root → redirect to projects
                router.replace('/projects');
            }
        }
    }, [getSSOToken, pathname, router, searchParams]);
    // Show loader while fetching token
    if (isPending) return <Loader message='Fetching User Data...' />;

}

export default SSOPage;
