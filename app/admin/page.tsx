'use client'

import React from 'react';
import Heading from '../utils/Heading';
import AdminProtected from '../hooks/adminProtected';
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar';
import DashboardHeader from '../components/Admin/DashboardHeader';

type Props = {
    // Define props here if needed
};

const Page = (props: Props) => {
    return (
        <AdminProtected>
            <div>
                <Heading
                    title="Admin" description="E-Learning is a platform for students to learn and get help from teachers"
                    keywords='Courses'
                />
            </div>
            <div className={`flex h-screen`}>
                {/* Add other sidebar items/components here */}
                <div className="flex flex-col text-white" style={{ backgroundColor: "rgb(37 47 72)" }}>
                    <AdminSidebar />
                </div>
                {/* Main content of the profile page */}
                <div className="flex-1 bg-slate-900 overflow-y-auto">
                    <DashboardHeader />
                </div>
            </div>
        </AdminProtected>
    );
}

export default Page;
