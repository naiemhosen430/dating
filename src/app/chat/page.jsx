"use client";
import React, { useContext, useEffect, useState } from "react";
import RecentlyBox from "../Components/Box/RecentlyBox";
import InterestBox from "../Components/Box/InterestBox";
import ChatBox from "../Components/Box/ChatBox";
import ButtonBer from "../Components/Shared/ButtonBer";
import { MineContext } from "@/Context/MineContextProvider";
import ChatPageLoader from "../Components/Loaders/ChatPageLoader";
import SearchBar from "../Components/Shared/SearchBar";
import { updateMsgData } from "@/firebase/ntf";

export default function page() {
  const { chats, data } = useContext(MineContext);

  useEffect(() => {
    updateMsgData(data);
  }, [data]);

  if (!data || !chats) {
    return (
      <>
        <ChatPageLoader />
      </>
    );
  }



  return (
    <>
      <div className="space-y-4 p-2 w-12/12 lg:w-4/12">
        <SearchBar />

        <RecentlyBox />
        <InterestBox />
        <ChatBox />
      </div>
      <ButtonBer />
    </>
  );
}
