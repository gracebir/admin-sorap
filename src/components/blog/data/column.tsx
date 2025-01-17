/** @format */

import { Eye, Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogColumn: React.FC<{
  id: number;
  title: string;
  avatar: string;
  content: string;
  category?: string;
}> = ({ avatar, title, content, category, id }) => {
  return (
    <tr>
      <td className="px-6 py-4 text-sm flex gap-2 items-center">
        <div className="h-10  rounded-full">
          <Image
            width={40}
            height={40}
            className="rounded-xl w-full h-full"
            src={avatar}
            alt="avatar"
          />
        </div>
        <span className="text-base font-medium text-gray-900">{title}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {content.substring(0, 50)}...
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-semibold">{category}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/admin/blogs/${id}`}
          className="tooltip"
          data-tip="Voir detail"
        >
          <button className="text-gray-600 hover:text-gray-500 mr-2">
            <Eye size={18} />
          </button>
        </Link>
        <Link
          href={`/admin/blogs/create/${id}`}
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

export default BlogColumn;
