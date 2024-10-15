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
    isOpen?: boolean;
}> = ({ Icon, name, pathname, text, isOpen = false }) => {
    const currentPath = usePathname();

    return (
        <Link
            href={pathname}
            className={`w-full flex items-center gap-4 px-6 py-4 ${
                currentPath.includes(name) && "border-r-[5px] bg-secondary"
            } hover:bg-secondary border-active`}
        >
            <Icon size={23} />
            <span
                className={`text-base font-semibold ease-in-out duration-300 ${
                    isOpen ? "hidden md:block" : "md:hidden hidden"
                }`}
            >
                {text}
            </span>
        </Link>
    );
};

export default SidebarButton;
