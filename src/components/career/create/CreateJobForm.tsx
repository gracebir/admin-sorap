"use client";

import Button from "@/components/common/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import FormGroup from "@/components/common/FormGroup";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import SelectInput from "@/components/common/inputs/SelectInput";
import TextField from "@/components/common/inputs/TextField";
import PageTitle from "@/components/common/PageTitle";
import { useCreateJobMutation } from "@/lib/features/slice/career/careerSlice";
import {
  departmentsOptions,
  jobLevelsOptions,
  jobTypesOptions,
  teamsOptions,
} from "@/utils/constasts";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const CreateJobForm = () => {
  const [createJobFn, { isLoading, isError, error }] = useCreateJobMutation();

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirements: "",
      responsibilities: "",
      desirable: "",
      benefits: "",
      salaryRange: "",
      location: "",
      jobType: "",
      company: "",
      experienceLevel: "",
      deadline: "",
      teamId: "",
      departmentId: "",
    },
    onSubmit: async (value, { resetForm }) => {
      try {
        const newValue = {
          ...value,
          teamId: parseInt(value.teamId),
          departmentId: parseInt(value.departmentId),
        };
        const response = await createJobFn(newValue).unwrap();
        if (response.status == "success") {
          toast.success("Job create with Success");
          resetForm();
        }
      } catch (error) {
        console.log(error);
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
                  placeholder="e.g. $2000 - $3000"
                  handleChange={handleChange}
                  label="Salaire"
                  type="text"
                />
              </FormGroup>

              <FormGroup variant="col-2">
                <TextField
                  handleBlur={handleBlur}
                  error={errors.company!}
                  touched={touched.company!}
                  value={values.company}
                  name="company"
                  placeholder="e.g. Google"
                  handleChange={handleChange}
                  label="Company"
                  type="text"
                />
                <TextField
                  handleBlur={handleBlur}
                  error={errors.location!}
                  touched={touched.location!}
                  value={values.location}
                  name="location"
                  placeholder="e.g. Kigali, Rwanda or Remote"
                  handleChange={handleChange}
                  label="Location"
                  type="text"
                />
              </FormGroup>

              <FormGroup variant="col-1">
                <RichTextEditor
                  label="Description"
                  value={values.description}
                  handleValue={(value) => {
                    setFieldValue("description", value);
                  }}
                />
                {errors.description && touched.description && (
                  <div>{errors.description}</div>
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
                <RichTextEditor
                  label="Requirements"
                  value={values.requirements}
                  handleValue={(value) => {
                    setFieldValue("requirements", value);
                  }}
                />
              </FormGroup>
              <FormGroup variant="col-1">
                <RichTextEditor
                  label="Responsibilities"
                  value={values.responsibilities}
                  handleValue={(value) => {
                    setFieldValue("responsibilities", value);
                  }}
                />
              </FormGroup>
              <FormGroup variant="col-1">
                <RichTextEditor
                  label="Desirable"
                  value={values.desirable}
                  handleValue={(value) => {
                    setFieldValue("desirable", value);
                  }}
                />
              </FormGroup>
              <FormGroup variant="col-1">
                <RichTextEditor
                  label="Benefits"
                  value={values.benefits}
                  handleValue={(value) => {
                    setFieldValue("benefits", value);
                  }}
                />
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
              //@ts-expect-error  Error data structure is not typed properly in the API response
              <ErrorMessage text={error?.data?.error_message} />
            )}
            <div className="flex justify-end">
              <Button type="submit" text="Creer" isLoading={isLoading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
