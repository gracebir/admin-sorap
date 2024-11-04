/** @format */

import PartnerProfileFc from "@/components/partner/detail/PartnerProfileFc";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function PartnerProfile({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <PartnerProfileFc id={parseInt(id)} />
        </main>
    );
}
