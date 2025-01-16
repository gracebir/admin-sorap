/** @format */
"use client";
import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import SelectInput from "@/components/common/inputs/SelectInput";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import { useCreateEventMutation } from "@/lib/features/slice/event/eventSlice";
import { eventOptions, LocationOptions } from "@/utils/constasts";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";

const FormEvent = () => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [hovered, setHovered] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [createEvent, { isLoading, error: errorEvent, isError }] =
        useCreateEventMutation();

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
                theme: "",
                location: "",
                description: "",
                start_date: "",
                end_date: "",
                price: 0,
                eventType: "",
            },
            onSubmit: async (value, { resetForm }) => {
                try {
                    const response = await createEvent({
                        ...value,
                        start_date: value.start_date,
                        end_date: value.end_date,
                        thumbnail: selectedFile!,
                    }).unwrap();
                    if (response.status === "success") {
                        toast.success(response?.message);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Oops un erreur se produit");
                } finally {
                    resetForm();
                }
            },
        });
    return (
        <div className='flex flex-col gap-6 md:gap-8'>
            <PageTitle text="Creation d'un Evenement" />
            <form
                onSubmit={handleSubmit}
                className='grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5'
            >
                <div className='lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md'>
                    <div className='px-6 py-2 border-b border-gray-300'>
                        <h3 className='text-sm lg:text-base font-semibold'>
                            Information sur l&apos;evenement
                        </h3>
                    </div>
                    <div className='px-6 py-5 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <FormGroup variant='col-2'>
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
                                <SelectInput
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='location'
                                    touched={touched.location!}
                                    error={errors.location!}
                                    value={values.location}
                                    options={LocationOptions}
                                    label='Localisation'
                                />
                            </FormGroup>
                            <FormGroup variant='col-2'>
                                <SelectInput
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='eventType'
                                    touched={touched.eventType!}
                                    error={errors.eventType!}
                                    value={values.eventType}
                                    options={eventOptions}
                                    label="Categorie d'evenement"
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.price!}
                                    touched={touched.price!}
                                    value={values.price}
                                    name='price'
                                    placeholder='e.g. Mama yemo coin sandowa'
                                    handleChange={handleChange}
                                    label='Le Prix'
                                    type='number'
                                />
                            </FormGroup>
                            <FormGroup variant='col-2'>
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.start_date!}
                                    touched={touched.start_date!}
                                    value={values.start_date}
                                    name='start_date'
                                    placeholder=''
                                    handleChange={handleChange}
                                    label='Date du debut'
                                    type='datetime-local'
                                />
                                <TextField
                                    handleBlur={handleBlur}
                                    error={errors.end_date!}
                                    touched={touched.end_date!}
                                    value={values.end_date}
                                    name='end_date'
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
                                    label="Decriver l'evenement"
                                />
                            </FormGroup>
                        </div>
                        {isError && errorEvent && (
                            //@ts-expect-error data strurcute error is comming form the data
                            <ErrorMessage
                                text={errorEvent?.data?.error_message}
                            />
                        )}
                        <div className='flex justify-end'>
                            <Button
                                type='submit'
                                text='Creer'
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
                                {thumbnail ? (
                                    <div
                                        className='w-full h-full relative'
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        <Image
                                            src={thumbnail}
                                            width={300}
                                            height={300}
                                            alt='event-thumbnail'
                                            className='w-full h-full object-contain rounded-md'
                                        />
                                        {hovered && (
                                            <div className='absolute inset-0 flex flex-col justify-center items-center bg-blue-300 bg-opacity-50'>
                                                <MdOutlineFileDownload
                                                    className='text-white'
                                                    size={25}
                                                />
                                                <p className='text-white'>
                                                    Changer la photo
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center h-full'>
                                        <div className='flex flex-col items-center'>
                                            <div className='bg-blue-300 rounded-full p-4'>
                                                <MdOutlineFileDownload
                                                    className='text-primary'
                                                    size={25}
                                                />
                                            </div>
                                            <div className='text-center'>
                                                <p>
                                                    Clicker pour selectionner ou
                                                    glisser deposer
                                                </p>
                                                <span>PNG, JPEG, JPG.</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type='file'
                                    accept='image/png, image/jpeg, image/jpg'
                                    className='absolute inset-0 opacity-0 cursor-pointer'
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

export default FormEvent;
