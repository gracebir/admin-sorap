import React from "react";

const HeaderCareer = () => {
  return (
    <thead className="bg-white m-2">
      <tr className="bg-gray-200 text-left p-4">
        <th className="min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider">
          Titre
        </th>
        <th className="min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider">
          Description
        </th>
        <th className="min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider">
          Domaine
        </th>

        <th className="min-w-[300px] py-4 px-4 font-medium text-black uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default HeaderCareer;
