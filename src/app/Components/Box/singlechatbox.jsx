"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, onValue, off } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import Link from "next/link";

export default function Singlechatbox({ chat, myid }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [outChat, setOutChat] = useState(null);
  const myfriendid = chat?.chatids.filter((item) => item !== myid);
  const [lastmsg, setlastmsg] = useState(null);

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
    if (!chat) return;

    const chatRef = ref(db, "conversations/" + chat._id);

    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        const chatObj = snapshot.val();
        const chatArr = Object.values(chatObj);
        setOutChat(chatArr);
        setlastmsg(chatArr[chatArr.length - 1]); // Set last message here
      } else {
        console.log("No chat data found.");
        setOutChat([]);
        setlastmsg(null); // Set last message to null if no data found
      }
    };

    onValue(chatRef, handleSnapshot);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      off(chatRef, "value", handleSnapshot);
    };
  }, [chat]);

  const formattime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (!profileInfo || !myfriendid[0]) {
    return (
      <>
        <div className="flex items-center loadingbig justify-center p-2 px-1">
          <div className="w-2/12 flex items-center rounded-full pb-1">
            <div className="w-12 h-12 loading rounded-full inline-block"></div>
          </div>
          <div className="w-10/12">
            <h1 className="text-sm loading px-2"></h1>
            <h1 className="text-xs loading px-2 text-red-500"></h1>
            <h1 className="text-xs loading px-2 text-red-400 text-right flex">
              <span className="w-8/12 loading text-left text-base block"></span>
              <span className="text-xs loading text-right w-4/12 block text-red-500"></span>
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center p-2 px-1" key={chat.id}>
        <div className="w-2/12 flex items-center rounded-full pb-1">
          <Link className="block" href={`/profile/${profileInfo?._id}`}>
            <img
              className="w-12 h-12 rounded-full inline-block"
              src={
                profileInfo?.profilepicture
                  ? profileInfo?.profilepicture
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqu8BOhvKFDaFMAnjpAbK4o0VTGqo9BbeqTOvoWuVVfSqvqgG6hY5dc52EpEf5QTdBKY&usqp=CAU"
              }
              alt=""
            />
          </Link>
        </div>
        <div className="w-10/12">
          <Link href={`/converssion/${profileInfo?._id}`}>
            <h1 className="text-sm px-2">{profileInfo?.name}</h1>
            <h1 className="text-xs px-2 text-red-500">active 11 m ago</h1>
            <h1 className="text-xs px-2 text-red-400 text-right flex">
              <span className="w-8/12 text-left text-xs block">
                {lastmsg?.message}
              </span>
              <span className="text-xs text-right w-4/12 block text-red-500">
                {lastmsg ? formattime(lastmsg?.msgtime) : ""}
              </span>
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}
