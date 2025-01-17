/** @format */
"use server";

import LoginForm from "@/components/login/LoginForm";

/** @format */
export default async function Home() {
  return (
    <main className="min-h-svh w-full flex items-center bg-gray-100 px-6 lg:px-0">
      <LoginForm />
    </main>
  );
}
