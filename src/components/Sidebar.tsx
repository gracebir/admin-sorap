/** @format */
"use client";
import { SidebarItems } from "@/utils/constasts";
import React from "react";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
    return (
        <aside className='bg-primary text-white w-full max-w-[240px] h-full'>
            <div className='mt-24 flex flex-col gap-4'>
                {SidebarItems.map((item) => (
                    <SidebarButton
                        key={item.name}
                        Icon={item.Icon}
                        name={item.name}
                        pathname={item.path}
                        text={item.text}
                    />
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
