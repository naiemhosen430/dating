"use client";
import React, { useContext, useEffect, useState } from "react";
import RecentlyBox from "../Components/Box/RecentlyBox";
import InterestBox from "../Components/Box/InterestBox";
import ChatBox from "../Components/Box/ChatBox";
import ButtonBer from "../Components/Shared/ButtonBer";
import Link from "next/link";
import { MineContext } from "@/Context/MineContextProvider";
import { CgSearch } from "react-icons/cg";
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";

export default function page() {
  const { chats, setChats, data } = useContext(MineContext);

  useEffect(() => {
    async function updateNtfData() {
      try {
        if (data) {
          const ntfRef = ref(db, "ntf/" + data?._id);
          const snapshot = await get(ntfRef);
          const existingNtfData = snapshot.val() || {};
          if (existingNtfData) {
            const updatedMsgUnseen = 0;
            await set(ntfRef, {
              ...existingNtfData,
              msgUnseen: updatedMsgUnseen,
              id: null,
              msgtime: Date.now(),
            });
          }
        }
      } catch (error) {
        console.error("Error updating ntf data:", error);
      } finally {
        setLoading(false);
      }
    }

    updateNtfData();
  }, [data]);

  if (!data || !chats) {
    return (
      <>
        <div className="space-y-4 p-2 w-12/12 lg:w-4/12">
          <div className="bg-slate-950 w-full loadingbig rounded-2xl overflow-x-auto p-2 px-0">
            <h1 className="text-slate-500 p-1 pb-4 px-2 flex items-center">
              <span className="block w-6/12">Recently</span>
              <Link
                className="block w-6/12 loading text-right text-slate-600"
                href={"/"}
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
                href={"/"}
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
        <ButtonBer />
      </>
    );
  }

  const [text, setText] = useState({
    text: "",
  });

  return (
    <>
      <div className="space-y-4 p-2 w-12/12 lg:w-4/12">
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            onChange={(event) => {
              setText({
                ...text, // Corrected from ...userInfo to ...text
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text.text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>

        <RecentlyBox />
        <InterestBox />
        <ChatBox />
      </div>
      <ButtonBer />
    </>
  );
}
