import Link from "next/link";
import React from "react";
import { CgFeed } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdChat } from "react-icons/md";

export default function ButtonBer() {
  return (
    <>
      <div className="fixed bottom-0 w-full lg:p-6 p-4 px-2">
        <div className="bg-slate-900 rounded-2xl w-full p-2 flex justify-center items-center">
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/"}
              className="flex items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              <CgFeed /> <span>Feed</span>
            </Link>
          </div>
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/"}
              className="flex items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              <LiaUserFriendsSolid /> <span>Meet</span>
            </Link>
          </div>
          <div className="text-2xl w-4/12 text-center">
            <Link
              href={"/"}
              className="flex items-center justify-center space-x-2 hover:bg-slate-800 rounded-2xl hover:text-yellow-50 text-slate-500 text-sm"
            >
              <MdChat /> <span>Meet</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
