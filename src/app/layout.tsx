/** @format */

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const monteserrat = Montserrat({
    subsets: ["latin-ext"],
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Soracert admin",
    description: "admin dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                suppressHydrationWarning={true}
                className={monteserrat.className}
            >
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
