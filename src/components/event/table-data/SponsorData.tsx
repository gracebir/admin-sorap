/** @format */

"use client";
import { EventSponsor } from "@/types/event";
import React, { useState } from "react";
import EditSponsor from "../sponsor/EditSponsor";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";

const ITEMS_PER_PAGE = 4;

const SponsorData: React.FC<{
    eventSponsors: Array<EventSponsor>;
}> = ({ eventSponsors }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState<EventSponsor | null>(null);

    const totalPages = Math.ceil((eventSponsors?.length || 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPackages = eventSponsors?.slice(startIndex, endIndex);
    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-white m-2'>
                    <tr className='bg-gray-50 p-4'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            ID
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Logo
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Company
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            amount
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {currentPackages?.map((sponsor, index) => (
                        <tr key={index}>
                            <td className='px-6 py-4 text-sm whitespace-nowrap  text-gray-500'>
                                {sponsor.id}
                            </td>
                            <td className='px-6 py-4  whitespace-nowrap'>
                                <div className='text-sm flex gap-2 items-center font-medium text-gray-900'>
                                    <Image
                                        width={150}
                                        height={40}
                                        className=' h-11'
                                        alt='avatar'
                                        src={sponsor.pattern.avatar}
                                    />
                                </div>
                            </td>

                            <td className='px-6 py-4 text-sm whitespace-nowrap'>
                                {sponsor.pattern.company}
                            </td>
                            <td className='px-6 py-4 text-sm whitespace-nowrap'>
                                {sponsor.amount}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <span className='tooltip' data-tip='Modifier'>
                                    <button
                                        onClick={() => {
                                            setProfile({
                                                ...sponsor,
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
                                {Math.min(endIndex, eventSponsors?.length!)}
                            </span>{" "}
                            of{" "}
                            <span className='font-medium'>
                                {eventSponsors?.length}
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

            <EditSponsor
                id={profile?.id!}
                amount={profile?.amount!}
                company={profile?.pattern.company!}
                note={profile?.note!}
                modalIsOpen={isModalOpen}
                setModelIsOpen={setIsModalOpen}
                patternId={profile?.patternId!}
            />
        </div>
    );
};

export default SponsorData;
