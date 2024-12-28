/** @format */

import TranslateForm from "@/components/event/translate/TranslateForm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface Props {
    params: Params;
}

export default function TranslationPage({ params }: Props) {
    const { id } = params;
    return (
        <main>
            <TranslateForm id={parseInt(id)} />
        </main>
    );
}
