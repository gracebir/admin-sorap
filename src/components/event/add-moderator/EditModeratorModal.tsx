/** @format */

"use client";

import Button from "@/components/common/buttons/Button";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import { TModeratorProps } from "@/types/event";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

const EditModeratorModal: React.FC<TModeratorProps> = ({
    id,
    firstname,
    lastname,
    bio,
    email,
    phone,
    modalIsOpen,
    setIsOpen,
}) => {
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

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        setValues,
    } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            bio: "",
            phone: "",
            email: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const newModerator = {
                ...values,
            };
            try {
                console.log(newModerator);
            } catch (error) {
                console.log(error);
            }
        },
    });

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    useEffect(() => {
        setValues({
            firstname: firstname || "",
            lastname: lastname || "",
            bio: bio || "",
            phone: phone || "",
            email: email || "",
        });
    }, [firstname, lastname, bio, phone, email, setValues]);

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

                    <div className='flex justify-end mt-2'>
                        <Button type='submit' text='Modifier' />
                    </div>
                    {/* {isError && (
                        //@ts-ignore
                        <ErrorMessage text={error?.data?.error_message} />
                    )} */}
                </form>
            </div>
        </Modal>
    );
};

export default EditModeratorModal;
