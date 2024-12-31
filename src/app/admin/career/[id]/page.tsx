import JobDetail from "@/components/career/detail/JobDetail";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

type Props = {
  params: Params;
};

export default function JobDetailsPage({ params }: Props) {
  const { id } = params;
  return (
    <main>
      <JobDetail id={parseInt(id)} />
    </main>
  );
}
