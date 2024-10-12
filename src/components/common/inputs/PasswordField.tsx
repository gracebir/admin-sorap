/** @format */
"use client";
import { FC, useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";

const PasswordField: FC<PasswordInputType> = ({
    label,
    placeholder,
    touched,
    handleChange,
    error,
    name,
    value,
    handleBlur,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='flex flex-col gap-1 w-full'>
            <label className='font-semibold text-sm text-primary'>
                {label}
            </label>
            <div className='relative'>
                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className='input input-bordered focus-visible:outline-gray-700 w-full'
                    onChange={handleChange}
                />
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='border-l p-3 absolute top-0 bottom-0 right-0 text-primary'
                >
                    {showPassword ? (
                        <IoEyeOff size={19} />
                    ) : (
                        <IoEye size={19} />
                    )}
                </button>
            </div>

            {error && touched ? (
                <span className='text-xs text-red-400 italic'>{error}</span>
            ) : null}
        </div>
    );
};

export default PasswordField;
