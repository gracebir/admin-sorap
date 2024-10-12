/** @format */

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const token = await cookies().get("jwt")?.value;
    if (!token) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.set("jwt", "", { maxAge: -1, path: "/" });

        return response;
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
