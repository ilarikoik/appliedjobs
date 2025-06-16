import { useEffect, useState } from "react";
import { useTheme } from "../context/Theme";
import { useUser } from "../context/User";

type JobData = {
  id?: number;
  userId: number;
  role: string;
  company: string;
  location: string;
  date: string;
  link: string;
  status: string;
};

type modalProps = {
  modal: boolean;
  toggleModal: () => void;
  editData?: JobData | null;
};
export default function JobModal({ modal, editData, toggleModal }: modalProps) {
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

  useEffect(() => {
    console.log(JSON.stringify(editData) + "asdasdads");
    if (editData) {
      setRole(editData.role);
      setCompany(editData.company);
      setLocation(editData.location);
      setDate(editData.date);
      setLink(editData.link);
      setStatus(editData.status);
    } else {
      setRole("");
      setCompany("");
      setLocation("");
      setDate(new Date().toISOString().substring(0, 10));
      setLink("");
      setStatus("Sent");
    }
  }, [editData, modal]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let res;
    //
    if (role && userId) {
      const jobApplied: JobData = {
        userId,
        role,
        company,
        location,
        date,
        link,
        status,
      };

      // jos propsina tulee data niin PUT muuten POST(uusi)
      if (editData?.id) {
        res = await fetch("/api/editjob", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...jobApplied, postId: editData?.id }),
        });
      } else {
        res = await fetch("/api/postjob", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobApplied),
        });
      }
      const data = await res.json();
      console.log(data);
      toggleModal();
    }
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
          {editData?.id}
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
            value={role}
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
            value={company}
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
            value={location}
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
            value={link}
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
