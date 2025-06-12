import { useState } from "react";
import { useTheme } from "../context/Theme";
import { LogoutButton } from "./LogoutButton";
import { ThemeToggle } from "./ToggleTheme";

export default function Navbar() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`${
          theme === "light" ? "shadow-gray-400" : "shadow-gray-800"
        }  flex w-full h-16 p-3 items-center justify-between shadow-lg sm:hidden `}
      >
        <ThemeToggle></ThemeToggle>
        <LogoutButton></LogoutButton>
      </div>
      <div
        className={`${
          theme === "light" ? "shadow-gray-400" : "shadow-gray-800"
        } hidden sm:flex w-full h-20 justify-end shadow-lg `}
      >
        <div
          className={`flex w-full ml-10 justify-start items-center font-alumni`}
        >
          <h1 className={` text-xl font-bold `}>HOMMAA-TYÖ</h1>
        </div>
        <ul className="flex  justify-around items-center w-2/5 max-w-[400px] ">
          <ThemeToggle></ThemeToggle>
          <LogoutButton></LogoutButton>
        </ul>
      </div>
    </>
  );
}
