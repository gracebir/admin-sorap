/** @format */

import { Parameter } from "@/type";
import React from "react";

export default function Edit({ params }: Parameter) {
    const { id } = params;
    return <main>{id}</main>;
}
