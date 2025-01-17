/** @format */

"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import {
  useGetInstructorByidQuery,
  useUpdateInstructorMutation,
} from "@/lib/features/slice/instructor/instructorSlice";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const FormEditInstructor: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading } = useGetInstructorByidQuery({ id });

  const [updateInstructor, { isLoading: loadingInstructor, isError, error }] =
    useUpdateInstructorMutation();

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      bio: "",
      phone: "",
      email: "",
    },
    onSubmit: async (value) => {
      try {
        const response = await updateInstructor({
          id,
          instructor: value,
        }).unwrap();
        if (response.status === "success") {
          toast.success(response?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Oops un erreur se produit");
      }
    },
  });
  useEffect(() => {
    if (!isLoading) {
      setValues({
        firstname: data?.data.firstname || "",
        lastname: data?.data.lastname || "",
        email: data?.data.email || "",
        bio: data?.data.bio || "",
        phone: data?.data.phone || "",
      });
    }
  }, [data?.data, isLoading, setValues]);

  if (isLoading)
    return (
      <div className="min-h-[70svh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <PageTitle text="Mise a jour sur l'Instructeur" />
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5"
      >
        <div className="lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md">
          <div className="px-6 py-2 border-b border-gray-300">
            <h3 className="text-sm lg:text-base font-semibold">
              Infomation sur le Instructeur
            </h3>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <FormGroup variant="col-2">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.firstname!}
                  touched={touched.firstname!}
                  value={values.firstname}
                  name="firstname"
                  placeholder="e.g. John"
                  handleChange={handleChange}
                  label="Nom de l'instructeur"
                  type="text"
                />
                <TextField
                  handleBlur={handleBlur}
                  error={errors.lastname!}
                  touched={touched.lastname!}
                  value={values.lastname}
                  name="lastname"
                  placeholder="e.g. Ilunga"
                  handleChange={handleChange}
                  label="Postnom"
                  type="text"
                />
              </FormGroup>
              <FormGroup variant="col-1">
                <TextArea
                  handleBlur={handleBlur}
                  error={errors.bio!}
                  touched={touched.bio!}
                  value={values.bio}
                  name="bio"
                  placeholder="e.g. Un engenieur Informaticien avec 5 ans..."
                  handleChange={handleChange}
                  label="Bio"
                />
              </FormGroup>
              <FormGroup variant="col-2">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.email!}
                  touched={touched.email!}
                  value={values.email}
                  name="email"
                  placeholder="eg. johnilunga@gmail.com"
                  handleChange={handleChange}
                  label="Addresse Email"
                  type="email"
                />
                <TextField
                  handleBlur={handleBlur}
                  error={errors.phone!}
                  touched={touched.phone!}
                  value={values.phone}
                  name="phone"
                  placeholder="e.g. +243974655263"
                  handleChange={handleChange}
                  label="Telephone"
                  type="text"
                />
              </FormGroup>
            </div>
            {isError && (
              //@ts-expect-error due to data structure
              <ErrorMessage text={error?.data?.error_message} />
            )}
            <div className="flex justify-end">
              <Button
                type="submit"
                text="Modifier"
                isLoading={loadingInstructor}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 md:col-span-2 order-1 md:order-1 lg:order-2 w-full">
          <div className="w-full shadow-md border-gray-200 border">
            <div className="px-6 py-2 border-b border-gray-300">
              <h3 className="text-sm lg:text-base font-semibold">Photo</h3>
            </div>
            <div className="py-4 px-6">
              <div className="w-full h-[200px] border border-blue-300 bg-blue-100 rounded-md relative">
                <div className="w-full h-full relative">
                  {data?.data.avatar && (
                    <Image
                      width={200}
                      height={200}
                      src={data?.data.avatar}
                      alt="event-thumbnail"
                      className="w-full h-full object-contain rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditInstructor;
