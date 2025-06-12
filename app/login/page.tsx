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
    setMessage(data.message);

    if (user) {
      router.push("/home");
    }
  }

  const handleUser = () => {
    setUser({
      name: "ile",
      email: "ile@example.com",
      id: 100,
    });
    setShowMessage(true);
    setInterval(() => {
      setShowMessage(false);
    }, 2000);
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
            className="flex flex-col justify-around items-center h-3/5 w-full "
          >
            <h1 className="text-2xl">Login</h1>
            <input
              type="text"
              placeholder="username"
              className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              className="w-3/5 min-w-[200px] h-12 bg-gray-200 rounded-md text-start p-3 text-black"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleUser}
              className={`${
                theme === "light" ? "text-white" : "text-white"
              } min-w-[100px] w-3/6 h-10  rounded-md bg-blue-500`}
            >
              LOGIN
            </button>
            {/* <Link href="/home">Home</Link> */}
          </form>
        </div>
      </div>
    </>
  );
}
