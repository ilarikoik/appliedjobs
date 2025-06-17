import { useState } from "react";
import { useTheme } from "../context/Theme";
import { LogoutButton } from "./LogoutButton";
import { ThemeToggle } from "./ToggleTheme";
import { useUser } from "../context/User";

export default function Navbar() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`${
          theme === "light" ? "shadow-gray-400" : "shadow-gray-800"
        }  flex w-full  h-16 p-3 items-center justify-between shadow-lg sm:hidden `}
      >
        <ThemeToggle></ThemeToggle>
        <LogoutButton></LogoutButton>
      </div>
      <div
        className={` ${
          theme === "light" ? "shadow-gray-400" : "shadow-gray-800"
        } hidden sm:flex w-full justify-center shadow-2xl`}
      >
        <div
          className={` hidden sm:flex w-full h-20 justify-end max-w-[1500px]`}
        >
          <div
            className={`flex w-full ml-10 justify-start items-center font-alumni`}
          >
            <h1 className={` text-xl font-bold `}>Get a Job</h1>
            <p className={` text-lg font-bold text-blue-500 `}>
              {user && ", " + user.username}
            </p>
          </div>
          <ul className="flex  justify-around items-center w-2/5 max-w-[400px] ">
            <ThemeToggle></ThemeToggle>
            <LogoutButton></LogoutButton>
          </ul>
        </div>
      </div>
    </>
  );
}
