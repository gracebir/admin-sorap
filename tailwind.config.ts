/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        themes: ["light"],
    },
    theme: {
        extend: {
            colors: {
                primary: "#05264F",
                secondary: "#0b3466",
                active: "#6E6EF7",
                lightBlue: "#0C3465",
                grayish: "#E8EAEC",
            },
        },
    },
    plugins: [require("daisyui")],
};
export default config;
