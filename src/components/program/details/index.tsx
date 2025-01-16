/** @format */
"use client";

import { formatDateTimeToFrench } from "@/helper/funct";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import {
  useGetProgramByIdQuery,
  useLaunchProgramMutation,
  useUpdateProgramThumbnailMutation,
} from "@/lib/features/slice/program/programSlice";
import { Pen } from "lucide-react";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { HiMiniLanguage } from "react-icons/hi2";

const DetailProgram: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading } = useGetProgramByIdQuery({ id });
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [updateThumbnail, { isLoading: updateThumbnailLoading }] =
    useUpdateProgramThumbnailMutation();

  const [launchProgram, { isLoading: loadingLaunch }] =
    useLaunchProgramMutation();

  const handleLaunchProgram = async () => {
    try {
      const response = await launchProgram({ id: id }).unwrap();
      if (response) {
        toast.success("Etat du programme change");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        alert("File size exceeds 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);

      setSelectedFile(file);
    }
  };

  const handleThumbnailUpdate = async () => {
    try {
      const id = data?.data?.id;

      if (!id) {
        throw new Error("Program ID is undefined.");
      }
      const response = await updateThumbnail({
        id: id,
        thumbnail: selectedFile,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setTimeout(() => {
          setThumbnail(null);
          setSelectedFile(null);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[70svh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  const formattedDate = data?.data?.date_from
    ? formatDateTimeToFrench(data.data.date_from)
    : "Date not available";
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="relative h-[25rem] w-full max-w-sm overflow-hidden group">
          {data?.data.thumbnail && (
            <Image
              src={thumbnail ? thumbnail : data?.data.thumbnail}
              priority
              width={400}
              height={400}
              className="w-full h-full object-contain"
              alt="thumbnail"
            />
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label
              htmlFor="thumbnail"
              className="p-3 bg-white rounded-full cursor-pointer text-gray-800 hover:bg-gray-200 transition-colors duration-300"
              aria-label="Edit image"
            >
              <Pen className="w-6 h-6" />
              <input
                type="file"
                id="thumbnail"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        {thumbnail && (
          <div className="flex items-center gap-4">
            <DefaultButton
              type="button"
              variant="cancel"
              text="Annuler"
              onClick={() => {
                setTimeout(() => {
                  setThumbnail(null);
                  setSelectedFile(null);
                }, 1500);
              }}
            />
            <DefaultButton
              isLoading={updateThumbnailLoading}
              onClick={handleThumbnailUpdate}
              type="button"
              variant="primary"
              text="Sauvergader"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link
          className="flex text-blue-500 hover:underline gap-1"
          href={"/admin/program"}
        >
          <IoIosArrowRoundBack size={20} />
          <span className="text-sm font-semibold">
            Retour à tous les programmes
          </span>
        </Link>
        {data?.data.ProgramTranslation.length !== 2 && (
          <Link
            className="flex px-6 py-3 duration-300 items-center rounded-md bg-blue-600 text-white hover:bg-primary gap-1"
            href={`/admin/program/create-program/translation/${id}`}
          >
            <HiMiniLanguage size={20} />
            <span className="text-sm font-semibold">Traduire en Anglais</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className=" lg:col-span-4 col-span-1 flex flex-col gap-6">
          <div className="bg-blue-100 rounded-md p-4 flex flex-col gap-3 items-start">
            <span className="px-3 py-1 bg-blue-300 text-xs font-semibold text-gray-600 rounded-xl">
              FORMATION
            </span>
            <h1 className="font-extrabold text-2xl lg:text-3xl text-primary">
              {data?.data.ProgramTranslation[0].title}
            </h1>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-semibold">Description</h3>
            <p className="text-sm">
              {data?.data.ProgramTranslation[0].description}
            </p>
            <Link
              className="text-blue-500 underline text-sm font-semibold"
              href={`/admin/program/edit/translate/${data?.data.ProgramTranslation[0].id}`}
            >
              modifier la traduiction
            </Link>
          </div>
          {data?.data.ProgramTranslation.length === 2 && (
            <>
              <h1 className="text-blue-600 text-xl font-semibold underline">
                Traduction en Anglais
              </h1>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">
                  {data?.data.ProgramTranslation[1].title}
                </h1>

                <div>
                  <h3 className="text-lg lg:text-xl font-semibold my-4">
                    Description
                  </h3>
                  <p className="text-sm">
                    {data?.data.ProgramTranslation[1].description}
                  </p>
                  <Link
                    className="text-blue-500 underline text-sm font-semibold"
                    href={`/admin/events/edit/translate/${data?.data.ProgramTranslation[1].id}`}
                  >
                    Update translation
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-2 col-span-1">
          <div className="w-full shadow-sm rounded-md p-4 flex flex-col gap-6 lg:p-6 border border-blue-100">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <IoCalendarNumberOutline className="text-blue-400" size={20} />
                <span className="text-sm font-semibold">Date & heure</span>
              </div>
              <div>
                <p className="text-sm font-medium">{formattedDate}</p>
                <span className="text-base font-medium">( GMT+2 )</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLaunchProgram}
              className="px-6 py-3 bg-blue-400 w-full text-sm text-gray-50 rounded-md font-medium hover:bg-blue-900"
            >
              {loadingLaunch ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : !data?.data.isLaunched ? (
                "Lancer programme 🚀"
              ) : (
                "Deactiver 😐"
              )}
            </button>
          </div>
          <div className="p-2">
            <button className="px-6 py-3 bg-primary w-full text-sm text-gray-50 rounded-md font-medium hover:bg-blue-900">
              Ajouter Titeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProgram;
