"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ref, onValue, off } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { MineContext } from "@/Context/MineContextProvider";

export default function Singlechatbox({ chat, myid }) {
  const { pandingMsg } = useContext(MineContext);
  const [profileInfo, setProfileInfo] = useState(null);
  const [pandingMsgShow,setPandingMsgShow]=useState(0)
  const myfriendid = chat?.chatids.filter((item) => item !== myid);
  const [lastmsg, setlastmsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!profileInfo) {
        try {
          const response = await axios.get(`/api/profile/${myfriendid}`);
          setProfileInfo(response.data.data);
        } catch (err) {
          setProfileInfo(null);
          console.error(err);
        }
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
        // setPandingMsgShow(chatArr.length - pandingMsg)
        setlastmsg(chatArr[chatArr.length - 1]);
      } else {
        console.log("No chat data found.");
        setlastmsg(null);
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
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months}m ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
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
              <span className="text-xs text-white">{pandingMsgShow === 0 ? "" : pandingMsgShow}</span>
              <span className="w-8/12 text-left text-xs block">
                {lastmsg?.id === myid && (
                  <span className="px-1 text-red-400 text-xs">You:</span>
                )}
                {lastmsg?.message && lastmsg.message.length > 29
                  ? `${lastmsg.message.substring(0, 17)}...`
                  : lastmsg?.message}
                {(!lastmsg?.message || lastmsg?.message === "") && (
                  <AiFillLike className="text-white inline-block" />
                )}
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
