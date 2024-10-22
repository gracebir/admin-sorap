/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import React, { useState } from "react";
import ThumbEvent from "@/assets/event.jpeg";
import Image from "next/image";
// import { events, TabItems } from "@/utils/constasts";
import EventTile from "@/components/event/EventTile";
import Link from "next/link";
import TableData from "@/components/event/table-data/TableData";

function Events() {
    // const [activeTab, setActiveTab] = useState("upcoming");

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

            <TableData />
        </main>
    );
}

export default Events;
