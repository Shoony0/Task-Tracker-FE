'use client';

import SidebarLinks from './SidebarLinks';
import { useAppSelector } from "@/store/hooks";
import { getAccessJWTTokenData } from '@/utils/actions';
import { usePathname } from 'next/navigation';


function Sidebar() {
    // Get current URL pathname
    const params = usePathname();
    // Get sidebar open/close state from Redux store
    const { isSidebarOpen } = useAppSelector((state) => state.sidebar);  
    // Get user role from Redux store
    const { roles:userRole } = getAccessJWTTokenData();   
    return (
        <aside className={isSidebarOpen ? "sidebar active" : "sidebar"}>
            <ul>
                <SidebarLinks params={params} userRole={userRole} />
            </ul>
        </aside>
    )
}

export default Sidebar;
