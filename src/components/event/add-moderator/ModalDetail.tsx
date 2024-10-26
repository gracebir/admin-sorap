/** @format */
"use client";
import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

interface UserProfileModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    user: {
        firstname: string;
        lastname: string;
        avatar: string;
        bio: string;
        email: string;
        phone: string;
    };
}

export default function ModeratorProfile({
    isOpen,
    onRequestClose,
    user,
}: UserProfileModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className='fixed inset-0 flex items-center justify-center p-4'
            overlayClassName='fixed inset-0 bg-black bg-opacity-50'
        >
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
                <div className='flex justify-between items-center p-4 border-b'>
                    <h2 className='text-xl font-semibold'>
                        Profile du Moderateur
                    </h2>
                    <button onClick={onRequestClose}>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className='p-4'>
                    <div className='flex flex-col items-center mb-4'>
                        <div className='relative h-24 w-24 mb-2 rounded-full overflow-hidden'>
                            <Image
                                src={user?.avatar}
                                alt={`${user?.firstname} ${user?.lastname}`}
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                        <h3 className='text-2xl font-bold'>
                            {user?.firstname} {user?.lastname}
                        </h3>
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <h4 className='text-sm font-semibold  text-gray-500'>
                                Bio
                            </h4>
                            <p className='mt-1'>{user?.bio}</p>
                        </div>
                        <div>
                            <h4 className='text-sm font-semibold text-gray-500'>
                                Email
                            </h4>
                            <p className='mt-1'>{user?.email}</p>
                        </div>
                        <div>
                            <h4 className='text-sm font-semibold text-gray-500'>
                                Phone
                            </h4>
                            <p className='mt-1'>{user?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
