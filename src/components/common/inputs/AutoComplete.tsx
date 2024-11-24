/** @format */

import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const AutoCompleteTextField: React.FC<{
    singleSelections: any;
    setSingleSelections: any;
    options: any;
    label: string;
    placeholder: string;
    labelKey: string;
}> = ({
    singleSelections,
    setSingleSelections,
    options,
    label,
    placeholder,
    labelKey,
}) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-semibold text-sm'>{label}</label>
            <Typeahead
                id='basic-typeahead-single'
                labelKey={labelKey}
                onChange={setSingleSelections}
                options={options}
                placeholder={placeholder}
                selected={singleSelections}
            />
        </div>
    );
};

export default AutoCompleteTextField;
