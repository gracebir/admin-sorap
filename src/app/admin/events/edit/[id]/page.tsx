/** @format */

import FormEdit from "@/components/event/edit/FormEdit";
import { Parameter } from "@/type";
import React from "react";

export default function Edit({ params }: Parameter) {
    const { id } = params;
    return (
        <main>
            <FormEdit id={parseInt(id)} />
        </main>
    );
}
