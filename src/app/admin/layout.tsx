/** @format */

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen w-full flex'>
            <Sidebar />
            <div className='flex-1'>
                <Header />
                <div className='overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
