/** @format */
"use client";
import React, { useState } from "react";
import { Eye, Pen, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllEventQuery } from "@/lib/features/slice/event/eventSlice";
import { formatDateTimeToFrench } from "@/helper/funct";
import { MdOutlineAddAPhoto } from "react-icons/md";
import Link from "next/link";

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
                                <Link
                                    href={`/admin/events/${event.id}`}
                                    className='tooltip'
                                    data-tip='Voir detail'
                                >
                                    <button className='text-gray-400 hover:text-gray-500 mr-2'>
                                        <Eye size={18} />
                                    </button>
                                </Link>
                                <Link
                                    href={`/admin/events/edit/${event.id}`}
                                    className='tooltip'
                                    data-tip='Modifier'
                                >
                                    <button className='text-gray-400 hover:text-gray-500 mr-2'>
                                        <Pen size={18} />
                                    </button>
                                </Link>
                                {event.isPublished && (
                                    <Link
                                        href={`/admin/events/edit/images/${event.id}`}
                                        className='tooltip'
                                        data-tip='Ajouter Images'
                                    >
                                        <button className='text-gray-400 hover:text-gray-500 mr-2'>
                                            <MdOutlineAddAPhoto size={18} />
                                        </button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
