"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import Navbar from "../components/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <div className=" h-screen w-full ">
        <h1 className="text-2xl w-full text-center  mt-10">ETUSIVU</h1>
        <div className="flex justify-center items-center w-5/6 h-3/6  p-3 max-w-[900px]"></div>
      </div>
    </>
  );
}
