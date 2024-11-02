/** @format */

import { TinstructorType } from "@/types/instructor";
import React, { useState } from "react";
import InstructortableHeader from "./InstructortableHeader";
import Column from "./Column";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function InstructorTableData({
    instructors,
}: {
    instructors: Array<TinstructorType>;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((instructors.length || 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentInstructors = instructors?.slice(startIndex, endIndex);
    return (
        <div className='bg-white shadow-md rounded-sm overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <InstructortableHeader />
                <tbody className='bg-white divide-y divide-gray-200'>
                    {currentInstructors?.map((item) => (
                        <Column
                            key={item.id}
                            id={item.id!}
                            firstname={item.firstname}
                            lastname={item.lastname}
                            email={item.email!}
                            avatar={item.avatar}
                        />
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
                                {Math.min(endIndex, instructors?.length!)}
                            </span>{" "}
                            of{" "}
                            <span className='font-medium'>
                                {instructors.length}
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
        </div>
    );
}
