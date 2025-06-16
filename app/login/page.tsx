"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../context/Theme";
import { useUser } from "../context/User";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { user, setUser } = useUser();

  // linkka db ja hae käyttäjä
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    // setMessage(data.message);
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser({
        id: data.user.id,
        username: data.user.username,
      });
    }

    if (data.success) {
      console.log("succcc");
      router.push("/home");
    }
    setUsername("");
    setPassword("");
  }

  const handleUser = () => {
    // setShowMessage(true);
    // setInterval(() => {
    // setShowMessage(false);
    // }, 2000);
  };

  const handleNavigate = () => {
    router.push("/createaccount");
  };
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
            className={`flex flex-col justify-around items-center p-10 w-full  rounded-lg ${
              theme === "light" ? "bg-white" : "bg-black "
            }`}
            style={{
              boxShadow:
                theme === "light"
                  ? "0 0 20px rgba(0, 0, 0, 0.25)"
                  : "0 0 20px rgba(255, 255, 255, 0.25)",
            }}
          >
            <div className="flex flex-row justify-center items-center  ">
              <h1 className="text-2xl mr-2">Login</h1>
              <h2
                className="text-2xl underline text-blue-500 hover:cursor-pointer"
                onClick={handleNavigate}
              >
                {" "}
                or Create Account
              </h2>
            </div>
            <div className="  w-full h-56 justify-evenly items-center flex flex-col">
              <input
                type="text"
                placeholder="username"
                className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black "
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black "
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleUser}
                className={`${
                  theme === "light" ? "text-white" : "text-white"
                } min-w-[100px] w-3/6 h-10  rounded-md bg-blue-500 min-h-[40px] hover:cursor-pointer`}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
