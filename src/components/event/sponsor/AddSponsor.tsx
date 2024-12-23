/** @format */

"use client";

import DefaultButton from "@/components/common/buttons/DefaultButton";
import TextArea from "@/components/common/inputs/TextArea";
import TextField from "@/components/common/inputs/TextField";
import MTextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { useGetAllPartnersQuery } from "@/lib/features/slice/partner/parterSlice";
import { useAddEventSponsorMutation } from "@/lib/features/slice/event/eventSlice";
import { toast } from "react-toastify";

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

const AddSponsor: React.FC<{
    setModelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalIsOpen: boolean;
    eventId: number;
}> = ({ setModelIsOpen, modalIsOpen, eventId }) => {
    const closeModal = () => {
        setModelIsOpen(false);
    };

    const [selectedPartner, setSelectedPartner] = useState<{
        id: number;
        label: string;
    } | null>(null);

    const [selectOption, setSelectOption] = useState<
        Array<{ id: number; label: string }> | undefined
    >([]);
    const { data, isLoading: loadingPartner } = useGetAllPartnersQuery(null);

    const [addSponsor, { isLoading, isError, error }] =
        useAddEventSponsorMutation();

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                note: "",
                amount: 0,
            },
            onSubmit: async (value, { resetForm }) => {
                const newValue = {
                    eventId: eventId,
                    patternId: selectedPartner?.id!,
                    amount: value.amount!,
                    note: value.note,
                };
                try {
                    const response = await addSponsor(newValue).unwrap();
                    if (response) {
                        toast.success("sponsor ajouter");
                        resetForm();
                        setSelectedPartner(null);
                    }
                } catch (error) {}
            },
        });

    useEffect(() => {
        if (!loadingPartner) {
            const companyTransforms = data?.data.map((item) => {
                return {
                    id: item.id!,
                    label: item.company,
                };
            });
            setSelectOption(companyTransforms);
        }
    }, [loadingPartner, data?.data]);

    return (
        <Modal
            isOpen={modalIsOpen}
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
                        Ajouter Sponsor pour Evenement{" "}
                    </span>
                    <button onClick={closeModal}>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 '>
                        <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={selectOption || []}
                            sx={{ width: "100%" }}
                            value={selectedPartner}
                            onChange={(event, newInputValue) => {
                                setSelectedPartner(newInputValue);
                            }}
                            renderInput={(params) => (
                                <MTextField
                                    hiddenLabel
                                    {...params}
                                    label='Companie'
                                />
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <TextField
                            handleBlur={handleBlur}
                            error={errors.amount!}
                            touched={touched.amount!}
                            value={values.amount}
                            name='amount'
                            placeholder='0'
                            handleChange={handleChange}
                            label=''
                            type='number'
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <TextArea
                            handleBlur={handleBlur}
                            error={errors.note!}
                            touched={touched.note!}
                            value={values.note}
                            name='note'
                            placeholder='e.g. Un apport en fl'
                            handleChange={handleChange}
                            label="Note (Description de l'apport du sponsor)"
                        />
                    </div>

                    <div className='flex justify-end mt-2'>
                        <DefaultButton
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

export default AddSponsor;
