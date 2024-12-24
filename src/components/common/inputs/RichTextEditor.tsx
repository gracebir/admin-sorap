/** @format */

"use client";

import React from "react";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import "@mdxeditor/editor/style.css";

const RichTextEditor: React.FC<{
  value: string;
  handleValue: (e: string | undefined) => void;
  id: string;
  label: string;
  height: number;
}> = ({ handleValue, id, value, label, height = 300 }) => {
  return (
    <div className="">
      <label htmlFor="">{label}</label>
      <div data-color-mode="light">
        <MDEditor
          id={id}
          value={value}
          onChange={handleValue}
          preview="edit"
          height={height}
          components={{
            toolbar: (command, disabled, executeCommand) => {
              if (command.keyCommand === "code") {
                return (
                  <button
                    aria-label="Insert code"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    Code
                  </button>
                );
              }
            },
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
