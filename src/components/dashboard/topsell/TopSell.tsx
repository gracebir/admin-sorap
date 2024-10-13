/** @format */
import { TopSellingProductsTableProps } from "@/types/dashboard";
import React from "react";

const TopSellingProductsTable: React.FC<TopSellingProductsTableProps> = ({
    products,
}) => {
    return (
        <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                <h2 className='text-xl font-semibold text-gray-800'>
                    Top Selling Products
                </h2>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-50'>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Price
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Quantity
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {products.map((product, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                    {product.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {product.quantity}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    ${product.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingProductsTable;
