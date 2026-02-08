"use client";

import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handlePress = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value === "dark" ? "light" : "dark")
  };

  return (
    <label className="switch">
      <Input type="checkbox" onChange={(e) => handlePress(e)} value={theme} />
      <span className="slider round"></span>
    </label>
  );
}
