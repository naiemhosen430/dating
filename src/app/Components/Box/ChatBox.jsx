"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import singlechatbox from "./singlechatbox";

export default function ChatBox() {
  const [chats, setChats] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get("/api/me");
        setUserInfo(userData?.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await axios.get("/api/chat");
        setChats(chatData.data.data);
      } catch (err) {
        setChats([]);
        console.log(err);
      }
    };
    fetchData();
  }, [userInfo]); // Make sure to add userInfo as a dependency

  console.log(chats);

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
            chats?.map((chat) => (
              <singlechatbox chat={chat} myid={userInfo?._id} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
