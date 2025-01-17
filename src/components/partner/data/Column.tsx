/** @format */

import { Eye, Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PartnerColumn: React.FC<{
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  company: string;
}> = ({ id, firstname, lastname, avatar, email, company }) => {
  return (
    <tr>
      <td className="px-6 py-4 flex gap-2 items-center">
        <div className="h-10  rounded-full">
          <Image
            width={40}
            height={40}
            className="rounded-full w-full h-full"
            src={avatar}
            alt="avatar"
          />
        </div>
        <span className="text-base font-medium text-gray-900">
          {firstname ? firstname : "***"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {lastname ? lastname : "---"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{company}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/admin/partner/${id}`}
          className="tooltip"
          data-tip="Voir detail"
        >
          <button className="text-gray-400 hover:text-gray-500 mr-2">
            <Eye size={18} />
          </button>
        </Link>
        <Link
          href={`/admin/partner/create/${id}`}
          className="tooltip"
          data-tip="Modifier"
        >
          <button className="text-gray-400 hover:text-gray-500 mr-2">
            <Pen size={18} />
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default PartnerColumn;
