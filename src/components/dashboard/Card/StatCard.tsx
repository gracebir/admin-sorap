/** @format */

import { StatCardType } from "@/types/dashboard";
import { HiMiniArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import React from "react";
import { formatNumber, formatRate } from "@/helper/funct";

const StatCard: React.FC<StatCardType> = ({ title, count, rate }) => {
    return (
        <div className='h-[112px] w-full rounded-md shadow-lg p-6 flex flex-col gap-6 border border-gray-200'>
            <h5 className='text-base font-semibold'>{title}</h5>
            <div className='flex justify-between'>
                <h4 className='text-2xl md:text-3xl font-semibold'>
                    {formatNumber(count)}
                </h4>
                <div
                    className={`flex flex-row gap-1 items-center ${
                        rate > 0 ? "text-green-800" : "text-red-500"
                    }`}
                >
                    <span className='text-xs font-thin'>
                        {formatRate(rate)}
                    </span>
                    {rate > 0 ? (
                        <HiArrowTrendingUp size={16} />
                    ) : (
                        <HiMiniArrowTrendingDown size={16} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
