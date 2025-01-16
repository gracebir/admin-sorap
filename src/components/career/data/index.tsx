"use client";
import { useGetCareersQuery } from "@/lib/features/slice/career/careerSlice";
import React, { useState } from "react";
import HeaderCareer from "./HeaderCareer";
import JobColumn from "./column";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ImWarning } from "react-icons/im";

const ITEMS_PER_PAGE = 8;

const ListJobs = () => {
  const { data, isLoading } = useGetCareersQuery(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = data?.data.slice(startIndex, endIndex);

  if (isLoading)
    return (
      <div className="flex justify-center min-h-28">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div>
      {data?.data.length === 0 ? (
        <div className="h-[70svh] flex items-center justify-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold">Oops, Aucun Partenaire Enregistrer</h1>
            <ImWarning size={80} />
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/blogs/create"}
            >
              Ajouter un Job
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/career/create"}
            >
              Creer un Job
            </Link>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <HeaderCareer />
              <tbody>
                {currentJobs?.map((item) => (
                  <JobColumn
                    key={item.id}
                    id={item.id!}
                    title={item.title}
                    description={item.description}
                    jobType={item.jobType}
                  />
                ))}
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, data?.data?.length || 0)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {data?.data?.length || 0}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.max(page - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === i + 1
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.min(page + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListJobs;
