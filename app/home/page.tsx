"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import Navbar from "../components/Navbar";
import { useUser } from "../context/User";
import Jobs from "../components/JobsList";
import JobModal from "../components/jobModal";
import { useTheme } from "../context/Theme";
import { formatDate } from "../utils/formatDate";
import getRightIcon from "../utils/jobStatusIcon";

type JobData = {
  id?: number;
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
  const { theme } = useTheme();
  const [jobData, setJobData] = useState<JobData[] | []>();
  const [editItem, setEditItem] = useState<any>();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const toggleModal = () => setModal(!modal);
  const userId = user?.id;

  useEffect(() => {
    const get = async () => {
      const data = await fetch("/api/applied", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      const res = await data.json();
      // console.log(res.jobs_applied[0]);
      setJobData(res.jobs_applied[0]);
    };
    get();
  }, [user, modal]);

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

  // if (editItem) {
  //   const edit = {
  //     id: editItem.id,
  //     userId: editItem.app_user_id,
  //     role: editItem.job_role,
  //     company: editItem.job_employee,
  //     location: editItem.job_location,
  //     date: editItem.job_applied_date,
  //     link: editItem.job_link,
  //     status: editItem.job_status,
  //   };
  //   setEditItem(edit);
  // }

  const edit = editItem && {
    id: editItem.id,
    userId: editItem.app_user_id,
    role: editItem.job_role,
    company: editItem.job_employee,
    location: editItem.job_location,
    date: editItem.job_applied_date,
    link: editItem.job_link,
    status: editItem.job_status,
  };
  return (
    <>
      <Navbar></Navbar>
      {modal && (
        <JobModal
          toggleModal={toggleModal}
          modal={modal}
          editData={edit}
        ></JobModal>
      )}
      <div className=" h-screen w-full  ">
        <div className="flex  w-full  justify-center items-center p-3">
          {/* <label htmlFor="">Search from applied jobs: {search}</label> */}
          <div
            className={`flex flex-row justify-between w-3/5 max-w-[600px] h-10 mt-5 rounded-lg p-2 `}
            style={{
              boxShadow:
                theme === "light"
                  ? "0 1px 4px rgba(0, 0, 0, 0.48)"
                  : "1px 1px 1px 1px rgba(255, 255, 255, 0.12)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            <input
              className="outline-none w-full"
              placeholder="Search from applied jobs..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <p
              className="hover:cursor-pointer ml-3"
              onClick={() => setSearch("")}
            >
              🗙
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-4/5 max-w-[1000px] justify-between  items-center mb-5">
            <div className="flex flex-row justify-center items-center">
              <button
                className="hover:cursor-pointer text-xl px-4 py-2 "
                onClick={() => setShowGrid(!showGrid)}
              >
                {showGrid ? "☰" : ":::"}
              </button>

              <h1 className="text-2xl w-fit">
                APPLIED JOBS {"(" + filtered?.length + ")"}
              </h1>
            </div>
            <button
              className="text-md p-3 bg-blue-500 rounded-md text-white text-center hover:cursor-pointer"
              onClick={() => toggleModal()}
            >
              Add job
            </button>
          </div>
        </div>
        {jobData && !showGrid ? (
          <Jobs
            jobData={filtered || []}
            setEditItem={setEditItem}
            toggleModal={toggleModal}
          ></Jobs>
        ) : (
          <div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-3">
              {filtered?.map((item, index) => (
                <div
                  key={index}
                  className={`w-full h-fit p-5 border-2 rounded-lg ${
                    theme === "light"
                      ? "border-neutral-200"
                      : "border-neutral-900"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl">{item.job_role.toUpperCase()}</h1>
                    <p
                      className="text-blue-500 hover:cursor-pointer"
                      onClick={() => {
                        setEditItem(item);
                        toggleModal();
                      }}
                    >
                      ✏️ Edit
                    </p>
                  </div>
                  <p>🏢 {item.job_employee}</p>
                  <p>📍 {item.job_location}</p>
                  <p>📅 {formatDate(item.job_applied_date.toString())}</p>
                  <div className="flex w-full flex-col sm:flex-row sm:justify-between">
                    <p>{getRightIcon(item.job_status) + item.job_status}</p>
                    <a
                      target="_blank"
                      href={item.job_link}
                      className="text-blue-500"
                    >
                      🔗 Open link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
