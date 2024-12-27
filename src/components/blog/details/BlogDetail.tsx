/** @format */

"use client";

import { useGetBlogByIdQuery } from "@/lib/features/slice/blog/blogSlice";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "@/app/markdown-styles.module.css";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPenToSquare } from "react-icons/fa6";

const BlogDetail: React.FC<{ id: number }> = ({ id }) => {
    const { data, isLoading } = useGetBlogByIdQuery({ id });

    if (isLoading)
        return (
            <div className='min-h-[70svh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
                <Link
                    className='flex text-blue-500 hover:underline gap-1'
                    href={"/admin/blogs"}
                >
                    <IoIosArrowRoundBack size={20} />
                    <span className='text-sm font-semibold'>
                        Retour au blogs
                    </span>
                </Link>

                <Link
                    className='flex bg-blue-600 text-white duration-300 rounded-md hover:bg-primary px-6 py-3 gap-1 items-center'
                    href={`/admin/blogs/create/${data?.data.id}`}
                >
                    <FaPenToSquare size={20} />
                    <span className='text-sm font-semibold'>
                        Modifier le Blog
                    </span>
                </Link>
            </div>
            <div className='h-[40svh] w-full '>
                <Image
                    className='w-full h-full rounded-md object-cover'
                    src={data?.data.thumbnail!}
                    alt='blog detail'
                    width={400}
                    height={400}
                />
            </div>
            <div>
                <h2 className='text-xl font-bold md:text-2xl '>
                    {data?.data.title}
                </h2>
                {data?.data.content && (
                    <ReactMarkdown
                        className={style.reactMarkDown}
                        remarkPlugins={[remarkGfm]}
                    >
                        {data.data.content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
