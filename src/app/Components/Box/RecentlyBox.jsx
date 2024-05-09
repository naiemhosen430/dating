"use client";
import { MineContext } from "@/Context/MineContextProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Avater from "./Avater";

export default function RecentlyBox() {
  const { chats, setChats, data } = useContext(MineContext);
  const randomChat = chats?.filter((chat) => chat.type === "recently");

  if (!randomChat) {
    return (
      <>
        <div className="w-full rounded-2xl">
          <h1 className="text-slate-500 p-1 px-2 flex items-center">
            <span className="block w-6/12">Recently</span>
            <Link
              className="block w-6/12 text-right text-slate-600"
              href="/recently"
            >
              See All
            </Link>
          </h1>
          <div className="space-y-2">
            <h1 className=" text-xs text-center">No chats found</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-slate-950 w-full rounded-2xl overflow-x-auto p-2 px-0">
        <h1 className="text-slate-500 p-1 pb-4 px-2 flex items-center">
          <span className="block w-6/12">Recently</span>
          <Link
            className="block w-6/12 text-right text-slate-600"
            href={"/recently"}
          >
            <span>See All</span>
          </Link>
        </h1>
        <div className=" space-x-4 flex">
          {randomChat?.length === 0 || !randomChat ? (
            <h1 className="text-xs text-center">No chats found</h1>
          ) : (
            randomChat?.map((chat) => (
              <div className="inline-block w-8 h-8 overflow-hidden rounded-full">
                <Link href={`/converssion/${chat?.profileInfo?._id}`}>
                  <Avater text={chat?.profileInfo?.profilepicture} />
                  {/* <img
                    className="block h-full w-full rounded-full"
                    src={
                      chat.profileInfo?.profilepicture
                        ? chat.profileInfo?.profilepicture
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqu8BOhvKFDaFMAnjpAbK4o0VTGqo9BbeqTOvoWuVVfSqvqgG6hY5dc52EpEf5QTdBKY&usqp=CAU"
                    }
                    alt=""
                  /> */}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
