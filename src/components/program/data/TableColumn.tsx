/** @format */

"use client";

import { formatDateTimeToFrench } from "@/helper/funct";
import { Eye, Pen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";

const TableColumn: React.FC<{
    title: string;
    price: number;
    id: number;
    date: string;
    isPublished: boolean;
}> = ({ title, price, id, isPublished, date }) => {
    return (
        <tr>
            <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-base font-medium text-gray-900'>
                    {title}
                </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>{price}</td>
            <td className='px-6 py-4 whitespace-nowrap'>
                {formatDateTimeToFrench(date)}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <Link
                    href={`/admin/program/${id}`}
                    className='tooltip'
                    data-tip='Voir detail'
                >
                    <button className='text-gray-400 hover:text-gray-500 mr-2'>
                        <Eye size={18} />
                    </button>
                </Link>
                <Link
                    href={`/admin/program/edit/${id}`}
                    className='tooltip'
                    data-tip='Modifier'
                >
                    <button className='text-gray-400 hover:text-gray-500 mr-2'>
                        <Pen size={18} />
                    </button>
                </Link>
                {isPublished && (
                    <Link
                        href={`/admin/events/edit/images/${id}`}
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
    );
};

export default TableColumn;
