"use client";

import Link from 'next/link';
import { useState } from 'react'
import { useAppDispatch } from "@/store/hooks";
import { setSidebarOpen } from "@/store/slices/sidebarSlice";
import { getAccessJWTTokenData } from '@/utils/actions';

function Navbar() {
    // State to handle profile dropdown visibility
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    
    const { short_name } = getAccessJWTTokenData();   

    const navbar_style = { color: "#c8e6c9", textDecoration: 'none' };
    return (
        <header>
            <div className="hamburger" onClick={() => dispatch(setSidebarOpen())}>&#9776;</div>
            <div className="logo"><Link href="/projects" style={navbar_style}>🚀 Task Tracker</Link></div>
            <div className="profile-icon" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>{short_name.toUpperCase()}</div>
            <div className={isProfileDropdownOpen ? "profile-dropdown active" : "profile-dropdown"} id="profileDropdown">
                <ul>
                    <Link href='/profile/me' style={navbar_style}><li>Profile</li></Link>
                    <Link href='/logout' style={navbar_style}><li>Logout</li></Link>
                </ul>
            </div>
        </header>
    )
}

export default Navbar
