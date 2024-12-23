/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import {
    useGetPartnerByIdQuery,
    useUpdatePartnerMutation,
} from "@/lib/features/slice/partner/parterSlice";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const FormEditPartner: React.FC<{ id: number }> = ({ id }) => {
    const [updatePattern, { isLoading, error, isError }] =
        useUpdatePartnerMutation();
    const { data, isLoading: loadingPartner } = useGetPartnerByIdQuery({ id });
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
            phone: "",
            email: "",
            company: "",
        },
        onSubmit: async (value, {}) => {
            try {
                const response = await updatePattern({
                    id,
                    partner: value,
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
        if (!loadingPartner) {
            setValues({
                firstname: data?.data.firstname! || "",
                lastname: data?.data.lastname! || "",
                email: data?.data.email || "",
                phone: data?.data.phone || "",
                company: data?.data?.company || "",
            });
        }
    }, [loadingPartner, data?.data, setValues]);

    if (loadingPartner)
        return (
            <div className='flex justify-center min-h-28'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );

    return (
        <div className='flex flex-col gap-6 md:gap-8'>
            <PageTitle text='Modification  Partnaire' />
            <form
                onSubmit={handleSubmit}
                className='grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5'
            >
                <div className='lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md'>
                    <div className='px-6 py-2 border-b border-gray-300'>
                        <h3 className='text-sm lg:text-base font-semibold'>
                            Infomation sur le Partnaire
                        </h3>
                    </div>
                    <div className='px-6 py-5 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.firstname!}
                                    touched={touched.firstname!}
                                    value={values.firstname}
                                    name='firstname'
                                    placeholder='e.g. John'
                                    handleChange={handleChange}
                                    label='Nom du partnaire (Optionel)'
                                    type='text'
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.lastname!}
                                    touched={touched.lastname!}
                                    value={values.lastname}
                                    name='lastname'
                                    placeholder='e.g. Ilunga'
                                    handleChange={handleChange}
                                    label='Postnom (Optionel)'
                                    type='text'
                                />
                            </FormGroup>
                            <FormGroup variant='col-1'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.company!}
                                    touched={touched.company!}
                                    value={values.company}
                                    name='company'
                                    placeholder='e.g. Vodacom'
                                    handleChange={handleChange}
                                    label='Companie (Social)'
                                    type='text'
                                />
                            </FormGroup>

                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.email!}
                                    touched={touched.email!}
                                    value={values.email}
                                    name='email'
                                    placeholder='eg. johnilunga@gmail.com'
                                    handleChange={handleChange}
                                    label='Addresse Email'
                                    type='email'
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.phone!}
                                    touched={touched.phone!}
                                    value={values.phone}
                                    name='phone'
                                    placeholder='e.g. +243974655263'
                                    handleChange={handleChange}
                                    label='Telephone'
                                    type='text'
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
                                        src={data?.data.avatar}
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

export default FormEditPartner;
