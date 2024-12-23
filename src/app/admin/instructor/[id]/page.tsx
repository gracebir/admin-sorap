/** @format */

import DetailInstructor from "@/components/instructor/detail/DetailInstructor";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function page({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <DetailInstructor id={id} />
        </main>
    );
}
