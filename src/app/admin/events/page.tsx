/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import React, { useState } from "react";
import ThumbEvent from "@/assets/event.jpeg";
import Image from "next/image";
import { events, TabItems } from "@/utils/constasts";
import EventTile from "@/components/event/EventTile";
import Link from "next/link";

function Events() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <main className='flex flex-col gap-10 md:gap-12'>
            <div className='flex flex-col items-start gap-8 md:gap-10'>
                <h1 className='text-2xl lg:text-3xl font-extrabold text-primary'>
                    Events
                </h1>
                <div className='max-w-[279px] w-full h-[300px] bg-grayish shadow-sm rounded-md flex items-center justify-center'>
                    <Image
                        src={ThumbEvent}
                        alt='events'
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>
                <Link href={"/admin/events/create-event"}>
                    <Button text='Add event' />
                </Link>
            </div>
            <div className='flex flex-col gap-6 md:gap-8'>
                <div className='flex space-x-8'>
                    {TabItems.map((item) => (
                        <button
                            onClick={() => {
                                setActiveTab(item.id);
                            }}
                            className={`text-primary font-bold text-base duration-300 ease-in-out md:text-xl py-4 ${
                                activeTab === item.id
                                    ? "border-b-[4px] border-primary"
                                    : "border-transparent border-b-[4px]"
                            }`}
                            key={item.id}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className='flex flex-col gap-8'>
                    {events.map((item, i) => (
                        <EventTile
                            key={`${item.name}-${i}`}
                            time_range={item.time}
                            event_date={item.date}
                            imageUrl=''
                            location={item.location}
                            price={item.price}
                            title={item.name}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Events;
