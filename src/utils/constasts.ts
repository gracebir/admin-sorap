/** @format */

import { LuPackage, LuCalendar } from "react-icons/lu";
import { TbLogs } from "react-icons/tb";
import { TbMessage2Question } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { LiaStoreAltSolid } from "react-icons/lia";
import { Product } from "@/types/dashboard";
import { LiaUserTieSolid } from "react-icons/lia";
import { IoCalendarSharp } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";
import { SiWebmoney } from "react-icons/si";

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
    text: "Evenement",
    Icon: LuCalendar,
  },
  {
    name: "partner",
    path: "/admin/partner",
    text: "Parteneur",
    Icon: SiWebmoney,
  },
  {
    name: "instructor",
    path: "/admin/instructor",
    text: "Titeur",
    Icon: LiaUserTieSolid,
  },
  {
    name: "program",
    path: "/admin/program",
    text: "Programme",
    Icon: IoCalendarSharp,
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
  {
    name: "project",
    path: "/admin/project",
    text: "Project",
    Icon: BsCameraVideo,
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

export const events = [
  {
    name: "Name Of the Events",
    date: "12 Mar 2021",
    time: "3pm - 9pm",
    location: "Kigali, Rwanda",
    price: 50,
    imageUrl: "",
  },
  {
    name: "Name Of the Events",
    date: "12 Mar 2021",
    time: "3pm - 9pm",
    location: "Kigali, Rwanda",
    price: 50,
    imageUrl: "",
  },
];

export const TabItems = [
  {
    title: "Upcoming",
    id: "upcoming",
  },
  {
    title: "Past",
    id: "past",
  },
  {
    title: "Rejected",
    id: "rejected",
  },
];

export const eventOptions = [
  { value: "ATELIER", label: "Atelier" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "CONFERENCE", label: "Conference" },
];

export const LocationOptions = [
  { value: "ONLINE", label: "En Ligne" },
  { value: "ONSITE", label: "En Presentielle" },
  { value: "REPLAY", label: "En Replay" },
];

export const blogsOptions = [
  { value: "1", label: "WEB DEVELOPMENT" },
  { value: "2", label: "NETWORK" },
  { value: "3", label: "CYBER SECURITY" },
];

export const jobTypesOptions = [
  { value: "FULL_TIME", label: "FULL TIME" },
  { value: "PART_TIME", label: "PART TIME" },
  { value: "CONTRACT", label: "CONTRACT" },
  { value: "FREELANCE", label: "FREELANCE" },
  { value: "INTERNSHIP", label: "INTERNSHIP" },
];

export const teamsOptions = [
  { value: "1", label: "FRONTEND" },
  { value: "2", label: "BACKEND" },
  { value: "3", label: "QA" },
  { value: "4", label: "DEVOPS" },
  { value: "5", label: "UI/UX" },
  { value: "6", label: "DATA ANALYTICS" },
  { value: "7", label: "PROJECT MANAGEMENT" },
];

export const departmentsOptions = [
  { value: "1", label: "ENGINEERING" },
  { value: "2", label: "MARKETING" },
  { value: "3", label: "DESIGN" },
  { value: "4", label: "PRODUCT" },
  { value: "5", label: "SALES" },
];

export const CategoryProgramOptions = [
  { value: "WEBDESIGN", label: "Design" },
  { value: "WEBDEVELOPMENT", label: "Web Development" },
  { value: "NETWORK", label: "IT Reseaux" },
  { value: "DATAANALYSIS", label: "Data Analysis" },
];
