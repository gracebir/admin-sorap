/** @format */

"use client";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer />
        </Provider>
    );
}
