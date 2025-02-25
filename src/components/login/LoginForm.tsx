/** @format */

"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordField from "@/components/common/inputs/PasswordField";
import TextField from "@/components/common/inputs/TextField";
import { setToken, useSigninMutation } from "@/lib/features/slice/authSlice";
import { signinSchema } from "@/utils/validations/siginSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

export default function LoginForm() {
  const route = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (token) {
      route.push("/admin/dashboard");
    }
  }, [token, route]);

  const [signin, { isLoading, error, isError }] = useSigninMutation();
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signinSchema,
      onSubmit: async (value) => {
        try {
          const response = await signin({
            email: value.email,
            password: value.password,
          }).unwrap();
          if (response.status === "status") {
            toast.success("Connected avec success 🚀");
            dispatch(setToken(response.data.access_token));
            route.push("/admin/dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  return (
    <main className="min-h-svh w-full flex items-center bg-gray-100 px-6 lg:px-0">
      <div className="max-w-[400px] mx-auto w-full  gap-4 rounded-md px-6 py-7 flex flex-col lg:gap-6 items-center shadow-md bg-white">
        <h1 className="text-xl lg:text-2xl font-bold text-center text-primary">
          Welcome Back!
        </h1>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <TextField
            handleBlur={handleBlur}
            error={errors.email!}
            touched={touched.email!}
            value={values.email}
            name="email"
            placeholder="example@soracert.com"
            handleChange={handleChange}
            label="Addresse Email"
            type="email"
          />
          <PasswordField
            handleBlur={handleBlur}
            error={errors.password!}
            touched={touched.password!}
            value={values.password}
            name="password"
            placeholder="**********"
            handleChange={handleChange}
            label="Mot de passe"
          />
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-blue-950"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "connexion"
            )}
          </button>
          {isError && (
            //@ts-expect-error error is due to data structure
            <ErrorMessage text={error?.data?.error_message} />
          )}
        </form>
      </div>
    </main>
  );
}
