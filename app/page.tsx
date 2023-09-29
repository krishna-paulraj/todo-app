"use client";

import Rightsidebar from "@/components/shared/Rightsidebar";
import Todo from "@/components/shared/Todo";

export default function Home() {
  return (
    <main className="flex min-h-[90vh] p-3 md:p-5 md:px-28 justify-between">
      <Todo />
      <Rightsidebar />
    </main>
  );
}
