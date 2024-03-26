"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Singlechatbox from "./singlechatbox";
import { MineContext } from "@/Context/MineContextProvider";

export default function ChatBox() {
  const { chats, setChats, data } = useContext(MineContext);

  if (!data || !chats) {
    return (
      <>
        <div className="w-full rounded-2xl">
          <h1 className="text-slate-500 p-1 px-2 flex items-center">
            <span className="block w-6/12">Friend and chat</span>
            <Link className="block w-6/12 text-right text-slate-600" href="">
              Create group
            </Link>
          </h1>
          <div className="space-y-2">
            {chats?.length === 0 ? (
              <h1 className="py-10 text-center">No chats found</h1>
            ) : (
              chats?.map((chat) => (
                <Singlechatbox chat={chat} myid={data?._id} />
              ))
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full rounded-2xl">
        <h1 className="text-slate-500 p-1 px-2 flex items-center">
          <span className="block w-6/12">Friend and chat</span>
          <Link className="block w-6/12 text-right text-slate-600" href="">
            {/* Add correct href value */}
          </Link>
        </h1>
        <div className="space-y-2">
          {chats?.length === 0 ? (
            <h1 className="py-10 text-center">No chats found</h1>
          ) : (
            chats?.map((chat) => <Singlechatbox chat={chat} myid={data?._id} />)
          )}
        </div>
      </div>
    </>
  );
}
