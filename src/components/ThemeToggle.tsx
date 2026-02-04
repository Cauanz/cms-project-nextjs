"use client";

import { Input } from "./ui/input";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handlePress = (e) => {
    if (e?.target?.value === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

// TODO - CORRIGIR PROBLEMA DELE VOLTAR PARA POSIÇÃO ESCURO QUANDO ESTÁ CLARO, TALVEZ TENHA A VER COM ARMAZENAR O TEMA NO LOCALSTORAGE PARA ELE LEMBRAR

  return (
    <label className="switch">
      <Input type="checkbox" onChange={(e) => handlePress(e)} value={theme} />
      <span className="slider round"></span>
    </label>
  );
  {
    /* <Toggle onPressedChange={(e) => handlePress(e)} /> */
  }
}
