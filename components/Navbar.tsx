"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useAppDispatch } from "@/store/hooks";
import { setSidebarOpen } from "@/store/slices/sidebarSlice";
import { useFetchUserProfile } from '@/api/users';
import Loader from './Loader';
import { setUserRole } from '@/store/slices/userSlice';

function Navbar() {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { data: profileData, isLoading } = useFetchUserProfile();
    if (isLoading || !profileData) return <Loader message='Loading profile...' />;

    dispatch(setUserRole(profileData.roles.map((user_role) => user_role.name)));



    const navbar_style = { color: "#c8e6c9", textDecoration: 'none' };
    return (
        <header>
            <div className="hamburger" onClick={() => dispatch(setSidebarOpen())}>&#9776;</div>
            <div className="logo"><Link href="/projects" style={navbar_style}>🚀 Task Tracker</Link></div>
            <div className="profile-icon" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>{profileData.first_name.charAt(0)}{profileData.last_name.charAt(0)}</div>
            <div className={isProfileDropdownOpen ? "profile-dropdown active" : "profile-dropdown"} id="profileDropdown">
                <ul>
                    <li><Link href='/profile/me' style={navbar_style}>Profile</Link></li>
                    <li><Link href='/logout' style={navbar_style}>Logout</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar
