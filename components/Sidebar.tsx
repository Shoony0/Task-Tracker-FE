'use client';

import SidebarLinks from './SidebarLinks';
import { useAppSelector } from "@/store/hooks";
import { usePathname } from 'next/navigation';


function Sidebar() {
    const params = usePathname();
    const { isSidebarOpen } = useAppSelector((state) => state.sidebar);  
    const { userRole } = useAppSelector((state) => state.user);    
    return (
        <aside className={isSidebarOpen ? "sidebar active" : "sidebar"}>
            <ul>
                <SidebarLinks params={params} userRole={userRole} />
            </ul>
        </aside>
    )
}

export default Sidebar;
