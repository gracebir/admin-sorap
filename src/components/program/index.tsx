/** @format */
"use client";

import React, { useState } from "react";
import DataProgram from "./data";
import { ImWarning } from "react-icons/im";
import { useGetAllProgramsQuery } from "@/lib/features/slice/program/programSlice";
import Datepicker from "react-tailwindcss-datepicker";
import { RiFilterLine } from "react-icons/ri";
import Link from "next/link";

const ProgramData = () => {
  const { data, isLoading } = useGetAllProgramsQuery(null);
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  if (isLoading)
    return (
      <div className="flex justify-center min-h-28">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  const hasProgram = data?.data && data.data.length > 0;
  return (
    <div>
      {hasProgram ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/program/create-program"}
            >
              Nouveau Programme
            </Link>
            <div className=" flex flex-col gap-1 items-start max-w-lg">
              <div className="flex items-center gap-2">
                <RiFilterLine size={20} />{" "}
                <span className="text-sm">Filtre par Date</span>
              </div>
              <Datepicker
                containerClassName={""}
                primaryColor="green"
                value={value}
                onChange={(newValue) => setValue(newValue!)}
              />
            </div>
          </div>

          <DataProgram programs={data?.data} />
        </>
      ) : (
        <div className="h-[70svh] flex items-center justify-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold">Oops, Pas Programme Enregistrer</h1>
            <ImWarning size={80} />
            <Link
              className="bg-primary text-white text-sm px-6 py-2 font-semibold duration-300 rounded-3xl hover:bg-blue-800"
              href={"/admin/program/create-program"}
            >
              Creer un programme
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramData;
