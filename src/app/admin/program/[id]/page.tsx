/** @format */

import DetailProgram from "@/components/program/details";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function ProgramDetail({ params }: { params: Params }) {
    const { id } = params;
    return (
        <main>
            <DetailProgram id={parseInt(id)} />
        </main>
    );
}
