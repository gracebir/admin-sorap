"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import SelectInput from "@/components/common/inputs/SelectInput";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/lib/features/slice/career/careerSlice";
import {
  departmentsOptions,
  jobLevelsOptions,
  jobTypesOptions,
  teamsOptions,
} from "@/utils/constasts";
import { Form, useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

const ModifierJob: React.FC<{ id: number }> = ({ id }) => {
  const [updateJob, { isError, isLoading, error }] = useUpdateJobMutation();
  const { data, isLoading: loading } = useGetJobByIdQuery({ id });

  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [desirable, setDesirable] = useState("");
  const [benefits, setBenefits] = useState("");

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      salaryRange: "",
      location: "",
      jobType: "",
      company: "",
      experienceLevel: "",
      deadline: "",
      teamId: "",
      departmentId: "",
    },
    onSubmit: async (value) => {
      try {
        const newValue = {
          ...value,
          description,
          requirements,
          responsibilities,
          benefits,
          desirable,
          teamId: parseInt(value.teamId),
          departmentId: parseInt(value.departmentId),
        };
        const response = await updateJob({ id, body: newValue }).unwrap();
        if (response.status == "success") {
          toast.success("Job updated with Success");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (loading || data?.data) {
      const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16); // Get YYYY-MM-DDTHH:MM format
        return formattedDate;
      };
      setValues({
        title: data?.data.title || "",
        salaryRange: data?.data.salaryRange || "",
        location: data?.data.location || "",
        jobType: data?.data.jobType || "",
        company: data?.data.company || "",
        experienceLevel: data?.data.experienceLevel || "",
        deadline: formatDate(data?.data.deadline!) || "",
        teamId: data?.data.teamId!.toString() || "",
        departmentId: data?.data.departmentId!.toString() || "",
      });

      setDescription(data?.data.description || "");
      setRequirements(data?.data.requirements || "");
      setResponsibilities(data?.data.responsibilities || "");
      setDesirable(data?.data.desirable || "");
      setBenefits(data?.data.benefits || "");
    }
  }, [data, loading, setValues]);

  if (loading)
    return (
      <div className="min-h-[70svh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex justify-between items-center gap-6">
        <PageTitle text="Modifier l'offre" />
        <Link
          className="bg-primary px-6 py-2 flex text-white gap-2 font-medium hover:bg-blue-900 rounded items-center"
          href={"/admin/career"}
        >
          <IoMdArrowBack size={20} />
          Annuler
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-5"
      >
        <div className="lg:col-span-3 md:col-span-3  order-2 md:order-2 lg:order-1 shadow-md flex flex-col border-gray-200 border rounded-md">
          <div className="px-6 py-2 border-b border-gray-300">
            <h3 className="text-sm lg:text-base font-semibold">Info du Job</h3>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <FormGroup variant="col-1">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.title!}
                  touched={touched.title!}
                  value={values.title}
                  name="title"
                  placeholder="e.g. New JavaScript pipeline operator"
                  handleChange={handleChange}
                  label="Titre du Job"
                  type="text"
                />
              </FormGroup>

              <FormGroup variant="col-2">
                <SelectInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="jobType"
                  touched={touched.jobType!}
                  error={errors.jobType!}
                  value={values.jobType}
                  options={jobTypesOptions}
                  label="Categorie du Job"
                />
                <SelectInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="experienceLevel"
                  touched={touched.experienceLevel!}
                  error={errors.experienceLevel!}
                  value={values.experienceLevel}
                  options={jobLevelsOptions}
                  label="Niveau Experience"
                />
              </FormGroup>

              <FormGroup variant="col-1">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.salaryRange!}
                  touched={touched.salaryRange!}
                  value={values.salaryRange}
                  name="salaryRange"
                  placeholder="e.g. 2000 - 3000"
                  handleChange={handleChange}
                  label="Salaire"
                  type="text"
                />
              </FormGroup>

              <FormGroup variant="col-1">
                {description.length !== 0 && (
                  <RichTextEditor
                    label="Description"
                    value={description}
                    handleValue={(value) => {
                      setDescription(value!);
                    }}
                  />
                )}
              </FormGroup>
              <FormGroup variant="col-2">
                <SelectInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="teamId"
                  touched={touched.teamId!}
                  error={errors.teamId!}
                  value={values.teamId}
                  options={teamsOptions}
                  label="Selectionner l'equipe"
                />
                <SelectInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="departmentId"
                  touched={touched.departmentId!}
                  error={errors.departmentId!}
                  value={values.departmentId}
                  options={departmentsOptions}
                  label="Department du Job"
                />
              </FormGroup>
              <FormGroup variant="col-1">
                {requirements.length !== 0 && (
                  <RichTextEditor
                    label="Requirements"
                    value={requirements}
                    handleValue={(value) => {
                      setRequirements(value!);
                    }}
                  />
                )}
              </FormGroup>
              <FormGroup variant="col-1">
                {responsibilities.length !== 0 && (
                  <RichTextEditor
                    label="Responsibilities"
                    value={responsibilities}
                    handleValue={(value) => {
                      setResponsibilities(value!);
                    }}
                  />
                )}
              </FormGroup>
              <FormGroup variant="col-1">
                {desirable.length !== 0 && (
                  <RichTextEditor
                    label="Desirable"
                    value={desirable}
                    handleValue={(value) => {
                      setDesirable(value!);
                    }}
                  />
                )}
              </FormGroup>
              <FormGroup variant="col-1">
                {benefits.length !== 0 && (
                  <RichTextEditor
                    label="Benefits"
                    value={benefits}
                    handleValue={(value) => {
                      setBenefits(value!);
                    }}
                  />
                )}
              </FormGroup>
              <FormGroup variant="col-1">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.deadline!}
                  touched={touched.deadline!}
                  value={values.deadline}
                  name="deadline"
                  placeholder=""
                  handleChange={handleChange}
                  label="Deadline"
                  type="datetime-local"
                />
              </FormGroup>
            </div>
            {isError && (
              //@ts-ignore
              <ErrorMessage text={error?.data?.error_message} />
            )}
            <div className="flex justify-end">
              <Button type="submit" text="Modifier" isLoading={isLoading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifierJob;
