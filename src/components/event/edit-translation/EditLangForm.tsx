/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import {
    useUpdateTranslationMutation,
    useGetEventTranslatedByIdQuery,
} from "@/lib/features/slice/event/eventSlice";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const EditLangForm: React.FC<{ id: number }> = ({ id }) => {
    const [updateTranslation, { isLoading, isError, error }] =
        useUpdateTranslationMutation();

    const { data, isLoading: loading } = useGetEventTranslatedByIdQuery({ id });

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        setValues,
    } = useFormik({
        initialValues: {
            theme: "",
            description: "",
        },
        onSubmit: async (value) => {
            try {
                const response = await updateTranslation({
                    id,
                    value,
                }).unwrap();
                if (response.status === "success") {
                    toast.success(response.message);
                }
            } catch (error) {
                toast.error("Un erreur se produit");
            }
        },
    });

    useEffect(() => {
        if (!loading && data?.data) {
            setValues({
                theme: data.data.theme || "",
                description: data.data.description || "",
            });
        }
    }, [loading, data, setValues]);

    if (loading)
        return (
            <div className='min-h-[70svh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
                <h3 className='text-xl md:text-2xl font-bold text-primary'>
                    Modifier la traduction en{" "}
                    {data?.data.language === "fr" ? "Francais" : "Anglais"}
                </h3>
                <Link
                    href={`/admin/events/${data?.data.eventId}`}
                    className='px-6 py-3 bg-blue-900 text-white hover:bg-primary rounded-md font-semibold'
                >
                    Annuler
                </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className='grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5'
            >
                <div className='lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md'>
                    <div className='px-6 py-2 border-b border-gray-300'>
                        <h3 className='text-sm lg:text-base font-semibold'>
                            Infomation sur l'evenement
                        </h3>
                    </div>
                    <div className='px-6 py-5 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <FormGroup variant='col-1'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.theme!}
                                    touched={touched.theme!}
                                    value={values.theme}
                                    name='theme'
                                    placeholder='e.g. Evolu du blockchain'
                                    handleChange={handleChange}
                                    label="Theme de l'evenement"
                                    type='text'
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
                                    label="Decriver l'evenement"
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
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditLangForm;
