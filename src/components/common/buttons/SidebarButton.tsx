/** @format */
"use client";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

const SidebarButton: React.FC<{
    Icon: IconType;
    name: string;
    pathname: string;
    text: string;
}> = ({ Icon, name, pathname, text }) => {
    const currentPath = usePathname();

    return (
        <Link
            href={pathname}
            className={`w-full flex items-center gap-4 px-6 py-2 ${
                currentPath.includes(name) && "border-r-[5px]"
            } hover:bg-secondary border-active`}
        >
            <Icon size={23} />
            <span className='text-base font-semibold'>{text}</span>
        </Link>
    );
};

export default SidebarButton;
