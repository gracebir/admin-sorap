/** @format */

import FormEditProgram from "@/components/program/edit/FormEditProgram";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function EditProgram({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <FormEditProgram id={parseInt(id)} />
        </main>
    );
}
