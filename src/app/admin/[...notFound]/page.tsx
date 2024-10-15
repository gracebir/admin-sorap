/** @format */

import Image from "next/image";
import React from "react";
import notfound from "@/assets/notfound.svg";

export default function NotFound() {
    return (
        <main className='w-full'>
            <div className='max-w-4xl mx-auto'>
                <Image
                    className='w-full h-[43.75rem]'
                    src={notfound}
                    alt='not found'
                />
            </div>
        </main>
    );
}
