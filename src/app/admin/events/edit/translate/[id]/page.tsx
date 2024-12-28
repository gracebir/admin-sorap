/** @format */

import EditLangForm from "@/components/event/edit-translation/EditLangForm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface Props {
    params: Params;
}

export default function EditTranslationPage({ params }: Props) {
    const { id } = params;
    return (
        <main>
            <EditLangForm id={parseInt(id)} />
        </main>
    );
}
