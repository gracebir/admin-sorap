/** @format */
"use client";
import { GoBell } from "react-icons/go";
import CircleIcon from "./common/buttons/CircleIcon";
import { MdOutlinePerson2 } from "react-icons/md";

const Header = () => {
  return (
    <header className="w-full shadow-md bg-white shadow-gray-200 z-50 sticky top-0 h-14 flex items-center justify-end px-6">
      <nav className="flex items-center gap-3">
        <CircleIcon Icon={GoBell} />
        <CircleIcon Icon={MdOutlinePerson2} />
      </nav>
    </header>
  );
};

export default Header;
