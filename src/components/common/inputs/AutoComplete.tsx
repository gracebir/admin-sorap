import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface AutoCompleteTextFieldProps<T extends Record<string, unknown>> {
  singleSelections: T[];
  setSingleSelections: (selected: T[]) => void;
  options: T[];
  label: string;
  placeholder: string;
  labelKey: keyof T;
}

const AutoCompleteTextField = <T extends Record<string, unknown>>({
  singleSelections,
  setSingleSelections,
  options,
  label,
  placeholder,
  labelKey,
}: AutoCompleteTextFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm">{label}</label>
      <Typeahead
        id="basic-typeahead-single"
        labelKey={labelKey as string} // Typeahead expects a string for labelKey
        onChange={(selected) => setSingleSelections(selected as T[])} // Cast selected to T[]
        options={options}
        placeholder={placeholder}
        selected={singleSelections}
      />
    </div>
  );
};

export default AutoCompleteTextField;
