/** @format */
"use client";
import { GoBell } from "react-icons/go";
import CircleIcon from "./common/buttons/CircleIcon";
import { MdOutlinePerson2 } from "react-icons/md";
import { useGetMeQuery } from "@/lib/features/slice/authSlice";

const Header = () => {
    const { data, isLoading } = useGetMeQuery(null);

    return (
        <header className='w-full shadow-md shadow-gray-200 sticky top-0 h-14 flex items-center justify-end px-6'>
            <nav className='flex items-center gap-3'>
                <CircleIcon Icon={GoBell} />
                <CircleIcon Icon={MdOutlinePerson2} />
            </nav>
        </header>
    );
};

export default Header;
