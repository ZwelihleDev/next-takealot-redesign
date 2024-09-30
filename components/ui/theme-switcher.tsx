"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" size={26}/>
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " size={26}/>
    </div>
  );
};

export default ThemeSwitcher;
