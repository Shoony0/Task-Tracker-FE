import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import "../globals.css";

function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
        </>
    )
}

export default Dashboard
