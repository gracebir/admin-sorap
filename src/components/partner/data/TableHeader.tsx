/** @format */

import React from "react";

const HeadPartner = () => {
    return (
        <thead className='bg-white m-2'>
            <tr className='bg-gray-200 text-left p-4'>
                <th className='min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider'>
                    Nom
                </th>
                <th className='min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider'>
                    Postnom
                </th>
                <th className='min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider'>
                    Email
                </th>
                <th className='min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider'>
                    Company
                </th>
                <th className='min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider'>
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default HeadPartner;
