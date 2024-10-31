/** @format */
"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import {
    useGetProgramByIdQuery,
    useUpdateProgramMutation,
} from "@/lib/features/slice/program/programSlice";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const FormEditProgram: React.FC<{ id: number }> = ({ id }) => {
    const { data: program, isLoading } = useGetProgramByIdQuery({ id });
    const [updateProgram, { isError, error, isLoading: loadingUpdate }] =
        useUpdateProgramMutation();

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
            title: "",
            description: "",
            edition: "",
            date_from: "",
            date_to: "",
            price: 0,
        },
        onSubmit: async (value) => {
            try {
                const response = await updateProgram({
                    id: id,
                    program: {
                        ...value,
                        date_from: value.date_from,
                        date_to: value.date_to,
                    },
                }).unwrap();
                if (response.status === "success") {
                    toast.success(response?.message);
                }
            } catch (error) {
                toast.error("Oops un erreur se produit");
            }
        },
    });

    useEffect(() => {
        if (!isLoading) {
            const formatDate = (dateString: string) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                const formattedDate = date.toISOString().slice(0, 16); // Get YYYY-MM-DDTHH:MM format
                return formattedDate;
            };
            setValues({
                title: program?.data?.title || "",
                edition: program?.data?.edition || "",
                description: program?.data?.description || "",
                date_from: formatDate(program?.data?.date_from!),
                date_to: formatDate(program?.data?.date_to!),
                price: program?.data?.price || 0,
            });
        }
    }, [program, isLoading, setValues]);

    if (isLoading)
        return (
            <div className='min-h-[70svh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='flex flex-col gap-6 md:gap-8'>
            <PageTitle text="Modification d'un Programme" />
            <form
                onSubmit={handleSubmit}
                className='grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5'
            >
                <div className='lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md'>
                    <div className='px-6 py-2 border-b border-gray-300'>
                        <h3 className='text-sm lg:text-base font-semibold'>
                            Infomation sur le programme
                        </h3>
                    </div>
                    <div className='px-6 py-5 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.title!}
                                    touched={touched.title!}
                                    value={values.title}
                                    name='title'
                                    placeholder='e.g. Formation en Web design'
                                    handleChange={handleChange}
                                    label='Titre du Programme'
                                    type='text'
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.edition!}
                                    touched={touched.edition!}
                                    value={values.edition}
                                    name='edition'
                                    placeholder='e.g. edition 2024'
                                    handleChange={handleChange}
                                    label='Edition'
                                    type='text'
                                />
                            </FormGroup>
                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.price!}
                                    touched={touched.price!}
                                    value={values.price}
                                    name='price'
                                    placeholder='e.g.'
                                    handleChange={handleChange}
                                    label='Le Prix'
                                    type='number'
                                />
                            </FormGroup>
                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.date_from!}
                                    touched={touched.date_from!}
                                    value={values.date_from}
                                    name='date_from'
                                    placeholder=''
                                    handleChange={handleChange}
                                    label='Date du debut'
                                    type='datetime-local'
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.date_to!}
                                    touched={touched.date_to!}
                                    value={values.date_to}
                                    name='date_to'
                                    placeholder=''
                                    handleChange={handleChange}
                                    label='Date de la fin'
                                    type='datetime-local'
                                />
                            </FormGroup>
                            <FormGroup variant='col-1'>
                                <TextArea
                                    handleBlur={handleBlur}
                                    error={errors.description!}
                                    touched={touched.description!}
                                    value={values.description}
                                    name='description'
                                    placeholder='e.g. Nous voulons offre un apercu sur...'
                                    handleChange={handleChange}
                                    label='Un description du programme'
                                />
                            </FormGroup>
                        </div>
                        {isError && (
                            //@ts-ignore
                            <ErrorMessage text={error?.data?.error_message} />
                        )}
                        <div className='flex justify-end'>
                            <Button
                                type='submit'
                                text='Modifier'
                                isLoading={loadingUpdate}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1 lg:col-span-1 md:col-span-2 order-1 md:order-1 lg:order-2 w-full'>
                    <div className='w-full shadow-md border-gray-200 border'>
                        <div className='px-6 py-2 border-b border-gray-300'>
                            <h3 className='text-sm lg:text-base font-semibold'>
                                Photo
                            </h3>
                        </div>
                        <div className='py-4 px-6'>
                            <div className='w-full h-[200px] border border-blue-300 bg-blue-100 rounded-md relative'>
                                <div className='w-full h-full relative'>
                                    <img
                                        src={program?.data.thumbnail}
                                        alt='event-thumbnail'
                                        className='w-full h-full object-contain rounded-md'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormEditProgram;
