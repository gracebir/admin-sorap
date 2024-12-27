/** @format */
"use client";
import { SidebarItems } from "@/utils/constasts";
import React, { useState } from "react";
import SidebarButton from "./common/buttons/SidebarButton";
import { LuArrowRightLeft } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";
import { useSignOutMutation } from "@/lib/features/slice/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [signout, { isLoading }] = useSignOutMutation();
    const handleSignout = async () => {
        try {
            const response = await signout({}).unwrap();
            if (response.status === "success") {
                toast.success("", response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <aside
            className={`bg-primary text-white transition-all flex flex-col justify-between duration-300 ${
                isOpen ? "w-full" : "w-auto"
            } duration-300 max-w-[300px] h-full top-0 bottom-0`}
        >
            <div>
                <div className='p-4 flex justify-center md:justify-end'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='bg-secondary p-2 rounded-md'
                        type='button'
                    >
                        <LuArrowRightLeft size={20} />
                    </button>
                </div>
                <div className='mt-24 flex flex-col items-center lg:items-stretch gap-2'>
                    {SidebarItems.map((item) => (
                        <SidebarButton
                            key={item.name}
                            Icon={item.Icon}
                            name={item.name}
                            pathname={item.path}
                            text={item.text}
                            isOpen={isOpen}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={handleSignout}
                className='w-full bg-secondary flex items-center gap-4 hover:bg-active px-6 py-4 my-2'
                type='button'
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className='loading loading-spinner loading-sm'></span>
                ) : (
                    <>
                        <SlLogout size={23} />
                        <span
                            className={`text-sm md:text-base font-semibold ${
                                isOpen ? "hidden md:block" : "md:hidden hidden"
                            }`}
                        >
                            Deconnection
                        </span>
                    </>
                )}
            </button>
        </aside>
    );
};

export default Sidebar;
