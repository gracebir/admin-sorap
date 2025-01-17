/** @format */

import Header from "@/components/Header";
import ProtectedPage from "@/components/ProtectedPage";
import Sidebar from "@/components/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedPage>
      <div className="h-svh w-full flex">
        <Sidebar />
        <div className="flex-1 h-svh overflow-y-auto">
          <Header />
          <div className="px-8 py-6 md:px-12 md:py-10">{children}</div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default AdminLayout;
