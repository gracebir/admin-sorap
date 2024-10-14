/** @format */

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardChart: React.FC = () => {
    const options: ApexOptions = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
            animations: {
                enabled: false,
            },
        },
        colors: ["#000", "#90CAF9"],
        stroke: {
            width: [3, 3],
            curve: "smooth",
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            labels: {
                style: {
                    colors: "#718096",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: ["#718096"],
                    fontSize: "12px",
                },
                formatter: (value: number) => {
                    return value >= 1000000
                        ? `${value / 1000000}M`
                        : value.toString();
                },
            },
            min: 0,
            max: 30000000,
            tickAmount: 3,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: "#E2E8F0",
            strokeDashArray: 5,
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (value: number) => {
                    return value.toLocaleString();
                },
            },
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6,
            },
        },
    };

    const series = [
        {
            name: "Current Week",
            data: [
                12000000, 10000000, 8000000, 11000000, 15000000, 17000000,
                19000000,
            ],
        },
        {
            name: "Previous Week",
            data: [
                8000000, 15000000, 17000000, 13000000, 11000000, 16000000,
                22000000,
            ],
        },
    ];

    return (
        <div className='w-full bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-3'>
            <div className='flex items-center mb-6'>
                <button className='md:text-sm text-sm font-semibold text-gray-800 mr-4 pb-2 border-b-2 border-gray-800'>
                    Total Users
                </button>
                <button className='md:text-sm text-sm text-gray-500 mr-4 pb-2'>
                    Total Projects
                </button>
                <button className='md:text-sm text-sm text-gray-500 pb-2'>
                    Operating Status
                </button>
            </div>
            <div className='flex justify-end mb-4'>
                <div className='flex items-center mr-4'>
                    <div className='w-3 h-3 bg-black rounded-full mr-2'></div>
                    <span className='text-sm text-gray-600'>Current Week</span>
                </div>
                <div className='flex items-center'>
                    <div className='w-3 h-3 bg-blue-300 rounded-full mr-2'></div>
                    <span className='text-sm text-gray-600'>Previous Week</span>
                </div>
            </div>
            <Chart options={options} series={series} type='line' height={400} />
        </div>
    );
};

export default DashboardChart;
