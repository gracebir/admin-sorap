/** @format */

import React from "react";

const PageTitle: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h1 className='text-2xl lg:text-3xl font-extrabold text-primary'>
            {text}
        </h1>
    );
};

export default PageTitle;
