/** @format */

import React from "react";

const TableHeader = () => {
    return (
        <thead className='bg-white m-2'>
            <tr className='bg-gray-50 p-4'>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Titre
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Prix
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;
