/** @format */
"use client";
import { SidebarItems } from "@/utils/constasts";
import React from "react";
import SidebarButton from "./common/buttons/SidebarButton";

const Sidebar = () => {
    return (
        <aside className='bg-primary text-white lg:w-full w-auto duration-300 max-w-[240px] h-full'>
            <div className='mt-24 flex flex-col items-center lg:items-stretch gap-2'>
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
