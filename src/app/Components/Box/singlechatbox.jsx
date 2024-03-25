'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, onValue } from "firebase/database"; // Import onValue from Firebase
import { db } from "@/app/firebaseConfig"; // Assuming db is your Firebase Realtime Database instance
import Link from "next/link";

export default function Singlechatbox({ chat, myid }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [outChat, setOutChat] = useState(null);
  const myfriendid = chat?.chatids.filter((item) => item !== myid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/profile/${myfriendid}`);
        setProfileInfo(response.data.data);
      } catch (err) {
        setProfileInfo(null);
        console.error(err);
      }
    };

    if (myfriendid) {
      fetchData();
    }
  }, [myfriendid]);

  useEffect(() => {
    if (!chat) return; // Check if chat exists
    const chatRef = ref(db, "conversations/" + chat._id);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatObj = snapshot.val();
        const chatArr = Object.values(chatObj);
        setOutChat(chatArr);
      } else {
        console.log("No chat data found.");
        setOutChat([]);
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, [chat]);

  const lastMessage = outChat ? outChat[outChat.length - 1] : null;

  return (
    <div className="flex items-center justify-center p-2 px-1" key={chat.id}>
      <div className="w-2/12 flex items-center rounded-full pb-1">
        <Link className="block" href={`/profile/${profileInfo?._id}`}>
          <img
            className="w-12 h-12 rounded-full inline-block"
            src={profileInfo?.profilepicture}
            alt=""
          />
        </Link>
      </div>
      <div className="w-10/12">
        <Link href={`/converssion/${profileInfo?._id}`}>
          <h1 className="text-sm px-2">{profileInfo?.name}</h1>
          <h1 className="text-xs px-2 text-red-500">active 11 m ago</h1>
          <h1 className="text-xs px-2 text-red-400 text-right flex">
            <span className="w-8/12 text-left text-base block">
              {lastMessage?.lastmessage}
            </span>
            <span className="text-xs text-right w-4/12 block text-red-500">
              5 m ago
            </span>
          </h1>
        </Link>
      </div>
    </div>
  );
}
