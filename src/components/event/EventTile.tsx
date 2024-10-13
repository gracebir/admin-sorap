/** @format */

import { EventTitleType } from "@/types/event";
import React, { FC } from "react";
import Button from "../common/buttons/Button";
import Image from "next/image";

const EventTile: FC<EventTitleType> = ({
    title,
    event_date,
    price,
    imageUrl,
    location,
    time_range,
    isEditable = true,
}) => {
    const StrongTitle = ({ text }: { text: string }) => (
        <span className='font-semibold text-primary text-sm lg:text-base'>
            {text}
        </span>
    );
    return (
        <div className='grid grid-cols-1 md:grid-cols-4'>
            <div className='flex items-center gap-4 col-span-1 lg:col-span-2'>
                <div className='max-w-[107px] h-[94px] bg-grayish w-full rounded-md'>
                    <Image
                        src={imageUrl}
                        className='h-full w-full object-cover rounded-md'
                        alt={title}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <h5 className='text-base font-bold md:text-lg'>{title}</h5>
                    <div className='flex space-x-8'>
                        <p>
                            <StrongTitle text='Date' />: {event_date}
                        </p>
                        <p>
                            <StrongTitle text='Time' />: {time_range}
                        </p>
                    </div>
                    <p>
                        <StrongTitle text='Price' />: ${price}
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <p className='col-span-1 md:col-span-1'>
                    <StrongTitle text='Location' />: {location}
                </p>
            </div>
            <div className='col-span-1 md:col-span-1 flex items-center'>
                {isEditable && (
                    <div className='flex gap-4'>
                        <Button text='Edit' />
                        <Button text='Cancel' variant='cancel' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventTile;
