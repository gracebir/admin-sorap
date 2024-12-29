import EditProgramLangForm from "@/components/program/edit/EditLangForm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface Props {
  params: Params;
}

export default function EditProgramTranslatePage({ params }: Props) {
  const { id } = params;
  return (
    <main>
      <EditProgramLangForm id={parseInt(id)} />
    </main>
  );
}
