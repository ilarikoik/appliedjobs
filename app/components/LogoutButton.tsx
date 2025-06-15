"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../context/Theme";
import { useUser } from "../context/User";

export function LogoutButton() {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useUser();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("user");
        location.reload();
      }}
      // onClick={() => setUser(null)}
      className=" w-fit p-3 h-8 rounded-md  flex items-center justify-center bg-red-500 hover:cursor-pointer"
    >
      Logout
    </button>
  );
}
