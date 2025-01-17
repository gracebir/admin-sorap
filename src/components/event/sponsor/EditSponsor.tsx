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

const EditSponsor: React.FC<{
  id: number;
  patternId: number;
  company: string;
  note: string;
  amount: number;
  setModelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
}> = ({
  id,
  patternId,
  company,
  note,
  amount,
  setModelIsOpen,
  modalIsOpen,
}) => {
  const closeModal = () => {
    setModelIsOpen(false);
  };
  const [selectedPartner, setSelectedPartner] = useState<{
    id: number;
    label: string;
  } | null>(null);

  console.log(id);

  const [selectOption, setSelectOption] = useState<
    Array<{ id: number; label: string }> | undefined
  >([]);
  const { data, isLoading: loadingPartner } = useGetAllPartnersQuery(null);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      note: "",
      amount: 0,
    },
    onSubmit: async (value) => {
      console.log(value);
      //   const newValue = {
      //     patternId: selectedPartner?.id!,
      //     amount: value.amount!,
      //     note: value.note,
      //   };
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

  useEffect(() => {
    if (patternId || company || note || amount) {
      setValues({
        amount,
        note,
      });
      setSelectedPartner({
        id: patternId,
        label: company,
      });
    }
  }, [patternId, company, amount, note, setValues]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        ...customStyles,
      }}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="text-sm font-bold">
            Ajouter Sponsor pour Evenement{" "}
          </span>
          <button onClick={closeModal}>
            <IoMdClose size={20} />
          </button>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 ">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={selectOption || []}
              sx={{ width: "100%" }}
              value={selectedPartner}
              onChange={(event, newInputValue) => {
                setSelectedPartner(newInputValue);
              }}
              renderInput={(params) => (
                <MTextField hiddenLabel {...params} label="Companie" />
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <TextField
              handleBlur={handleBlur}
              error={errors.amount!}
              touched={touched.amount!}
              value={values.amount}
              name="amount"
              placeholder="0"
              handleChange={handleChange}
              label=""
              type="number"
            />
          </div>
          <div className="grid grid-cols-1">
            <TextArea
              handleBlur={handleBlur}
              error={errors.note!}
              touched={touched.note!}
              value={values.note}
              name="note"
              placeholder="e.g. Un apport en fl"
              handleChange={handleChange}
              label="Note (Description de l'apport du sponsor)"
            />
          </div>

          <div className="flex justify-end mt-2">
            <DefaultButton isLoading={false} type="submit" text="Ajouter" />
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

export default EditSponsor;
