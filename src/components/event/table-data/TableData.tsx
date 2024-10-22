/** @format */
"use client";
import React, { useState } from "react";
import { Eye, Trash2, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllEventQuery } from "@/lib/features/slice/event/eventSlice";
import { formatDateTimeToFrench } from "@/helper/funct";

interface Package {
    name: string;
    price: number;
    invoiceDate: string;
    status: "Paid" | "Unpaid" | "Pending";
}

const ITEMS_PER_PAGE = 4;

export default function TableData() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: events, isLoading } = useGetAllEventQuery(null);
    console.log(events);

    const totalPages = Math.ceil((events?.data?.length || 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPackages = events?.data?.slice(startIndex, endIndex);

    if (isLoading)
        return (
            <div className='flex justify-center min-h-28'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-white m-2'>
                    <tr className='bg-gray-50 p-4'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Theme
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Addresse
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Date de lancement
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {currentPackages?.map((event, index) => (
                        <tr key={index}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm font-medium text-gray-900'>
                                    {event.theme}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    <span className='font-semibold'>Prix</span>$
                                    {event.price}
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {event.location}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                {formatDateTimeToFrench(event.start_date)}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <button className='text-gray-400 hover:text-gray-500 mr-2'>
                                    <Eye size={18} />
                                </button>
                                <button className='text-gray-400 hover:text-gray-500 mr-2'>
                                    <Trash2 size={18} />
                                </button>
                                <button className='text-gray-400 hover:text-gray-500'>
                                    <Download size={18} />
                                </button>
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
                                {Math.min(endIndex, events?.data?.length!)}
                            </span>{" "}
                            of{" "}
                            <span className='font-medium'>
                                {events?.data?.length}
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
