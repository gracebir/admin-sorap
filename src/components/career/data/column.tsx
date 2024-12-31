import { Eye, Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobColumn: React.FC<{
  id: number;
  title: string;
  description: string;
  jobType: string;
}> = ({ description, title, jobType, id }) => {
  return (
    <tr>
      <td className="px-6 py-4 text-sm flex gap-2 items-center">
        <span className="text-base font-medium text-gray-900">{title}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {description.substring(0, 50)}...
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-semibold">{jobType}</td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/admin/career/${id}`}
          className="tooltip"
          data-tip="Voir detail"
        >
          <button className="text-gray-600 hover:text-gray-500 mr-2">
            <Eye size={18} />
          </button>
        </Link>
        <Link
          href={`/admin/career/create/${id}`}
          className="tooltip"
          data-tip="Modifier"
        >
          <button className="text-gray-600 hover:text-gray-500 mr-2">
            <Pen size={20} />
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default JobColumn;
