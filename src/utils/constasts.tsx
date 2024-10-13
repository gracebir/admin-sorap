/** @format */

import { LuPackage, LuCalendar } from "react-icons/lu";
import { TbLogs } from "react-icons/tb";
import { TbMessage2Question } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { LiaStoreAltSolid } from "react-icons/lia";
import { Product } from "@/types/dashboard";

export const SidebarItems = [
    {
        name: "dashboard",
        path: "/admin/dashboard",
        text: "Dashboard",
        Icon: LuPackage,
    },
    {
        name: "event",
        path: "/admin/events",
        text: "Events",
        Icon: LuCalendar,
    },
    {
        name: "blogs",
        path: "/admin/blogs",
        text: "Blogs",
        Icon: TbLogs,
    },
    // insomnie
    {
        name: "career",
        path: "/admin/career",
        text: "Career",
        Icon: TbMessage2Question,
    },
    {
        name: "store",
        path: "/admin/store",
        text: "Store",
        Icon: LiaStoreAltSolid,
    },
    {
        name: "feedback",
        path: "/admin/feedback",
        text: "Feedback",
        Icon: RiFeedbackLine,
    },
];

export const products: Product[] = [
    {
        name: "ASOS Ridley High Waist",
        price: 79.49,
        quantity: 82,
        amount: 6518.18,
    },
    {
        name: "Marco Lightweight Shirt",
        price: 128.5,
        quantity: 37,
        amount: 4754.5,
    },
    {
        name: "Half Sleeve Shirt",
        price: 39.99,
        quantity: 64,
        amount: 2559.36,
    },
    {
        name: "Lightweight Jacket",
        price: 20.0,
        quantity: 184,
        amount: 3680.0,
    },
    { name: "Marco Shoes", price: 79.49, quantity: 64, amount: 1965.81 },
];
