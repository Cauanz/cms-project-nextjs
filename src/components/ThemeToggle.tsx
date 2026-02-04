"use client";

import { useState } from "react";
import { Toggle } from "./ui/toggle";
import { Input } from "./ui/input";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const handlePress = (e) => {
    console.log("pressed");
    console.log(e.target.value);
  };

  // TODO - CONTINUAR CRIANDO ISSO, NADA FUNCIONA AINDA E CORRINDO AS CORES

  return (
    <label className="switch">
      <Input type="checkbox" onChange={(e) => handlePress(e)} />
      <span className="slider round"></span>
    </label>
  );
  {
    /* <Toggle onPressedChange={(e) => handlePress(e)} /> */
  }
}
