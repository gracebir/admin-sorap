/** @format */

import FormEditInstructor from "@/components/instructor/edit/FormEditInstructor";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function EditInstructor({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <FormEditInstructor id={parseInt(id)} />
        </main>
    );
}
