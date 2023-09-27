"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mode, setMode] = useState(true);

  const { setTheme } = useTheme();

  const themeToogle = () => {
    setMode(!mode);
    setTheme(mode === true ? "light" : "dark");
  };

  return (
    <nav className="h-[10vh] w-full flex justify-between items-center px-3 md:px-28">
      <div>
        <h1 className="text-2xl">Todo App 🎯</h1>
      </div>
      <div className="flex gap-2">
        {mode === true ? (
          <Button variant="outline" size="icon" onClick={themeToogle}>
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" onClick={themeToogle}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        )}
        <Button variant="outline" size="default" className="flex gap-3">
          <h1 className="hidden md:block">Logout</h1>
          <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </nav>
  );
}
