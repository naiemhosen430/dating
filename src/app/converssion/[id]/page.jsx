"use client";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp, MdSend } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { db } from "@/app/firebaseConfig";
import { ref, get, set } from "firebase/database";
import { usePathname } from "next/navigation";

export default function Page() {
  const [me, setMe] = useState(null);
  const [friend, setFriend] = useState(null);
  const [chatData, setChatData] = useState(null);
  const id = usePathname().split("converssion/")[1];

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.post(`/api/chat/${id}`);
        const { friend, me, data } = response.data;
        setFriend(friend);
        setMe(me);

        const chatRef = ref(db, "conversations/" + data._id);
        const chatSnapshot = await get(chatRef);

        if (chatSnapshot.exists()) {
          const chatObj = chatSnapshot.val();
          // Convert object to array
          const chatArr = Object.values(chatObj);
          setChatData(chatArr);
        } else {
          console.log("No chat data found.");
          setChatData([]); // Set chatData as an empty array
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [id]);

  console.log(chatData);

  return (
    <>
      <div className="lg:w-6/12 w-12/12 m-auto z-30 h-screen bg-slate-950">
        <div className="p-2 sticky top-0 flex items-center text-3xl">
          <div className="w-2/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="text-center w-8/12 text-2xl text-white font-bold">
            {friend?.name}
          </div>
          <div className="w-2/12 text-right">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {chatData ? (
          chatData.map((msg, index) => (
            <div className="p-2" key={index}>
              <div className="inline-block bg-slate-900 rounded-xl text-white">
                <h1 className="text-white py-1">{msg.message}</h1>
                <h5 className="text-slate-700 p-1">{msg.msgtime}</h5>
              </div>
            </div>
          ))
        ) : (
          <h1 className="py-60 text-center">No chat. Start texting</h1>
        )}

        <div className="fixed bottom-2 lg:w-6/12 w-12/12 m-auto mx-2">
          <div className="flex items-center justify-center bg-slate-950">
            <input
              className="text-white bg-slate-900 text-lg p-2 px-4 rounded-2xl block lg:w-10/12 w-11/12 m-0"
              type="text"
              placeholder="Message"
            />
            <div className="text-5xl cursor-pointer text-center rounded-3xl block lg:w-2/12 w-1/12 m-0">
              <MdSend />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
