"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../context/Theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className=" w-fit">
      <p className="text-lg">
        {theme === "light" ? "Dark mode 🌑" : "Light mode 🌞"}
      </p>
    </button>
  );
}
