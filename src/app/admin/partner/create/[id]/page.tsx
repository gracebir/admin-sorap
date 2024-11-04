/** @format */

import FormEditPartner from "@/components/partner/update/FormEditPartner";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function UpdatePartner({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <FormEditPartner id={parseInt(id)} />
        </main>
    );
}
