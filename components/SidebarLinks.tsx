'use client';

import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from "@/store/hooks";
import { setActivePage } from "@/store/slices/sidebarSlice";
import { SidebarLinksList as links } from '@/utils/data';

function SidebarLinks({ params, userRole }: Readonly<{ params: string, userRole: string[] }>) {
    const dispatch = useAppDispatch();
    return (
        <>
            {
                links.map((link) => {
                    const { id, name } = link;
                    if (userRole?.includes("admin") || name != "Users") {
                        return (
                            <li key={id}>
                                <Link href={`/${id}`} className={params === `/${id}` ? "active" : ""} onClick={() => dispatch(setActivePage(id))}>
                                    {name}
                                </Link>
                            </li>
                        );
                    };

                })
            }
        </>
    )

}

export default SidebarLinks;
