/** @format */
"use server";

import LoginForm from "@/components/login/LoginForm";
import { getCcookie } from "@/lib";

/** @format */
export default async function Home() {
    const token = await getCcookie();
    return (
        <main className='min-h-svh w-full flex items-center bg-gray-100 px-6 lg:px-0'>
            <LoginForm funct={token!} />
        </main>
    );
}
