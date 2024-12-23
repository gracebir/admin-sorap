/** @format */

"use client";

import { formatDateTimeToFrench } from "@/helper/funct";
import {
    useGetEventByIdQuery,
    useLaunchEventMutation,
    useUpdateEventThumbnailMutation,
} from "@/lib/features/slice/event/eventSlice";
import { Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import ModeratorModal from "../add-moderator/ModeratorModal";
import ModeratorData from "../table-data/ModeratorData";
import { toast } from "react-toastify";
import AddSponsor from "../sponsor/AddSponsor";
import SponsorData from "../table-data/SponsorData";
import DefaultButton from "@/components/common/buttons/DefaultButton";

const DetailEvent: React.FC<{ id: number }> = ({ id }) => {
    const { data, isLoading } = useGetEventByIdQuery({ id });

    const [updateThumbnail, { isLoading: loading }] =
        useUpdateEventThumbnailMutation();
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalOpenSponsor, setModalOpenSponsor] = useState(false);
    const [launchEvent, { isLoading: loadingEventLaunch }] =
        useLaunchEventMutation();

    const openModal = () => {
        setIsOpen(true);
    };
    const handleLaunchEvent = async () => {
        try {
            const response = await launchEvent({ id: data?.data.id! }).unwrap();
            if (response) {
                toast.success("Evenement vient etre lancer");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const MAX_SIZE = 2 * 1024 * 1024;
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

    const handleThumbnailUpdate = async () => {
        try {
            const response = await updateThumbnail({
                id: id!,
                event: {
                    thumbnail: selectedFile,
                },
            }).unwrap();
            if (response) {
                toast.success(response.message);
                setTimeout(() => {
                    setThumbnail(null);
                    setSelectedFile(null);
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (isLoading)
        return (
            <div className='min-h-[70svh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
                <div className='relative h-[25rem] w-full max-w-sm overflow-hidden group'>
                    <Image
                        src={thumbnail ? thumbnail : data?.data.thumbnail!}
                        priority
                        width={400}
                        height={400}
                        className='w-full h-full object-contain'
                        alt='thumbnail'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <label
                            htmlFor='thumbnail'
                            className='p-3 bg-white rounded-full cursor-pointer text-gray-800 hover:bg-gray-200 transition-colors duration-300'
                            aria-label='Edit image'
                        >
                            <Pen className='w-6 h-6' />
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
                            isLoading={loading}
                            onClick={handleThumbnailUpdate}
                            type='button'
                            variant='primary'
                            text='Sauvergader'
                        />
                    </div>
                )}
            </div>
            <Link
                className='flex text-blue-500 hover:underline gap-1'
                href={"/admin/events"}
            >
                <IoIosArrowRoundBack size={20} />
                <span className='text-sm font-semibold'>
                    Retour à tous les événements
                </span>
            </Link>
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className=' lg:col-span-4 col-span-1 flex flex-col gap-6'>
                    <div className='bg-blue-100 rounded-md p-4 flex flex-col gap-3 items-start'>
                        <span className='px-3 py-1 bg-blue-300 text-xs font-semibold text-gray-600 rounded-xl'>
                            {data?.data.eventType}
                        </span>
                        <h1 className='font-extrabold text-2xl lg:text-3xl text-primary'>
                            {data?.data.theme}
                        </h1>
                    </div>
                    <div>
                        <h3 className='text-lg lg:text-xl font-semibold'>
                            Description
                        </h3>
                        <p className='text-sm'>{data?.data.description}</p>
                    </div>
                </div>
                <div className='lg:col-span-2 col-span-1'>
                    <div className='w-full shadow-sm rounded-md p-4 flex flex-col gap-6 lg:p-6 border border-blue-100'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <IoCalendarNumberOutline
                                    className='text-blue-400'
                                    size={20}
                                />
                                <span className='text-sm font-semibold'>
                                    Date & heure
                                </span>
                            </div>
                            <div>
                                <p className='text-sm font-medium'>
                                    {formatDateTimeToFrench(
                                        data?.data.start_date!
                                    )}
                                </p>
                                <span className='text-base font-medium'>
                                    ( GMT+2 )
                                </span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row items-start gap-2'>
                                    <IoLocationSharp
                                        className='text-blue-400'
                                        size={20}
                                    />
                                    <span className='text-sm font-semibold'>
                                        Localisation
                                    </span>
                                </div>
                                <span className='text-sm font-medium'>
                                    {data?.data?.location}
                                </span>
                            </div>
                        </div>

                        <button
                            type='button'
                            onClick={handleLaunchEvent}
                            className='px-6 py-3 bg-blue-400 w-full text-sm text-gray-50 rounded-md font-medium hover:bg-blue-900'
                        >
                            {loadingEventLaunch ? (
                                <span className='loading loading-spinner loading-sm'></span>
                            ) : !data?.data.isPublished ? (
                                "Lancer l'événement 🚀"
                            ) : (
                                "Deactiver 😐"
                            )}
                        </button>
                    </div>
                    <div className='p-2'>
                        <button
                            onClick={openModal}
                            className='px-6 py-3 bg-primary w-full text-sm text-gray-50 rounded-md font-medium hover:bg-blue-900'
                        >
                            Ajouter Moderateur
                        </button>
                    </div>
                    <div className='p-2'>
                        <p className='text-sm italic font-medium'>
                            Voulez vous ajouter un sponsor?{" "}
                            <button
                                type='button'
                                onClick={() => setModalOpenSponsor(true)}
                                className='text-blue-500 underline'
                            >
                                ajouter
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            {data?.data?.moderators?.length! !== 0 && (
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold text-primary'>
                        Les Moderateurs de l'evenement 🎤{" "}
                    </h3>
                    <ModeratorData moderators={data?.data?.moderators!} />
                </div>
            )}
            {data?.data?.EventSponsor.length !== 0 && (
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold text-primary'>
                        Sponsor de l'evenement 💸{" "}
                    </h3>
                    <SponsorData eventSponsors={data?.data.EventSponsor!} />
                </div>
            )}
            <ModeratorModal
                eventId={data?.data.id!}
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
            />
            <AddSponsor
                eventId={id}
                modalIsOpen={modalOpenSponsor}
                setModelIsOpen={setModalOpenSponsor}
            />
        </div>
    );
};

export default DetailEvent;
