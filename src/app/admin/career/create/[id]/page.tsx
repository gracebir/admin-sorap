import ModifierJob from "@/components/career/create/update/ModifierJob";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

interface Props {
  params: Params;
}

export default function JobUpdate({ params }: Props) {
  const { id } = params;
  return (
    <main>
      <ModifierJob id={parseInt(id)} />
    </main>
  );
}
