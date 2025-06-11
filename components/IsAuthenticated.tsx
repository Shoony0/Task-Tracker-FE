"use client";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function IsAuthenticated() {

    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/sso') return;
        const token = sessionStorage.getItem("token") || null;
        if (!token && pathname !== '/') {
            window.location.href = '/';
        }
        if (pathname === '/' && token) {
            window.location.href = '/projects';
        }

    }, []);

};

export default IsAuthenticated;
