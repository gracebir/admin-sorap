/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import SelectInput from "@/components/common/inputs/SelectInput";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import { useCreateBlogMutation } from "@/lib/features/slice/blog/blogSlice";
import { blogsOptions } from "@/utils/constasts";
import { useFormik } from "formik";
import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";

const CreateBlogForm = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createBlog, { isLoading, error, isError }] = useCreateBlogMutation();

  const [content, setContent] = useState<string>("");

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
        title: "",
        content: "",
        categoryId: "",
      },
      onSubmit: async (value, { resetForm }) => {
        try {
          const response = await createBlog({
            ...value,
            content: content,
            categoryId: parseInt(value.categoryId),
            thumbnail: selectedFile!,
          }).unwrap();
          if (response.status === "success") {
            toast.success(response?.message);
          }
        } catch (error) {
          toast.error("Oops un erreur se produit");
        } finally {
          resetForm();
          setContent("");
        }
      },
    });
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <PageTitle text="Create un blog" />
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5"
      >
        <div className="lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md">
          <div className="px-6 py-2 border-b border-gray-300">
            <h3 className="text-sm lg:text-base font-semibold">
              Info sur post
            </h3>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <FormGroup variant="col-2">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.title!}
                  touched={touched.title!}
                  value={values.title}
                  name="title"
                  placeholder="e.g. New JavaScript pipeline operator"
                  handleChange={handleChange}
                  label="Titre du blog"
                  type="text"
                />
                <SelectInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="categoryId"
                  touched={touched.categoryId!}
                  error={errors.categoryId!}
                  value={values.categoryId}
                  options={blogsOptions}
                  label="Categories"
                />
              </FormGroup>

              <FormGroup variant="col-1">
                <RichTextEditor
                  id="content"
                  handleValue={(text?: string) => setContent(text!)}
                  label="Contenu"
                  value={content}
                  height={400}
                />
              </FormGroup>
            </div>
            {isError && (
              //@ts-ignore
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
                    <img
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

export default CreateBlogForm;
