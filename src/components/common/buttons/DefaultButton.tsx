/** @format */

import { ButtonType } from "@/types/event";
import React, { FC } from "react";

const DefaultButton: FC<ButtonType> = ({
    type = "button",
    onClick,
    text,
    variant = "primary",
    isLoading = false,
}) => {
    return (
        <button
            disabled={isLoading}
            className={`${
                variant === "primary"
                    ? "bg-primary hover:bg-lightBlue text-white"
                    : "bg-grayish hover:bg-slate-100 text-primary"
            } py-3 px-6 lg:px-8 rounded-lg font-semibold duration-300`}
            onClick={onClick}
            type={type}
        >
            {isLoading ? (
                <span className='loading loading-spinner loading-sm'></span>
            ) : (
                text
            )}
        </button>
    );
};

export default DefaultButton;
