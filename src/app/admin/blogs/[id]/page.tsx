/** @format */

import BlogDetail from "@/components/blog/details/BlogDetail";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface BlogDetailProp {
    params: Params;
}

export default function BlogDetailPage({ params }: BlogDetailProp) {
    const { id } = params;
    return (
        <main>
            <BlogDetail id={parseInt(id)} />
        </main>
    );
}
