import { Eye, Pen } from "lucide-react";
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
      <td className="px-6 py-4 flex gap-2 items-center">
        <div className="h-10  rounded-full">
          <img className="rounded-xl w-full h-full" src={avatar} alt="avatar" />
        </div>
        <span className="text-base font-medium text-gray-900">{title}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {content.substring(0, 50)}...
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{category}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          href={`/admin/blog/${id}`}
          className="tooltip"
          data-tip="Voir detail"
        >
          <button className="text-gray-400 hover:text-gray-500 mr-2">
            <Eye size={18} />
          </button>
        </Link>
        <Link
          href={`/admin/blog/create/${id}`}
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

export default BlogColumn;
