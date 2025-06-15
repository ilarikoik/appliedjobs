import { useState } from "react";
import { useTheme } from "../context/Theme";

type modalProps = {
  modal: boolean;
  toggleModal: () => void;
};
export default function JobModal({ modal, toggleModal }: modalProps) {
  const { theme } = useTheme();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString().substring(0, 10)
  );
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");

  const closeModal = () => {
    toggleModal();
  };

  const handleSubmit = () => {
    toggleModal();
  };
  return (
    <div className="w-full h-screen top-0 absolute backdrop-blur-sm justify-center items-center flex ">
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
          ></input>
          <label
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-start w-4/5`}
          >
            Status:
          </label>
          <input
            placeholder="No answer / Answered / Interview / Decline / Job offer"
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
          ></input>
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
