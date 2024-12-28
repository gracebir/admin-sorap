/** @format */

import { TextAreaType } from "@/type";
import React, { FC } from "react";

const TextArea: FC<TextAreaType> = ({
    label,
    placeholder,
    touched,
    handleChange,
    error,
    name,
    value,
    handleBlur,
}) => {
    return (
        <div className='flex flex-col w-full gap-2 text-primary'>
            <label className='font-semibold text-sm'>{label}</label>
            <textarea
                rows={15}
                className='textarea textarea-bordered text-sm focus-visible:outline-gray-700 w-full'
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                value={value}
                onBlur={handleBlur}
            ></textarea>
            {error && touched ? (
                <span className='text-xs text-red-400 italic'>{error}</span>
            ) : null}
        </div>
    );
};

export default TextArea;
