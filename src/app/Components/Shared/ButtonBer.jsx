"use client";
import { MineContext } from "@/Context/MineContextProvider";
import Link from "next/link";
import React, { useContext } from "react";
import { CgFeed } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdChat } from "react-icons/md";

export default function ButtonBer() {
  const { pandingMsg } = useContext(MineContext);
  return (
    <>
      <div className="fixed bottom-0 w-full lg:p-6 p-5 px-2">
        <div className="bg-slate-900 rounded-2xl w-full lg:p-3 p-2 flex justify-center items-center">
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/feed"}
              className="flex py-2 items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              <CgFeed /> <span>Feed</span>
            </Link>
          </div>
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/"}
              className="flex py-2 items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              <LiaUserFriendsSolid /> <span>Meet</span>
            </Link>
          </div>
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/chat"}
              className="flex py-2 items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              {pandingMsg === 0 ? (
                ""
              ) : (
                <span className="text-xs mt-[-40px] top-0 bg-black text-white font-bold rounded-full p-1 px-2 ntftop">
                  {pandingMsg}
                </span>
              )}
              <MdChat /> <span>Chat</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
