"use client";

import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="w-full min-h-[70svh] flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-sm text-center font-bold text-gray-600">
            Veiller patience
          </p>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
