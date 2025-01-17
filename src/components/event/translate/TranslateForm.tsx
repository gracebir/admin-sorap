/** @format */

"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import {
  useCreateTranslationMutation,
  useGetEventByIdQuery,
} from "@/lib/features/slice/event/eventSlice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const TranslateForm: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading: loading } = useGetEventByIdQuery({ id });
  const router = useRouter();
  const [createTranslation, { isLoading, isError, error }] =
    useCreateTranslationMutation();

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        theme: "",
        description: "",
      },
      onSubmit: async (value, { resetForm }) => {
        try {
          const newValue = {
            ...value,
            eventId: id,
            language: "en",
          };
          const response = await createTranslation(newValue).unwrap();
          if (response.status === "success") {
            toast.success(response.message);
            setTimeout(() => {
              router.push(`/admin/events/${id}`);
            }, 2000);
          }
        } catch (error) {
          console.log(error);
          toast.error("Il y a un erreur");
        } finally {
          resetForm();
        }
      },
    });

  if (loading)
    return (
      <div className="min-h-[70svh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-xl md:text-2xl ">
        Traduise l&lsquo;evenement en Anglais:{" "}
        <span className="font-bold text-lightBlue">{data?.data.theme}</span>
      </h1>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Voici la description</h3>
        <p className="text-sm leading-6">{data?.data.description}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5"
      >
        <div className="lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md">
          <div className="px-6 py-2 border-b border-gray-300">
            <h3 className="text-sm lg:text-base font-semibold">
              Infomation sur l&lsquo;evenement
            </h3>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <FormGroup variant="col-1">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.theme!}
                  touched={touched.theme!}
                  value={values.theme}
                  name="theme"
                  placeholder="e.g. Evolu du blockchain"
                  handleChange={handleChange}
                  label="Theme de l'evenement"
                  type="text"
                />
              </FormGroup>

              <FormGroup variant="col-1">
                <TextArea
                  handleBlur={handleBlur}
                  error={errors.description!}
                  touched={touched.description!}
                  value={values.description}
                  name="description"
                  placeholder="e.g. Nous voulons offre un apercu sur..."
                  handleChange={handleChange}
                  label="Decriver l&lsquo;evenement"
                />
              </FormGroup>
            </div>
            {isError && (
              //@ts-expect-error error is due to data structure
              <ErrorMessage text={error?.data?.error_message} />
            )}
            <div className="flex justify-end">
              <Button type="submit" text="Enregistrer" isLoading={isLoading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TranslateForm;
