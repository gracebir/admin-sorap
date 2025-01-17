"use client";

import React, { useState } from "react";
import { useGetAllEventQuery } from "@/lib/features/slice/event/eventSlice";
import Link from "next/link";
import Button from "../common/buttons/Button";
import TableData from "./table-data/TableData";
import { ImWarning } from "react-icons/im";

const ITEMS_PER_PAGE = 4;

const ListEvent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: events, isLoading } = useGetAllEventQuery(null);

  const totalPages = Math.ceil((events?.data?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPackages = events?.data?.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-28">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {events?.data.length === 0 ? (
        <div className="h-[70svh] flex items-center justify-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold">Oops, Pas Evenements Enregistrer</h1>
            <ImWarning size={80} />
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/events/create-event"}
            >
              Creer un evenement
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start gap-8 md:gap-10">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-primary">
              Nos Evenement
            </h1>

            <Link href={"/admin/events/create-event"}>
              <Button text="Add event" />
            </Link>
          </div>

          <TableData currentEvents={currentPackages!} />

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListEvent;
