"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import {
  useCreateProgramTranslationMutation,
  useGetProgramByIdQuery,
} from "@/lib/features/slice/program/programSlice";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const TranslateFormProgram: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading: loading } = useGetProgramByIdQuery({ id });
  const router = useRouter();
  const [createTranslation, { isLoading, isError, error }] =
    useCreateProgramTranslationMutation();

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      onSubmit: async (value, { resetForm }) => {
        try {
          const newValue = {
            ...value,
            programId: id,
          };
          const response = await createTranslation(newValue).unwrap();
          if (response.status === "success") {
            toast.success(response.message);
            setTimeout(() => {
              router.push(`/admin/program/${id}`);
            }, 2000);
          }
        } catch (error) {
          toast.error("Un erreur se produit");
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
        Traduise ce program en Anglais:{" "}
        <span className="font-bold text-lightBlue">{data?.data.title}</span>
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
              Infomation sur le programme
            </h3>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <FormGroup variant="col-1">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.title!}
                  touched={touched.title!}
                  value={values.title}
                  name="title"
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
                  label="Decriver l'evenement"
                />
              </FormGroup>
            </div>
            {isError && (
              //@ts-ignore
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

export default TranslateFormProgram;
