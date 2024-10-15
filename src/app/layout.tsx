/** @format */
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import NextTopLoader from "nextjs-toploader";

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
                <NextTopLoader
                    color='#05264F'
                    initialPosition={0.08}
                    height={4}
                    crawl={true}
                    showSpinner={false}
                    easing='ease'
                    shadow='0 0 10px #05264F,0 0 5px #2299DD'
                />
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
