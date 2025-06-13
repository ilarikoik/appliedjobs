"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import Navbar from "../components/Navbar";
import { useUser } from "../context/User";

export default function HomePage() {
  const { user, setUser } = useUser();
  // useEffect(() => {
  //   // hae tietokannasta käyttäjän tiedot ja käytä sit id
  //   const get = async () => {
  //     const res = await fetch(`/api/user?id=${user?.id}`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const response = await res.json();
  //     setUser(response);
  //   };
  //   get();
  // }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className=" h-screen w-full ">
        <h1 className="text-2xl w-full text-center  mt-10">
          ETUSIVU, {user && user.username}
        </h1>

        <div className="flex justify-center items-center w-5/6 h-3/6  p-3 max-w-[900px]"></div>
      </div>
    </>
  );
}
