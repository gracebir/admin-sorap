import TranslateFormProgram from "@/components/program/TranslationForm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface Props {
  params: Params;
}

export default function CreateProgramTranslation({ params }: Props) {
  const { id } = params;
  return (
    <main>
      <TranslateFormProgram id={parseInt(id)} />
    </main>
  );
}
