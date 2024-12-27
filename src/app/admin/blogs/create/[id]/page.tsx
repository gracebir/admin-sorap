/** @format */

import EditBlog from "@/components/blog/edit/EditBlog";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface BlogEditProp {
    params: Params;
}

export default function EditBlogPage({ params }: BlogEditProp) {
    const { id } = params;
    return (
        <main>
            <EditBlog id={parseInt(id)} />
        </main>
    );
}
