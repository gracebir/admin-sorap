/** @format */

"use client";

import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Button from "@/components/common/buttons/Button";
import { moderatorSchema } from "@/utils/validations/eventSchema";
import { useAddModeratorMutation } from "@/lib/features/slice/event/eventSlice";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/common/ErrorMessage";

const ModeratorModal: React.FC<{
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalIsOpen: boolean;
    eventId: number;
}> = ({ modalIsOpen, setIsOpen, eventId }) => {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [addModerator, { isLoading, error, isError }] =
        useAddModeratorMutation();

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues: {
                firstname: "",
                lastname: "",
                bio: "",
                phone: "",
                email: "",
            },
            validationSchema: moderatorSchema,
            onSubmit: async (values, { resetForm }) => {
                const newModerator = {
                    ...values,
                    eventId,
                    avatar: selectedImage,
                };
                try {
                    const response = await addModerator(newModerator).unwrap();
                    if (response) {
                        toast.success("Moderateur ajouter avec success 🚀!!");
                        resetForm();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        });

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("L'image doit être inférieure à 2 Mo.");
                return;
            }
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
                ...customStyles,
            }}
            contentLabel='Example Modal'
        >
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <span className='text-sm font-bold'>
                        Ajouter Moderateur pour Evenement{" "}
                    </span>
                    <button onClick={closeModal}>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        <TextField
                            handleBlur={handleBlur}
                            error={errors.firstname!}
                            touched={touched.firstname!}
                            value={values.firstname}
                            name='firstname'
                            placeholder='e.g. John'
                            handleChange={handleChange}
                            label='Nom'
                            type='text'
                        />
                        <TextField
                            handleBlur={handleBlur}
                            error={errors.lastname!}
                            touched={touched.lastname!}
                            value={values.lastname}
                            name='lastname'
                            placeholder='e.g. Kasongo'
                            handleChange={handleChange}
                            label='Post Nom'
                            type='text'
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <TextArea
                            handleBlur={handleBlur}
                            error={errors.bio!}
                            touched={touched.bio!}
                            value={values.bio}
                            name='bio'
                            placeholder='e.g. Un expert en intelligence artificiel'
                            handleChange={handleChange}
                            label='Bio'
                        />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        <TextField
                            handleBlur={handleBlur}
                            error={errors.email!}
                            touched={touched.email!}
                            value={values.email}
                            name='email'
                            placeholder='e.g. example@gmail.com'
                            handleChange={handleChange}
                            label='Email'
                            type='email'
                        />
                        <TextField
                            handleBlur={handleBlur}
                            error={errors.phone!}
                            touched={touched.phone!}
                            value={values.phone}
                            name='phone'
                            placeholder='e.g. +243971821626'
                            handleChange={handleChange}
                            label='Telephone'
                            type='text'
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <label
                            htmlFor='avatar'
                            id='ava'
                            className='px-6 py-2 bg-gray-600 duration-300 hover:bg-gray-500 max-w-[50%] text-sm cursor-pointer rounded-md shadow font-bold text-gray-50'
                        >
                            Choisissez une image
                        </label>
                        <input
                            type='file'
                            id='avatar'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='hidden'
                        />
                        {preview && (
                            <div className='w-32 h-32 mt-2 border rounded overflow-hidden'>
                                <img
                                    src={preview}
                                    alt="Aperçu de l'image"
                                    className='object-cover w-full h-full'
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-end mt-2'>
                        <Button
                            isLoading={isLoading}
                            type='submit'
                            text='Ajouter'
                        />
                    </div>
                    {isError && (
                        //@ts-ignore
                        <ErrorMessage text={error?.data?.error_message} />
                    )}
                </form>
            </div>
        </Modal>
    );
};

export default ModeratorModal;
