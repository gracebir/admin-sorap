/** @format */

"use client";
import React, { useState } from "react";
import { Eye, Pen, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ModeratorProfile from "../add-moderator/ModalDetail";
import { TModeratorProfileType } from "@/types/event";
import EditModeratorModal from "../add-moderator/EditModeratorModal";
const ITEMS_PER_PAGE = 4;

const ModeratorData: React.FC<{
    moderators: Array<{
        id: number;
        firstname: string;
        lastname: string;
        bio: string;
        phone: string;
        avatar: string;
        email: string; // unique constraint handled by Prisma, not TypeScript
        eventId?: number | null;
    }>;
}> = ({ moderators }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState<TModeratorProfileType | null>(null);

    const totalPages = Math.ceil((moderators?.length || 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPackages = moderators?.slice(startIndex, endIndex);

    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-white m-2'>
                    <tr className='bg-gray-50 p-4'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Nom
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Post nom
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Email
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Telephone
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {currentPackages?.map((moderator, index) => (
                        <tr key={index}>
                            <td className='px-6 py-4  whitespace-nowrap'>
                                <div className='text-sm flex gap-2 items-center font-medium text-gray-900'>
                                    <Image
                                        width={40}
                                        height={40}
                                        className='rounded-full h-11 w-11 object-cover'
                                        alt='avatar'
                                        src={moderator.avatar}
                                    />
                                    <span className='text-sm uppercase text-gray-500'>
                                        {moderator.firstname}
                                    </span>
                                </div>
                            </td>
                            <td className='px-6 py-4 text-sm whitespace-nowrap  text-gray-500'>
                                {moderator.lastname}
                            </td>
                            <td className='px-6 py-4 text-sm whitespace-nowrap'>
                                {moderator.email}
                            </td>
                            <td className='px-6 py-4 text-sm whitespace-nowrap'>
                                {moderator.phone}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <span
                                    className='tooltip'
                                    data-tip='Voir detail'
                                >
                                    <button
                                        onClick={() => {
                                            setProfile({
                                                firstname: moderator?.firstname,
                                                lastname: moderator?.lastname,
                                                avatar: moderator?.avatar,
                                                bio: moderator?.bio,
                                                email: moderator?.email,
                                                phone: moderator?.phone,
                                                id: moderator?.id.toString(),
                                            });
                                            setIsModalDetailOpen(true);
                                        }}
                                        className='text-gray-400 hover:text-gray-500 mr-2'
                                    >
                                        <Eye size={18} />
                                    </button>
                                </span>
                                <span className='tooltip' data-tip='Modifier'>
                                    <button
                                        onClick={() => {
                                            setProfile({
                                                firstname: moderator?.firstname,
                                                lastname: moderator?.lastname,
                                                avatar: moderator?.avatar,
                                                bio: moderator?.bio,
                                                email: moderator?.email,
                                                phone: moderator?.phone,
                                                id: moderator?.id.toString(),
                                            });
                                            setIsModalOpen(true);
                                        }}
                                        className='text-gray-400 hover:text-gray-500 mr-2'
                                    >
                                        <Pen size={18} />
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                <div className='flex-1 flex justify-between sm:hidden'>
                    <button
                        onClick={() =>
                            setCurrentPage((page) => Math.max(page - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((page) =>
                                Math.min(page + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                        Next
                    </button>
                </div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <div>
                        <p className='text-sm text-gray-700'>
                            Showing{" "}
                            <span className='font-medium'>
                                {startIndex + 1}
                            </span>{" "}
                            to{" "}
                            <span className='font-medium'>
                                {Math.min(endIndex, moderators?.length!)}
                            </span>{" "}
                            of{" "}
                            <span className='font-medium'>
                                {moderators?.length}
                            </span>{" "}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                            aria-label='Pagination'
                        >
                            <button
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(page - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                            >
                                <span className='sr-only'>Previous</span>
                                <ChevronLeft
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        currentPage === i + 1
                                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(page + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                            >
                                <span className='sr-only'>Next</span>
                                <ChevronRight
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <ModeratorProfile
                user={profile!}
                isOpen={isModalDetailOpen}
                onRequestClose={() => setIsModalDetailOpen(false)}
            />
            <EditModeratorModal
                bio={profile?.bio!}
                email={profile?.email!}
                firstname={profile?.firstname!}
                lastname={profile?.lastname!}
                phone={profile?.phone!}
                modalIsOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                id={profile?.id!}
            />
        </div>
    );
};

export default ModeratorData;
