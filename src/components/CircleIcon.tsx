/** @format */

import React, { FC } from "react";
import { IconType } from "react-icons";

const CircleIcon: FC<{ Icon: IconType }> = ({ Icon }) => {
    return (
        <div className='p-4 rounded-full border'>
            <Icon size={14} />
        </div>
    );
};

export default CircleIcon;
