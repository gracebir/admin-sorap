/** @format */

import React from "react";

const InstructortableHeader = () => {
    return (
        <thead className='bg-white m-2'>
            <tr className='bg-gray-50 p-4'>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Nom
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Postnom
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Email
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default InstructortableHeader;
