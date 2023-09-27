"use client";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Todo from "@/components/shared/Todo";

export default function Home() {
  return (
    <main className="flex h-[90vh] p-5 md:px-28 justify-between">
      <Leftsidebar />
      <Todo />
      <Rightsidebar />
    </main>
  );
}
