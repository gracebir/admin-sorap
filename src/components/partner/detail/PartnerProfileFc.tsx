/** @format */
"use client";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import PageTitle from "@/components/common/PageTitle";
import { useUpdateInstructorAvatarMutation } from "@/lib/features/slice/instructor/instructorSlice";
import { useGetPartnerByIdQuery } from "@/lib/features/slice/partner/parterSlice";
import { Camera, Edit } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const PartnerProfileFc: FC<{ id: number }> = ({ id }) => {
    const { data, isLoading: loadingPartner } = useGetPartnerByIdQuery({
        id,
    });
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [updateAvatar, { isLoading: loadingAvatar }] =
        useUpdateInstructorAvatarMutation();

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_SIZE) {
                alert("File size exceeds 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);

            setSelectedFile(file);
        }
    };

    const handleUpdateAvatarMutation = async () => {
        try {
            const response = await updateAvatar({
                id: id,
                avatar: selectedFile,
            }).unwrap();
            if (response) {
                toast.success("Avatar modifier");
                setSelectedFile(null);
                setThumbnail(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loadingPartner)
        return (
            <div className='min-h-[70svh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    return (
        <div className='w-full bg-white'>
            {/* Navigation */}
            <div className='flex justify-end'>
                {thumbnail && (
                    <div className='flex items-center gap-4'>
                        <DefaultButton
                            type='button'
                            variant='cancel'
                            text='Annuler'
                            onClick={() => {
                                setTimeout(() => {
                                    setThumbnail(null);
                                    setSelectedFile(null);
                                }, 1500);
                            }}
                        />
                        <DefaultButton
                            isLoading={loadingAvatar}
                            onClick={handleUpdateAvatarMutation}
                            type='button'
                            variant='primary'
                            text='Sauvergader'
                        />
                    </div>
                )}
            </div>
            <nav className='p-4 text-sm text-gray-600'>
                <div className='max-w-4xl mx-auto flex justify-between items-center'>
                    <PageTitle text='Profile du partenaire' />
                    <Link
                        className='flex text-blue-500 hover:underline gap-1'
                        href={"/admin/partner"}
                    >
                        <IoIosArrowRoundBack size={20} />
                        <span className='text-sm font-semibold'>
                            Retour à la liste
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Profile Card */}
            <div className='max-w-4xl mx-auto px-4'>
                <div className='rounded-lg bg-white shadow-lg'>
                    {/* Header Image */}
                    <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
                        <div className='absolute right-4 top-4'>
                            <Link
                                href={`/admin/partner/create/${id}`}
                                className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-blue-900'
                            >
                                <Edit className='h-4 w-4' />
                                Modifier
                            </Link>
                        </div>

                        <div className='h-full w-full bg-gradient-to-r from-gray-700 to-gray-900' />
                    </div>

                    {/* Profile Content */}
                    <div className='relative px-6 pb-6'>
                        {/* Profile Image */}
                        <div className='absolute -top-[10rem] left-1/2 -translate-x-1/2'>
                            <div className='relative'>
                                <img
                                    src={
                                        thumbnail
                                            ? thumbnail
                                            : data?.data.avatar
                                    }
                                    alt={"nom"}
                                    className='h-32 bg-white shadow-md rounded-lg  object-cover'
                                />
                                <label
                                    htmlFor='thumbnail'
                                    className='absolute bottom-0 cursor-pointer right-0 rounded-full bg-primary p-2 text-white hover:bg-blue-700'
                                >
                                    <Camera className='h-4 w-4' />
                                    <input
                                        type='file'
                                        id='thumbnail'
                                        accept='image/png, image/jpeg, image/jpg'
                                        className='hidden'
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className='mt-20 text-center'>
                            <h1 className='text-2xl font-bold text-gray-900'>
                                {data?.data.firstname} {data?.data.lastname}
                            </h1>
                            <p className='text-gray-600 text-sm font-medium my-1'>
                                {data?.data.email}
                            </p>
                            <p className='text-gray-600 text-sm font-medium'>
                                +{data?.data.phone}
                            </p>

                            <div className='mt-8'>
                                <h2 className='text-lg font-bold text-gray-900'>
                                    Companie
                                </h2>
                                <p className='mt-2 text-gray-600 text-2xl font-medium'>
                                    {data?.data.company}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerProfileFc;
