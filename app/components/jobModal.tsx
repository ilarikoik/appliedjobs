import { useState } from "react";
import { useTheme } from "../context/Theme";

type modalProps = {
  modal: boolean;
  toggleModal: () => void;
};
export default function JobModal({ modal, toggleModal }: modalProps) {
  const { theme } = useTheme();

  const closeModal = () => {
    toggleModal();
  };

  const handleSubmit = () => {
    toggleModal();
  };
  return (
    <div className="w-full h-screen top-0 absolute bg-white/10 backdrop-blur-sm justify-center items-center flex">
      <div
        className={` w-4/5 max-w-[800px] h-fit p-10 rounded-lg ${
          theme === "light"
            ? "bg-white shadow-2xl shadow-black"
            : "bg-black shadow-2xl shadow-white"
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
            className="w-5/6 rounded-md bg-neutral-300 mb-4 p-2"
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
          <div className="flex flex-row justify-between w-4/5">
            <button
              className={`w-2/8 p-3 rounded-lg bg-red-500`}
              onClick={closeModal}
            >
              Close
            </button>
            <button className={`w-5/8 p-3 rounded-lg bg-blue-500`}>
              Add job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
