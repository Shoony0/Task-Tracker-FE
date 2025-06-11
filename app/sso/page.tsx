"use client";
import { useGetSSOToken } from '@/api/auth';
import Loader from '@/components/Loader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';


function SSOPage() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { getSSOToken, isPending } = useGetSSOToken();

    useEffect(() => {
        const ssoTempToken = searchParams.get('token');
        const status = searchParams.get('status');

        if (status === 'success' && ssoTempToken) {
            getSSOToken(ssoTempToken, {
                onSuccess: (data) => {
                    if (data?.access) {
                        sessionStorage.setItem('token', data.access);
                        sessionStorage.setItem('refresh', data.refresh);
                        toast.success('Login Successfully.');
                        router.replace('/projects');

                    } else if (data?.status === "error") {
                        toast.error(data?.message);
                        router.replace('/');
                    }
                },
                onError: (error) => {
                    console.error('SSO Token fetch failed:', error);
                    toast.success('Failed to fetched token.');
                    router.replace('/');
                }
            });
        } else {
            const token = sessionStorage.getItem('token');
            if (!token) router.replace('/');
            else if (pathname === '/') router.replace('/projects');
        }
    }, []);
    if (isPending) return <Loader message='Fetching User Data...' />;

}

export default SSOPage;
