/** @format */

"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import { useCreateInstructorMutation } from "@/lib/features/slice/instructor/instructorSlice";
import { instructorSchema } from "@/utils/validations/instructorSchema";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";

const FormInstructor: React.FC = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createInstructor, { isLoading, error, isError }] =
    useCreateInstructorMutation();

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

  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        bio: "",
        phone: "",
        email: "",
      },
      validationSchema: instructorSchema,
      onSubmit: async (value, { resetForm }) => {
        try {
          const response = await createInstructor({
            ...value,
            avatar: selectedFile,
          }).unwrap();
          if (response.status === "success") {
            toast.success(response?.message);
            setSelectedFile(null);
            setThumbnail(null);
            resetForm();
          }
        } catch (error) {
          console.log(error);
          toast.error("Oops un erreur se produit");
        }
      },
    });
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <PageTitle text="Enregistrement d'un Instructeur" />
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
              //@ts-expect-error this error is due to data structure
              <ErrorMessage text={error?.data?.error_message} />
            )}
            <div className="flex justify-end">
              <Button type="submit" text="Creer" isLoading={isLoading} />
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
                {thumbnail ? (
                  <div
                    className="w-full h-full relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={thumbnail}
                      alt="event-thumbnail"
                      className="w-full h-full object-contain rounded-md"
                    />
                    {hovered && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center bg-blue-300 bg-opacity-50">
                        <MdOutlineFileDownload
                          className="text-white"
                          size={25}
                        />
                        <p className="text-white">Changer la photo</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-300 rounded-full p-4">
                        <MdOutlineFileDownload
                          className="text-primary"
                          size={25}
                        />
                      </div>
                      <div className="text-center">
                        <p>Clicker pour selectionner ou glisser deposer</p>
                        <span>PNG, JPEG, JPG.</span>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInstructor;
