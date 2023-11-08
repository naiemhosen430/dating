import React from "react";
import RecentlyBox from "../Components/Box/RecentlyBox";
import InterestBox from "../Components/Box/InterestBox";
import ChatBox from "../Components/Box/ChatBox";
import ButtonBer from "../Components/Shared/ButtonBer";

export default function page() {
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
