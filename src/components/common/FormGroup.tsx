/** @format */

"use client";

import React from "react";

const FormGroup: React.FC<{
    children: React.ReactNode;
    variant: "col-1" | "col-2";
}> = ({ children, variant = "col-1" }) => {
    return (
        <div
            className={`grid grid-cols-1 ${
                variant === "col-1" ? "md:grid-cols-1" : "md:grid-cols-2"
            } gap-4`}
        >
            {children}
        </div>
    );
};

export default FormGroup;
