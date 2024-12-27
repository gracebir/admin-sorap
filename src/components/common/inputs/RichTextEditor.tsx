/** @format */

"use client";

import React from "react";
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    tablePlugin,
    toolbarPlugin,
    InsertTable,
    BoldItalicUnderlineToggles,
    InsertImage,
    CodeToggle,
    UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "@mdxeditor/editor/style.css";

const RichTextEditor: React.FC<{
    value: string;
    handleValue: (e: string | undefined) => void;
    content?: string;
    label: string;
}> = ({ handleValue, value, label }) => {
    return (
        <div className='overflow-y-hidden'>
            <label className='font-semibold text-sm' htmlFor=''>
                {label}
            </label>
            <div data-color-mode='light'>
                <MDXEditor
                    markdown={value}
                    className='border max-h-[300px] w-full overflow-y-auto'
                    onChange={handleValue}
                    plugins={[
                        // Example Plugin Usage
                        headingsPlugin(),
                        listsPlugin(),
                        quotePlugin(),
                        tablePlugin(),
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    {" "}
                                    <UndoRedo />
                                    <InsertTable />
                                    <BoldItalicUnderlineToggles />
                                    <InsertImage />
                                    <CodeToggle />
                                </>
                            ),
                        }),
                        thematicBreakPlugin(),
                        markdownShortcutPlugin(),
                    ]}
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
