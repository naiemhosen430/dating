"use client";
import React, { useContext } from "react";
import RecentlyBox from "../Components/Box/RecentlyBox";
import InterestBox from "../Components/Box/InterestBox";
import ChatBox from "../Components/Box/ChatBox";
import ButtonBer from "../Components/Shared/ButtonBer";
import Link from "next/link";
import { MineContext } from "@/Context/MineContextProvider";

export default function page() {
  const { chats, setChats, data } = useContext(MineContext);

  if (!data || !chats) {
    return (
      <>
        <div className="space-y-4 p-2 w-12/12 lg:w-4/12">
          <div className="bg-slate-950 w-full loadingbig rounded-2xl overflow-x-auto p-2 px-0">
            <h1 className="text-slate-500 p-1 pb-4 px-2 flex items-center">
              <span className="block w-6/12">Recently</span>
              <Link
                className="block w-6/12 loading text-right text-slate-600"
                href={"/recently"}
              >
                <span></span>
              </Link>
            </h1>
            <div className=" space-x-4 flex">
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
            </div>
          </div>

          <div className="bg-slate-950 w-full loadingbig rounded-2xl p-2 px-0">
            <h1 className="text-slate-500 p-1 px-2 flex items-center">
              <span className="block w-6/12">Interests</span>
              <Link
                className="block w-6/12 loading text-right text-slate-600"
                href={"/interests"}
              >
                <span></span>
              </Link>
            </h1>
            <div className=" space-x-4 flex">
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
              <div className="inline-block loading w-8 h-8 rounded-full"></div>
            </div>
          </div>

          <div className="w-full loadingbig rounded-2xl">
            <h1 className="text-slate-500 p-1 px-2 flex items-center">
              <span className="block w-6/12">Friend and chat</span>
              <Link
                className="block loading w-6/12 text-right text-slate-600"
                href=""
              ></Link>
            </h1>
            <div className="space-y-2"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-4 p-2 w-12/12 lg:w-4/12">
        <RecentlyBox />
        <InterestBox />
        <ChatBox />
      </div>
      <ButtonBer />
    </>
  );
}
