/** @format */

import StatCard from "@/components/dashboard/Card/StatCard";
import DashboardChart from "@/components/dashboard/chart/DashboardChart";
import TopSellingProductsTable from "@/components/dashboard/topsell/TopSell";
import { products } from "@/utils/constasts";
import React from "react";

export default function Dashbord() {
    return (
        <main className='flex flex-col gap-6 lg:gap-8'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8'>
                <StatCard count={7000} rate={0.54} title='Views' />
                <StatCard count={7000} rate={-0.54} title='Visits' />
                <StatCard count={7000} rate={0.54} title='News Users' />
                <StatCard count={7000} rate={-0.54} title='Active Users' />
            </div>
            <div className='grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-6'>
                <DashboardChart />
                <div className='shadow-lg col-span-1'></div>
            </div>
            <TopSellingProductsTable products={products} />
        </main>
    );
}
