"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import Navbar from "../components/Navbar";
import { useUser } from "../context/User";
import Jobs from "../components/JobsList";

type JobData = {
  app_user_id: number;
  job_role: string;
  job_employee: string;
  job_location: string;
  job_applied_date: Date;
  job_link: string;
  job_status: string;
};

export default function HomePage() {
  const { user, setUser } = useUser();
  const [jobData, setJobData] = useState<JobData[] | []>();
  const [search, setSearch] = useState("");

  const userId = user?.id;
  // hae local stroagesta käyttäjän tiedot
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsed = JSON.parse(storedUser);
  //     setUser({ id: parsed.user.id, username: parsed.user.username });
  //   }
  // }, []);

  useEffect(() => {
    const get = async () => {
      const data = await fetch("/api/applied", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      const res = await data.json();
      console.log(res.jobs_applied[0]);
      setJobData(res.jobs_applied[0]);
    };
    get();
  }, [user]);

  const filtered = jobData?.filter(
    (item: JobData) =>
      item.job_role.toLowerCase().includes(search.toLowerCase()) ||
      item.job_employee.toLowerCase().includes(search.toLowerCase()) ||
      item.job_location.toLowerCase().includes(search.toLowerCase()) ||
      item.job_role.toLowerCase().includes(search.toLowerCase()) ||
      item.job_status.toLowerCase().includes(search.toLowerCase()) ||
      item.job_applied_date
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar></Navbar>
      <div className=" h-screen w-full  ">
        <div className="flex flex-col w-full justify-center items-center p-3">
          <label htmlFor="">Search from applied jobs: {search}</label>
          <input
            className="w-3/5 max-w-[600px] h-10 rounded-lg border-2 border-neutral-500"
            placeholder="Search for jobs"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-4/5 justify-between  items-center mb-5">
            <h1 className="text-2xl w-fit ">APPLIED JOBS</h1>
            <button className="text-md p-3 bg-blue-500 rounded-md text-white text-center">
              Add job
            </button>
          </div>
        </div>
        {jobData && <Jobs jobData={filtered || []}></Jobs>}
        <div className="flex justify-center items-center w-5/6 h-3/6  p-3 max-w-[900px]"></div>
      </div>
    </>
  );
}
