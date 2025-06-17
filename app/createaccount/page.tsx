"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../context/Theme";
import { useUser } from "../context/User";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const [username, setUsername] = useState("tatatat");
  const [password, setPassword] = useState("cacacaca");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { user, setUser } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, user_password: password }),
    });
    router.push("/login");
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full ">
        <div className="flex flex-col justify-center items-center w-5/6 h-3/6  p-3 max-w-[900px]">
          <div className="w-3/6 justify-center items-center ">
            {showMessage &&
              (message === "Invalid credentials" ? (
                <Alert variant="filled" severity="error">
                  {message}
                </Alert>
              ) : (
                <Alert variant="filled" severity="success">
                  {message}
                </Alert>
              ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-around items-center p-10 w-full bg-white rounded-lg"
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex flex-row justify-center items-center  ">
              <h1 className="text-2xl mr-2">Create new account</h1>
            </div>
            <div className="  w-full h-56 justify-evenly items-center flex flex-col">
              <input
                type="text"
                placeholder="username"
                className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black "
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="password"
                className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black "
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex flex-row w-full justify-center ">
                <button
                  onClick={() => router.back()}
                  className={`${
                    theme === "light" ? "text-white" : "text-white"
                  }  w-fit p-2 h-10  rounded-md bg-gray-500 min-h-[40px] mr-3 hover:cursor-pointer`}
                >
                  BACK
                </button>
                <button
                  className={`${
                    theme === "light" ? "text-white" : "text-white"
                  } min-w-[100px] w-3/6 h-10  rounded-md bg-green-500 min-h-[40px] hover:cursor-pointer`}
                >
                  CREATE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
