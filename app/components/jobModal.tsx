import { useState } from "react";
import { useTheme } from "../context/Theme";
import { useUser } from "../context/User";

type modalProps = {
  modal: boolean;
  toggleModal: () => void;
};
export default function JobModal({ modal, toggleModal }: modalProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const userId = user?.id;
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().substring(0, 10).toString()
  );
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Sent");

  const closeModal = () => {
    toggleModal();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (role && userId) {
      const jobApplied = {
        userId,
        role,
        company,
        location,
        date,
        link,
        status,
      };
      // console.log(JSON.stringify(jobApplied) + "-------------------");
      const res = await fetch("/api/postjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobApplied),
      });
      const data = await res.json();
    }
    toggleModal();
  }
  return (
    <div className="w-full min-h-screen top-0 absolute backdrop-blur-sm justify-center items-center flex ">
      <div
        className={` w-4/5 max-w-[800px] h-fit p-10 rounded-lg shadow-2xl  ${
          theme === "light"
            ? " text-black shadow-black border border-neutral-300"
            : " text-black shadow-black border border-neutral-600"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className=" flex justify-center items-center flex-col "
        >
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Role:
          </label>
          <input
            placeholder="Junior Developer"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2 "
            onChange={(e) => setRole(e.target.value)}
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Company:
          </label>
          <input
            placeholder="Dev Oy"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
            onChange={(e) => setCompany(e.target.value)}
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Location:
          </label>
          <input
            placeholder="Helsinki"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Date:
          </label>
          <input
            placeholder="15-05-2025"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
            value={date.toString()}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Link:
          </label>
          <input
            placeholder="example.com/28212300"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
            onChange={(e) => setLink(e.target.value)}
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Status:
          </label>
          <select
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Sent">Sent</option>
            <option value="Answered">Answered</option>
            <option value="No answer">No answer</option>
            <option value="Interview">Interview</option>
            <option value="Job offer">Job offer</option>
            <option value="Decline">Decline</option>
          </select>
          {/* <input
            placeholder="No answer / Answered / Interview / Decline / Job offer"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
          ></input> */}
          <div className="flex flex-row justify-between w-4/5 gap-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-1/3 px-4 py-3 rounded-xl text-red-400 font-semibold  hover:bg-red-600 hover:text-white transition duration-200 active:scale-95 hover:cursor-pointer"
            >
              Close
            </button>

            <button
              type="submit"
              className="w-1/2 px-4 py-3 rounded-xl text-blue-500 font-semibold  hover:bg-blue-600 hover:text-white transition duration-200 active:scale-95 hover:cursor-pointer"
            >
              Add job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
