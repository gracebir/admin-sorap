/** @format */

import DetailEvent from "@/components/event/details/EventDetail";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface EventDetailProp {
    params: Params;
}

export default function EventDetail({ params }: EventDetailProp) {
    const { id } = params;
    return (
        <main className=''>
            <DetailEvent id={id} />
        </main>
    );
}
