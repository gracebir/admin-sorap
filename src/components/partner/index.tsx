/** @format */
"use client";
import { useGetAllPartnersQuery } from "@/lib/features/slice/partner/parterSlice";
import React from "react";
import ParnerTableData from "./data";
import { ImWarning } from "react-icons/im";
import Link from "next/link";

const ListPartner = () => {
    const { data: partner, isLoading } = useGetAllPartnersQuery(null);
    if (isLoading)
        return (
            <div className='flex justify-center min-h-28'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div>
            {partner?.data?.length !== 0 ? (
                <>
                    <div className='flex justify-between items-center mb-2'>
                        <Link
                            className='bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800'
                            href={"/admin/partner/create"}
                        >
                            Ajouter Partenaire
                        </Link>
                    </div>

                    <ParnerTableData partners={partner?.data!} />
                </>
            ) : (
                <div className='h-[70svh] flex items-center justify-center'>
                    <div className='flex items-center flex-col gap-2'>
                        <h1 className='font-bold'>
                            Oops, Aucun Partenaire Enregistrer
                        </h1>
                        <ImWarning size={80} />
                        <Link
                            className='bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800'
                            href={"/admin/partner/create"}
                        >
                            Ajouter Partenaire
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListPartner;
