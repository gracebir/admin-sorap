"use client";

import { useGetAllBlogQuery } from "@/lib/features/slice/blog/blogSlice";
import Link from "next/link";
import React from "react";
import { ImWarning } from "react-icons/im";
import BlogTableData from "./data";

const ListBlog = () => {
  const { data: blogs, isLoading } = useGetAllBlogQuery(null);

  console.log(blogs?.data);

  if (isLoading)
    return (
      <div className="flex justify-center min-h-28">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div>
      {blogs?.data?.length !== 0 ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/partner/create"}
            >
              Ajouter un Blog
            </Link>
          </div>
          <BlogTableData blogs={blogs?.data!} />
        </>
      ) : (
        <div className="h-[70svh] flex items-center justify-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold">Oops, Aucun Partenaire Enregistrer</h1>
            <ImWarning size={80} />
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/partner/create"}
            >
              Ajouter un blog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBlog;
