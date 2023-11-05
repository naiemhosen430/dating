import Link from "next/link";
import React from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp, MdSend } from "react-icons/md";

export default function page() {
  return (
    <>
      <div className="fixed top-0 w-full z-30 h-screen bg-slate-950">
        {/* header */}
        <div className="p-2 sticky top-0 flex items-center text-3xl">
          <div className="w-2/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="text-center w-8/12 text-2xl text-white font-bold">
            Rodela
          </div>
          <div className="w-2/12 text-right">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* send chat */}
        <div className="fixed bottom-2 w-full mx-2">
          <div className="flex items-center justify-center bg-slate-950">
            <input
              className="text-white bg-slate-900 text-lg p-2 px-4 rounded-2xl block w-10/12"
              type="text"
              placeholder="Message"
            />
            <MdSend className="text-5xl cursor-pointer rounded-3xl p-2 block px-2 w-2/12" />
          </div>
        </div>
      </div>
    </>
  );
}
