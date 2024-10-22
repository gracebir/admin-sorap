/** @format */

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface EventDetailProp {
    params: Params;
}

export default function EventDetail({ params }: EventDetailProp) {
    const { id } = params;
    return (
        <main className=' '>
            <h1 className='text-2xl font-bold'>{id}</h1>
        </main>
    );
}
